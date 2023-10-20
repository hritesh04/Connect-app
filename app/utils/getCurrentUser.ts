import prisma from "./prismadb";
import useSession from "./useSession";

const getCurrentUser = async () => {
  const session = await useSession();
  if (!session?.user?.email) {
    return null;
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  } catch (error: any) {
    return null;
  }
};

export default getCurrentUser;
