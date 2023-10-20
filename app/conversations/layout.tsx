import getUsers from "../utils/getUsers";
import SideBar from "../components/SideBar";
import { User, Conversation, Message } from "@prisma/client";
import getConversations from "../utils/getConversation";

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers().then((users) =>
    users.map((user) => ({
      ...user,
      name: user.name?.toLowerCase() || null,
    }))
  );
  const conversations = await getConversations();
  return (
    <div className="h-full w-full grid grid-cols-10">
      <SideBar users={users} conversations={conversations} />
      {children}
    </div>
  );
}
