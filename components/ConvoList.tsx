"use client";
import { Message, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import { pusherClient } from "../utils/pusher";
import useConversation from "../utils/useConversation";
import { FiVideo } from "react-icons/fi";
import { useRouter } from "next/navigation";
type convo = Message & {
  sender: User;
};
export default function ConvoList({ messages }: { messages: convo[] }) {
  const session = useSession();
  const [msg, setMsg] = useState<convo[]>(messages);
  const bottomRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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
    return <div>No Messages</div>;
  }
  return (
    <div className="h-full w-full p-2 max-h-[85%] overflow-hidden overflow-y-auto no-scrollbar">
      {msg.map((msg) => {
        return session?.data?.user?.email === msg.sender.email ? (
          msg.body ? (
            msg.body === "Video Call" ? (
              <div className="flex w-full justify-end h-fit p-2 m-1">
                <div className="p-4 flex h-fit w-48 bg-blue-600 justify-around rounded-xl text-[#f8f8e9]">
                  <div className="w-1/4 h-full">
                    <FiVideo size={26} />
                  </div>
                  <div className="pl-6 h-full w-3/4">
                    <p className="">Video Call</p>

                    <p>
                      {new Date(msg?.createdAt).toLocaleString().split(", ")[1]}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex w-full h-10 justify-end m-1">
                <p className="w-fit p-2 bg-blue-600 rounded-xl text-[#f8f8e9] h-full">
                  {msg.body}
                </p>
              </div>
            )
          ) : (
            <div className="flex justify-end">
              <div className="w-52 h-52 rounded-md overflow-hidden m-1">
                <img src={`${msg.image}`} className="h-52 w-52" />
              </div>
            </div>
          )
        ) : msg.body ? (
          msg.body === "Video Call" ? (
            <div className="flex w-full justify-start h-fit p-2 m-1">
              <div
                className="p-4 flex h-fit w-48 bg-slate-200 justify-start rounded-xl text-black"
                onClick={() => {
                  router.push(`${msg.id}/${session.data?.user?.name}`);
                }}
              >
                <div className="w-1/4 h-full">
                  <FiVideo size={26} />
                </div>
                <div className="pl-6 h-full w-3/4">
                  <p className="">Video Call</p>

                  <p>
                    {new Date(msg?.createdAt).toLocaleString().split(", ")[1]}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div key={msg.id} className="flex w-full m-1 h-10 justify-start">
              <p className="w-fit p-2 bg-[#dce2f2] rounded-xl text-black h-full">
                {msg.body}
              </p>
            </div>
          )
        ) : (
          <div className="flex justify-start">
            <div className="w-52 h-52 rounded-md overflow-hidden m-1">
              <img src={`${msg.image}`} className="h-52 w-52" />
            </div>
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
}
