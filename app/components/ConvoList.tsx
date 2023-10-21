"use client";
import { Message, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState, useEffect, useMemo, useRef } from "react";
import { pusherClient } from "../utils/pusher";
import { useParams } from "next/navigation";
interface convo extends Message {
  sender: User;
}
const ConvoList = ({ messages }: { messages: convo[] }) => {
  const session = useSession();
  const params = useParams();
  const [msg, setMsg] = useState<convo[]>(messages);
  const bottomRef = useRef<HTMLDivElement>(null);
  const conversationId = useMemo(() => {
    if (!params?.conversationId) {
      return "";
    }

    return params.conversationId as string;
  }, [params?.conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (message: convo) => {
      setMsg((current) => {
        const exisitngMsg = current.filter((c) => c.id === message.id);
        if (exisitngMsg) {
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
  }, [conversationId]);

  if (!msg) {
    console.log(messages);
    return <div>No Messages</div>;
  }
  return (
    <div className="h-full w-full">
      {msg.map((msg) =>
        session?.data?.user?.email === msg.sender.email ? (
          <div>CurrentUser is the Sender</div>
        ) : (
          <div>OtherUser is the Sender</div>
        )
      )}
      <div ref={bottomRef} />
    </div>
  );
};
export default ConvoList;
