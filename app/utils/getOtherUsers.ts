import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { User, Message, Conversation } from "@prisma/client";
type Convo = Conversation & {
  messages?: Partial<Message>[];
  users: User[];
};

const getOtherUSer = (conversation: Convo) => {
  const session = useSession();
  const otherUser = useMemo(() => {
    const currentUserEmail = session.data?.user?.email;

    const otherUser = conversation.users.filter(
      (user) => user.email !== currentUserEmail
    );

    return otherUser[0];
  }, [session.data?.user?.email, conversation.users]);

  return otherUser;
};
export default getOtherUSer;