import prisma from "@/app/utils/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { username, email, password } = body;
  const user = await prisma.user.create({
    data: {
      name: username,
      email,
      password,
    },
  });

  return NextResponse.json(user);
}
