import getUsers from "../utils/getUsers";
import SideBar from "../components/SideBar";
import Conversation from "../components/Conversation";
import { User } from "@prisma/client";

export default async function ChatLayout() {
  const users = await getUsers();
  return (
    <div className="h-full w-full grid grid-cols-10">
      <SideBar users={users} />
      <Conversation />
    </div>
  );
}
