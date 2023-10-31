"use client";
import { Conversation, Message, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { pusherClient } from "../utils/pusher";
import ConversationBox from "./ConverationBox";
import { useState, useEffect, useMemo } from "react";
type Convo = Conversation & {
  messages: Message[];
  users: User[];
};
const AllConversations = ({ conversations }: { conversations: Convo[] }) => {
  const [allConversations, setAllConversations] =
    useState<Convo[]>(conversations);
  const session = useSession();
  const router = useRouter();
  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    pusherClient.subscribe(pusherKey);

    const updateHandler = (conversation: Convo) => {
      setAllConversations((current) => {
        const currentConvo = current.filter(
          (current) => current.id === conversation.id
        );
        const updatedConvo = {
          ...currentConvo[0],
          messages: conversation.messages,
        };
        const originalConvos = current.filter(
          (current) => current.id !== conversation.id
        );
        return [updatedConvo, ...originalConvos];
      });
    };

    const newHandler = (conversation: Convo) => {
      setAllConversations((current) => {
        const exisitngConvo = current.filter((c) => c.id === conversation.id);
        if (exisitngConvo) {
          return current;
        }

        return [conversation, ...current];
      });
    };

    const removeHandler = (conversation: Convo) => {
      setAllConversations((current) => {
        return [...current.filter((convo) => convo.id !== conversation.id)];
      });
    };

    // const videoCallHandler = (conversation: Convo) => {
    //   setAllConversations((current) => {
    //     const callingConvo = current.filter(
    //       (convo) => convo.id === conversation.id
    //     );
    //   });
    //};

    pusherClient.bind("conversation:update", updateHandler);
    pusherClient.bind("conversation:new", newHandler);
    pusherClient.bind("conversation:remove", removeHandler);
    //pusherClient.bind("videocall:new", videoCallHandler);
  }, [pusherKey, router]);
  if (!conversations) {
    <div className="h-[92%] overflow-y-auto flex justify-center items-center w-full text-[#f8f8e9]">
      <h1>All your Conversations are shown here</h1>
    </div>;
  }
  return (
    <div className="h-full max-h-[92%] p-2 overflow-y-auto w-full">
      {allConversations.map((convo) => (
        <ConversationBox conversation={convo} key={convo.id} />
      ))}
    </div>
  );
};
export default AllConversations;
