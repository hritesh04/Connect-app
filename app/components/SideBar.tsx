"use client";
import { useState } from "react";
import AllConversations from "./AllConversations";
import { Conversation, Message, User } from "@prisma/client";
import FilterBar from "./FilterBar";
import NewConversation from "./NewConversation";
type Convo = Conversation & {
  messages: Message[];
  users: User[];
};

export default function SideBar({
  users,
  conversations,
}: {
  users: User[];
  conversations: Convo[];
}) {
  // const originalConvos = await getConversations();
  const [input, setInput] = useState<string>("");
  const [allConversations, setAllConversations] =
    useState<Convo[]>(conversations);
  const [isOpen, setIsOpen] = useState<Boolean>(false);

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
      <div className="h-full col-span-3 p-1 overflow-hidden">
        <div className="h-full w-full rounded-xl overflow-hidden">
          <FilterBar
            handleSearch={handleInputChange}
            input={input}
            setOpen={setIsOpen}
          />
          {isOpen ? (
            <NewConversation users={users} setIsOpen={setIsOpen} />
          ) : (
            <AllConversations conversations={allConversations} />
          )}
        </div>
      </div>
    </>
  );
}
