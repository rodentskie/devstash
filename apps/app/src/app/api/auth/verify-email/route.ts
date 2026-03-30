import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  const baseUrl = req.nextUrl.origin;

  if (!token) {
    return NextResponse.redirect(new URL("/sign-in?error=invalid-token", baseUrl));
  }

  const record = await prisma.verificationToken.findUnique({ where: { token } });

  if (!record) {
    return NextResponse.redirect(new URL("/sign-in?error=invalid-token", baseUrl));
  }

  if (record.expires < new Date()) {
    await prisma.verificationToken.delete({ where: { token } });
    return NextResponse.redirect(new URL("/sign-in?error=token-expired", baseUrl));
  }

  await prisma.user.update({
    where: { email: record.identifier },
    data: { emailVerified: new Date() },
  });

  await prisma.verificationToken.deleteMany({
    where: { identifier: record.identifier },
  });

  return NextResponse.redirect(new URL("/sign-in?verified=true", baseUrl));
}
