"use client";
import { useState, useEffect } from "react";
import AllConversations from "./AllConversations";
import { Conversation, Message, User } from "@prisma/client";
import FilterBar from "./FilterBar";
import getConversations from "../utils/getConversation";
import NewConversation from "./NewConversation";
interface Convo extends Conversation {
  messages: Partial<Message>[];
  users: User[];
}

export default function SideBar({
  users,
  conversations,
}: //children,
{
  users: User[];
  conversations: Convo[];
  //children: React.ReactNode;
}) {
  // const originalConvos = await getConversations();
  const [allUsers, setAllUsers] = useState<User[]>(users);
  const [originalConvos, setOriginalConvos] = useState<Convo[]>(conversations);
  const [input, setInput] = useState<string>("");
  const [allConversations, setAllConversations] =
    useState<Convo[]>(originalConvos);
  const [isOpen, setIsOpen] = useState<Boolean>(true);

  const handleInputChange = (newInput: string) => {
    setInput(newInput);
    if (newInput) {
      const filter = originalConvos.filter((convo) =>
        convo.name?.includes(newInput.toLowerCase())
      );
      setAllConversations(filter);
    } else {
      setAllConversations(originalConvos);
    }
  };

  return (
    <>
      <div className="h-full col-span-3 overflow-hidden">
        <FilterBar
          handleSearch={handleInputChange}
          input={input}
          setOpen={setIsOpen}
        />
        {isOpen ? (
          <NewConversation users={allUsers} />
        ) : (
          <AllConversations conversations={conversations} />
        )}
      </div>
      {/* {children} */}
    </>
  );
}
