"use client";
import { Conversation, Message, User } from "@prisma/client";
import getOtherUSer from "../utils/getOtherUsers";
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
    console.log(conversation);
    const msg = conversation?.messages;
    if (!msg) {
      return {
        body: "Started a Conversation",
        image: "",
        createdAt: Date.now(),
        conversationId: "",
        id: "",
        senderId: "",
      };
    }
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
      className="h-18 w-full grid grid-cols-12 p-2 gap-2 mb-1 hover:bg-[#3f405c]"
      onClick={handleClick}
    >
      <img
        src={`${
          otherUser.image || "https://randomuser.me/api/portraits/lego/6.jpg"
        }`}
        className="h-full w-full object-cover col-span-3 rounded-full"
      />
      <div className="col-span-9 p-1">
        <div className="flex h-fit w-full justify-between">
          <p className="font-semibold text-[#d7dce9]">
            {otherUser?.name?.toUpperCase()}
          </p>
          <p className="font-extralight text-[#d7dce9]">
            {lastMesageTime === "Invalid Date"
              ? ""
              : lastMesageTime.toLowerCase()}
          </p>
        </div>
        <p className="mt-3 font-thin text-[#d7dce9]">{lastMesagePreview}</p>
      </div>
    </div>
  );
}
