"use client";
import { User } from "@prisma/client";
import axios from "axios";
import { signOut } from "next-auth/react";
import { CldUploadButton } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
type Variant = "AllConversation" | "NewConversation" | "UserSettings";
const UserSettings = ({
  currentUser,
  setIsOpen,
}: {
  currentUser: User;
  setIsOpen: React.Dispatch<React.SetStateAction<Variant>>;
}) => {
  const router = useRouter();
  const [name, setName] = useState<string>(currentUser.name!);
  const [password, setPassword] = useState<string>(currentUser.password!);
  const imageRef = useRef(null);
  const handleUpload = (result: any) => {
    // @ts-ignore
    imageRef.current.src = result?.info?.secure_url;
  };
  const handleSaveChanges = () => {
    axios
      .post("/api/user", {
        //@ts-ignore
        image: imageRef.current.src,
        name,
        password,
      })
      .then(() => router.refresh());
    setIsOpen((prev) =>
      prev === "UserSettings" ? "AllConversation" : "UserSettings"
    );
  };
  return (
    <div className="h-full overflow-y-auto w-full">
      <div className="h-[92%] rounded-md w-full flex p-4 flex-col">
        <div className="flex h-[35%] w-full flex-col justify-center items-center overflow-hidden mb-2">
          <div className=" h-full w-full flex items-center justify-center">
            <img
              ref={imageRef}
              src={`${currentUser.image}`}
              className="h-3/4 mb-3 w-1/2 object-cover rounded-full"
            />
          </div>
          <CldUploadButton
            options={{ maxFiles: 1 }}
            onUpload={handleUpload}
            uploadPreset="aak2eqva"
          >
            <button className="bg-[#f6f6e9] h-10 rounded-md p-2">
              Change Profile Pic
            </button>
          </CldUploadButton>
        </div>
        <h1 className="text-white mb-2">Username</h1>
        <input
          className="w-[80%] rounded-md mb-2 p-1"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <h1 className="text-white mb-2">Password</h1>
        <input
          className="w-[80%] rounded-md p-1 mb-6"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button
          type="submit"
          className="bg-[#f6f6e9] w-1/3 mb-4 p-2 rounded-md h-10"
          onClick={handleSaveChanges}
        >
          Save
        </button>
        <button
          className="bg-[#f6f6e9] w-1/3 p-2 rounded-md h-10"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserSettings;
