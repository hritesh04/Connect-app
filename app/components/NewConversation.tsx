"use client";
import { User } from "@prisma/client";
import { RxCross2 } from "react-icons/rx";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const NewConversation = ({
  users,
  setIsOpen,
}: {
  users: User[];
  setIsOpen: React.Dispatch<React.SetStateAction<Boolean>>;
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
      .then((data) => router.push(`/conversations/${data.data.id}`))
      .finally(() => {
        setIsOpen(false);
        console.log("Done");
      });
  };
  return (
    <div className="h-full max-h-[92%] bg-black p-2 border border-black overflow-y-auto w-full">
      <h1 className="ml-28 my-2 text-[#f8f8e9]">Start a New Conversation</h1>
      <div className="realtive flex items-center justify-center h-[8%] px-2 py-3 w-full">
        <input
          ref={searchBarRef}
          className="h-[90%] w-[90%] border p-2 rounded-2xl border-white"
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
      <div className="max-h-[86%] p-1 w-full rounded-md">
        {user.map((u) => (
          <div
            className="h-16 my-3 rounded-md w-full grid grid-cols-12 gap-2"
            onClick={() => handleNewConvo(u.id)}
          >
            <img
              src={`${
                u.image || "https://randomuser.me/api/portraits/lego/6.jpg"
              }`}
              className="h-fit w-fit object-contain p-1 col-span-2 rounded-full"
            />
            <div className="col-span-10 p-1">
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
