"use client";
import { Message, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import { pusherClient } from "../utils/pusher";
import useConversation from "../utils/useConversation";
type convo = Message & {
  sender: User;
};
export default function ConvoList({ messages }: { messages: convo[] }) {
  const session = useSession();
  const [msg, setMsg] = useState<convo[]>(messages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();
  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (message: convo) => {
      setMsg((current) => {
        const exisitngMsg = current.filter((c) => c.id === message.id);
        if (!exisitngMsg) {
          return current;
        }
        return [...current, message];
      });
      bottomRef?.current?.scrollIntoView();
    };

    const updateMessageHandler = (newMessage: convo) => {
      setMsg((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) {
            return newMessage;
          }

          return currentMessage;
        })
      );
    };

    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("message:update", updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unbind("message:update", updateMessageHandler);
    };
  }, [conversationId, msg]);

  if (!msg) {
    console.log(messages);
    return <div>No Messages</div>;
  }
  return (
    <div className="h-full w-full p-2 max-h-[85%] overflow-hidden overflow-y-auto">
      {msg.map((msg) => {
        return session?.data?.user?.email === msg.sender.email ? (
          <div key={msg.id} className="flex w-full h-10 justify-end m-1">
            <p className="w-fit p-2 bg-blue-600 rounded-xl text-[#f8f8e9] h-full">
              {msg.body}
            </p>
          </div>
        ) : (
          <div key={msg.id} className="flex w-full m-1 h-10 justify-start">
            <p className="w-fit p-2 text-black bg-slate-200 rounded-xl h-full">
              {msg.body}
            </p>
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
}
