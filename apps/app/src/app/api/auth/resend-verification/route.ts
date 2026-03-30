import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { prisma } from "@/lib/prisma";
import { sendVerificationEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email } = body as { email: string };

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    // Return success to avoid leaking user existence
    return NextResponse.json({ success: true });
  }

  if (user.emailVerified) {
    return NextResponse.json({ error: "Email is already verified" }, { status: 400 });
  }

  await prisma.verificationToken.deleteMany({ where: { identifier: email } });

  const token = randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

  await prisma.verificationToken.create({
    data: { identifier: email, token, expires },
  });

  const baseUrl = new URL(req.url).origin;
  await sendVerificationEmail(email, token, baseUrl);

  return NextResponse.json({ success: true });
}
