import prisma from "./prismadb";
import useSession from "./useSession";
const getUsers = async () => {
  const session = await useSession();
  if (!session?.user?.email) {
    return [];
  }
  try {
    const users = await prisma.user.findMany({
      where: {
        NOT: {
          email: session.user.email,
        },
      },
    });
    return users;
  } catch (error: any) {
    return [];
  }
};

export default getUsers;
