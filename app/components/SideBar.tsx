"use client";
import { useState, useEffect, useMemo } from "react";
import AllConversations from "./AllConversations";
import { Conversation, Message, User } from "@prisma/client";
import FilterBar from "./FilterBar";
import { pusherClient } from "../utils/pusher";
import NewConversation from "./NewConversation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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
  const [isOpen, setIsOpen] = useState<Boolean>(false);

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
      setOriginalConvos((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages,
            };
          }

          return currentConversation;
        })
      );
    };

    const newHandler = (conversation: Convo) => {
      setOriginalConvos((current) => {
        const exisitngConvo = current.filter((c) => c.id === conversation.id);
        if (exisitngConvo) {
          return current;
        }

        return [conversation, ...current];
      });
    };

    const removeHandler = (conversation: Convo) => {
      setOriginalConvos((current) => {
        return [...current.filter((convo) => convo.id !== conversation.id)];
      });
    };

    pusherClient.bind("conversation:update", updateHandler);
    pusherClient.bind("conversation:new", newHandler);
    pusherClient.bind("conversation:remove", removeHandler);
  }, [pusherKey, router]);

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
