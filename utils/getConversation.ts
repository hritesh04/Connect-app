import prisma from "./prismadb";
import getCurrentUser from "./getCurrentUser";

const getConversations = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser?.id) {
    return [];
  }

  try {
    const allConversations = await prisma.conversation.findMany({
      where: {
        //AND
        OR: [
          {
            users: {
              some: {
                id: {
                  in: [currentUser.id],
                },
              },
            },
          },
        ],
      },
      include: {
        users: true,
        messages: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            sender: true,
          },
        },
      },
    });
    if (!allConversations) {
      return [];
    }

    return allConversations;
  } catch (error: any) {
    return [];
  }
};

export default getConversations;
