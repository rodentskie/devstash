import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { prisma } from "@/lib/prisma";
import { sendPasswordResetEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email } = body as { email: string };

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  // Always return success to avoid email enumeration
  if (!user || !user.password) {
    return NextResponse.json({ success: true });
  }

  // Remove any existing password reset tokens for this user
  await prisma.verificationToken.deleteMany({
    where: { identifier: `password-reset:${email}` },
  });

  const token = randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await prisma.verificationToken.create({
    data: { identifier: `password-reset:${email}`, token, expires },
  });

  const baseUrl = new URL(req.url).origin;
  await sendPasswordResetEmail(email, token, baseUrl);

  return NextResponse.json({ success: true });
}
