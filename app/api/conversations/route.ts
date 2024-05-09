import getCurrentUser from "../../../utils/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "../../../utils/prismadb";
import { pusherServer } from "../../../utils/pusher";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { userId } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    const existingConversations = await prisma.conversation.findMany({
      where: {
        OR: [
          {
            users: {
              every: {
                id: {
                  in: [userId, currentUser.id],
                },
              },
            },
          },
        ],
      },
    });

    const singleConversation = existingConversations[0];

    if (singleConversation) {
      return NextResponse.json(singleConversation);
    }

    const newConversation = await prisma.conversation.create({
      data: {
        users: {
          connect: [
            {
              id: currentUser?.id,
            },
            {
              id: userId,
            },
          ],
        },
      },
      include: {
        users: true,
      },
    });
    newConversation.users.map((user) => {
      if (user.id == userId) {
        pusherServer.trigger(user.email!, "conversation:new", newConversation);
      }
    });

    return NextResponse.json(newConversation);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
