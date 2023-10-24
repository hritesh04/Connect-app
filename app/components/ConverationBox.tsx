"use client";
import { Conversation, Message, User } from "@prisma/client";
import getOtherUSer from "../utils/getOtherUsers";
import axios from "axios";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
type Convo = Conversation & {
  users: User[];
  messages: Message[];
};

export default function ConversationBox({
  conversation,
}: {
  conversation: Convo;
}) {
  const router = useRouter();
  const otherUser = getOtherUSer(conversation);

  const lastMesage = useMemo(() => {
    const msg = conversation.messages;
    return msg[0];
  }, [conversation.messages]);

  const lastMesagePreview = useMemo(() => {
    if (lastMesage?.body) {
      return lastMesage.body;
    }
    if (lastMesage?.image) {
      return "Sent an Image";
    }
    return "Started Conversation";
  }, [lastMesage]);

  const lastMesageTime = useMemo(() => {
    const date = new Date(lastMesage?.createdAt!).toLocaleString().split(", ");
    const today = new Date().toLocaleString().split(", ");
    return date[0] === today[0] ? date[1] : date[0];
  }, [lastMesage]);

  const handleClick = useCallback(() => {
    router.push(`/conversations/${conversation.id}`);
  }, [conversation.id, router]);

  return (
    <div
      className="h-18 w-full my-3 grid grid-cols-12 gap-2 mb-1 pr-4 pb-1"
      onClick={handleClick}
    >
      <img
        src={`${
          otherUser.image || "https://randomuser.me/api/portraits/lego/6.jpg"
        }`}
        className="h-fit w-fit object-contain p-1 col-span-2 rounded-full"
      />
      <div className="col-span-10 p-1">
        <div className="flex h-fit w-full justify-between">
          <p className="font-semibold text-[#f8f8e9]">
            {otherUser?.name?.toUpperCase()}
          </p>
          <p className="font-extralight text-[#f8f8e9]">
            {lastMesageTime === "Invalid Date"
              ? ""
              : lastMesageTime.toLowerCase()}
          </p>
        </div>
        <p className="mt-3 font-thin text-[#f8f8e9]">{lastMesagePreview}</p>
      </div>
    </div>
  );
}
