"use client";
import { useState } from "react";
import AllConversations from "./AllConversations";
import { Conversation, Message, User } from "@prisma/client";
import FilterBar from "./FilterBar";
import NewConversation from "./NewConversation";
import UserSettings from "./UserSettings";
type Convo = Conversation & {
  messages: Message[];
  users: User[];
};

type Variant = "AllConversation" | "NewConversation" | "UserSettings";

export default function SideBar({
  users,
  conversations,
  currentUser,
}: {
  users: User[];
  conversations: Convo[];
  currentUser: User;
}) {
  // const originalConvos = await getConversations();
  const [input, setInput] = useState<string>("");
  const [allConversations, setAllConversations] =
    useState<Convo[]>(conversations);
  const [isOpen, setIsOpen] = useState<Variant>("AllConversation");

  const handleInputChange = (newInput: string) => {
    if (newInput) {
      const filter = conversations.filter((convo) => {
        return convo.users.filter((user) => {
          const allUser = user.name?.toLowerCase();
          return allUser?.includes(newInput.toLowerCase());
        });
      });
      setAllConversations(filter);
    } else {
      setAllConversations(conversations);
    }
  };

  return (
    <>
      <div className="h-full col-span-3 overflow-hidden rounded-xl shadow-lg shadow-[#232323] bg-[#131313]">
        <div className="h-full w-full">
          <FilterBar
            handleSearch={handleInputChange}
            input={input}
            setOpen={setIsOpen}
            currentUser={currentUser}
          />
          {isOpen === "NewConversation" && (
            <NewConversation users={users} setIsOpen={setIsOpen} />
          )}

          {isOpen === "UserSettings" && (
            <UserSettings currentUser={currentUser} setIsOpen={setIsOpen} />
          )}

          {isOpen !== "NewConversation" && isOpen !== "UserSettings" && (
            <AllConversations conversations={allConversations} />
          )}
        </div>
      </div>
    </>
  );
}
