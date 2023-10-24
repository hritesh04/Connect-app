import getUsers from "../utils/getUsers";
import SideBar from "../components/SideBar";
import getConversations from "../utils/getConversation";
import getCurrentUser from "../utils/getCurrentUser";

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  const users = await getUsers().then((users) =>
    users
      .map((user) => ({
        ...user,
        name: user.name?.toLowerCase() || null,
      }))
      .filter((user) => user.email !== currentUser?.email)
  );
  const conversations = await getConversations();
  return (
    <div className="h-full bg-[#191919] w-full grid gap-0 grid-cols-10">
      <SideBar users={users} conversations={conversations} />
      {children}
    </div>
  );
}
