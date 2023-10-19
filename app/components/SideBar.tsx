"use client";
import { useMemo, useState } from "react";
import AllConversations from "./AllConversations";
import FilterBar from "./FilterBar";
import { User } from "@prisma/client";

const SideBar = ({ users }: { users: User[] }) => {
  const [conversations, setConversations] = useState<User[]>(users);
  const [input, setInput] = useState<string>("");
  const originalConvos = users;
  useMemo(() => {
    if (input) {
      const filter = conversations.filter((convo) =>
        convo.name?.includes(input)
      );
      setConversations(filter);
    } else {
      setConversations(originalConvos);
    }
  }, [input]);
  return (
    <div className="h-full col-span-3">
      <FilterBar setInput={setInput} />
      <AllConversations conversations={conversations} />
    </div>
  );
};
export default SideBar;
