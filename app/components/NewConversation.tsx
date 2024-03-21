"use client";
import { User } from "@prisma/client";
import { RxCross2 } from "react-icons/rx";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Conversation, Message } from "@prisma/client";

type Variant = "AllConversation" | "NewConversation" | "UserSettings";

type Convo = Conversation & {
  messages: Message[];
  users: User[];
};

const NewConversation = ({
  users,
  setIsOpen,
  setAllConvo,
}: {
  users: User[];
  setIsOpen: React.Dispatch<React.SetStateAction<Variant>>;
  setAllConvo: React.Dispatch<React.SetStateAction<Convo[]>>;
}) => {
  const router = useRouter();
  const [user, setUser] = useState<User[]>(users);
  const [input, setInput] = useState("");
  const searchBarRef = useRef<HTMLInputElement>(null);
  const allUsers = users;
  const clearInput = () => {
    handleInputChange("");
    //@ts-ignore
    searchBarRef.current.value = "";
  };
  const handleInputChange = (newInput: string) => {
    setInput(newInput);
    if (newInput) {
      const filter = allUsers.filter((user) =>
        user.name?.includes(newInput.toLowerCase())
      );
      setUser(filter);
    } else {
      setUser(users);
    }
  };
  const handleNewConvo = async (userId: string) => {
    await axios
      .post("/api/conversations", {
        userId: userId,
      })
      .then((data) => {
        setAllConvo((prev) => {
          return [...prev, data.data];
        });
        router.push(`/conversations/${data.data.id}`);
      })
      .finally(() => {
        setIsOpen((prev) => {
          return prev === "NewConversation"
            ? "AllConversation"
            : "NewConversation";
        });
        console.log("Done");
      });
  };
  return (
    <div
      className="h-full max-h-[92%]
     p-2 overflow-y-auto w-full"
    >
      <h1 className="text-[#f8f8e9] text-center">Start a New Conversation</h1>
      <div className="realtive flex items-center justify-center h-[8%] px-2 py-3 w-full">
        <input
          ref={searchBarRef}
          className="h-[90%] w-[90%] border p-4 rounded-md border-white"
          type="text"
          placeholder="search..."
          onChange={(event) => handleInputChange(event.target.value)}
        />
        {input && (
          <button className="relative right-6" onClick={clearInput}>
            <RxCross2 />
          </button>
        )}
      </div>
      <div className="max-h-[86%] p-2 w-full rounded-md overflow-y-auto no-scrollbar">
        {user.map((u) => (
          <div
            className=" h-[4rem] hover:bg-slate-400 rounded-md w-full grid grid-cols-12 gap-2 mb-4"
            onClick={() => handleNewConvo(u.id)}
          >
            <img
              src={`${
                u.image || "https://randomuser.me/api/portraits/lego/6.jpg"
              }`}
              className="h-full w-full object-cover p-1 col-span-3 rounded-full"
            />
            <div className="col-span-9 p-1">
              <div className="flex h-full w-full justify-between items-center">
                <p className="font-semibold text-[#f8f8e9]">
                  {u.name?.toUpperCase()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewConversation;
