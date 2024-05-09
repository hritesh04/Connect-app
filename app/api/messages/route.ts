import { NextResponse } from "next/server";

import getCurrentUser from "@/utils/getCurrentUser";
import { pusherServer } from "@/utils/pusher";
import prisma from "@/utils/prismadb";
import getOtherUSer from "@/utils/getOtherUsers";
import getConversationById from "@/utils/getConversationById";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { message, image, conversationId } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const newMessage = await prisma.message.create({
      include: {
        sender: true,
      },
      data: {
        body: message,
        image: image,
        conversation: {
          connect: { id: conversationId },
        },
        sender: {
          connect: { id: currentUser.id },
        },
      },
    });

    const updatedConversation = await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        users: true,
        messages: {},
      },
    });
    // if (newMessage.body === "Video Call") {
    //   const conversation = await getConversationById(conversationId);
    //   const otherUser = getOtherUSer(conversation!);
    //   await pusherServer.trigger(otherUser.email!, "videocall:new", newMessage);
    // }
    await pusherServer.trigger(conversationId, "messages:new", newMessage);

    const lastMessage =
      updatedConversation.messages[updatedConversation.messages.length - 1];

    updatedConversation.users.map((user) => {
      pusherServer.trigger(user.email!, "conversation:update", {
        id: conversationId,
        messages: [lastMessage],
      });
    });

    return NextResponse.json(newMessage);
  } catch (error) {
    return new NextResponse("Error", { status: 500 });
  }
}
