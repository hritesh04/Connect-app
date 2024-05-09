"use client";
import { useState } from "react";
import AllConversations from "./AllConversations";
import { Conversation, Message, User } from "@prisma/client";
import FilterBar from "./FilterBar";
import NewConversation from "./NewConversation";
import { IoSettingsOutline } from "react-icons/io5";

import UserSettings from "./UserSettings";
import UserInfo from "./UserInfo";
type Convo = Conversation & {
  messages: Message[];
  users: User[];
};

type Variant = "AllConversation" | "NewConversation" | "UserSettings";

export default function NewSideBar({
  conversations,
  currentUser,
}: {
  conversations: Convo[];
  currentUser: User;
}) {
  return (
    <div className="w-full">
      <UserInfo currentUser={currentUser} />
    </div>
  );
}
