import { NextResponse } from "next/server";
import prisma from "../../../utils/prismadb";
import getCurrentUser from "@/utils/getCurrentUser";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await req.json();
    const { image, name, password } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name: name,
        password: password,
        image: image,
      },
    });

    return NextResponse.json("Success");
  } catch (error) {
    return new NextResponse("Error", { status: 500 });
  }
}
