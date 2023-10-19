"use client";
import { useMemo, useState } from "react";
import AllConversations from "./AllConversations";
import FilterBar from "./FilterBar";
import { User } from "@prisma/client";

const SideBar = ({ users }: { users: User[] }) => {
  const [conversations, setConversations] = useState<User[]>(users);
  const [input, setInput] = useState<string>("");
  const originalConvos = users;

  const handleInputChange = (newInput: string) => {
    setInput(newInput);
    if (newInput) {
      const filter = originalConvos.filter((convo) =>
        convo.name?.includes(newInput.toLowerCase())
      );
      setConversations(filter);
    } else {
      setConversations(originalConvos);
    }
  };

  return (
    <div className="h-full col-span-3">
      <FilterBar handleSearch={handleInputChange} />
      <AllConversations conversations={conversations} />
    </div>
  );
};
export default SideBar;
