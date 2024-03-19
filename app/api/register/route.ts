import prisma from "@/app/utils/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { username, email, password, image } = body;
  const user = await prisma.user.create({
    data: {
      name: username,
      email,
      password,
      image: image || "https://randomuser.me/api/portraits/lego/6.jpg",
    },
  });

  return NextResponse.json(user);
}
