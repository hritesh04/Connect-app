"use client";
import { User } from "@prisma/client";
import { RxCross2 } from "react-icons/rx";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const NewConversation = ({ users }: { users: User[] }) => {
  const router = useRouter();
  const [user, setUser] = useState<User[]>([]);
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
      setUser([]);
    }
  };
  const handleNewConvo = async (userId: string) => {
    await axios
      .post("/api/conversations", {
        userId: userId,
      })
      .then((data) => router.push(`/conversations/${data.data.id}`))
      .finally(() => {
        console.log("Done");
      });
  };
  return (
    <div className="border-2 border-black max-h-[92%] m-2 overflow-y-auto w-full">
      <h1 className="ml-28 my-2">Start a New Conversation</h1>
      <div className="realtive h-[8%] px-2 py-3 w-full">
        <input
          ref={searchBarRef}
          className="h-[90%] w-[90%] border-2 p-1 border-black"
          type="text"
          placeholder="search..."
          onChange={(event) => handleInputChange(event.target.value)}
        />
        {input && (
          <button className="relative right-6 top-1" onClick={clearInput}>
            <RxCross2 />
          </button>
        )}
      </div>
      <div>
        {user.map((u) => (
          <div
            className="h-18 w-full grid grid-cols-12 gap-2 mb-1 pr-4 pb-1"
            onClick={() => handleNewConvo(u.id)}
          >
            <img
              src={`${u.image}`}
              className="h-fit w-fit object-contain p-1 col-span-2 rounded-full"
            />
            <div className="col-span-10 p-1">
              <div className="flex h-full w-full justify-between items-center">
                <p className="font-semibold">{u.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewConversation;
