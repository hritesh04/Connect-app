"use client";
import { useEffect, useMemo, useState } from "react";
import AllConversations from "./AllConversations";
import { Conversation, Message, User } from "@prisma/client";
import FilterBar from "./FilterBar";
import NewConversation from "./NewConversation";
import UserSettings from "./UserSettings";
import { pusherClient } from "@/utils/pusher";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { IoClose, IoMenuOutline } from "react-icons/io5";
type Convo = Conversation & {
  messages: Message[];
  users: User[];
};

type Variant = "AllConversation" | "NewConversation" | "UserSettings";

export default function SideBar({
  users,
  conversations,
  currentUser,
}: {
  users: User[];
  conversations: Convo[];
  currentUser: User;
}) {
  const [sideBar, setSideBar] = useState(false);
  const [input, setInput] = useState<string>("");
  const [allConversations, setAllConversations] =
    useState<Convo[]>(conversations);
  const [isOpen, setIsOpen] = useState<Variant>(
    conversations.length == 0 ? "NewConversation" : "AllConversation"
  );

  const handleInputChange = (newInput: string) => {
    if (newInput) {
      const filter = conversations.filter((convo) => {
        return convo.users.filter((user) => {
          const allUser = user.name?.toLowerCase();
          return allUser?.includes(newInput.toLowerCase());
        });
      });
      setAllConversations(filter);
    } else {
      setAllConversations(conversations);
    }
  };
  const session = useSession();
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
        let currentConvo = current.filter(
          (current) => current.id === conversation.id
        );
        let updatedConvo = {
          ...currentConvo[0],
          messages: conversation.messages,
        };
        let originalConvos = current.filter(
          (current) => current.id !== conversation.id
        );
        return [updatedConvo, ...originalConvos];
      });
    };

    // const newHandler = (conversation: Convo) => {
    //   console.log("receiving new convo trigger");
    //   console.dir(conversation, { depth: null });
    //   setAllConversations((current) => {
    //     console.log("In state");
    //     console.log(allConversations.length);
    //     let exisitngConvo = current.filter((c) => c.id === conversation.id);
    //     if (exisitngConvo) {
    //       return [...current];
    //     }

    //     return [...current, conversation];
    //   });
    //   console.log("After state");
    //   console.log(allConversations.length);
    // };

    const newHandler = (conversation: Convo) => {
      setAllConversations((prev) => [conversation, ...prev]);
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
  }, [pusherKey]);

  return (
    <>
      <div
        className={`min-w-12 md:border-r border-[#15161c] h-full md:w-1/4 overflow-hidden ${
          sideBar ? " absolute" : "relative"
        }`}
      >
        <IoMenuOutline
          className={`md:hidden relative top-4 left-4 cursor-pointer ${
            sideBar ? "hidden" : ""
          }`}
          size={50}
          style={{ color: "white" }}
          onClick={() => setSideBar(!sideBar)}
        />
        <div
          className={`md:block w-3/4 sm:w-1/2 md:w-full flex flex-col items-end h-full ${
            sideBar ? "bg-black" : "hidden"
          }`}
        >
          <IoClose
            size={32}
            color="white"
            className={`md:hidden relative top-4 md:left-72 cursor-pointer ${
              sideBar ? "" : "hidden"
            }`}
            onClick={() => setSideBar(!sideBar)}
          />
          <div className="h-full">
            <FilterBar
              handleSearch={handleInputChange}
              input={input}
              setOpen={setIsOpen}
              currentUser={currentUser}
            />
            {isOpen === "NewConversation" && (
              <NewConversation
                users={users}
                setIsOpen={setIsOpen}
                setAllConvo={setAllConversations}
              />
            )}

            {isOpen === "UserSettings" && (
              <UserSettings currentUser={currentUser} setIsOpen={setIsOpen} />
            )}

            {isOpen !== "NewConversation" && isOpen !== "UserSettings" && (
              <AllConversations conversations={allConversations} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
