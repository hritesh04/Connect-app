import { User } from "@prisma/client";
import { IoSettingsOutline } from "react-icons/io5";

export default function UserInfo({ currentUser }: { currentUser: User }) {
  return (
    <div className=" flex  m-2 justify-between items-center">
      <img
        src={
          "https://plus.unsplash.com/premium_photo-1673306778968-5aab577a7365?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFja2dyb3VuZCUyMGltYWdlfGVufDB8fDB8fHww"
        }
        className="object-cover  h-16 w-16 rounded-full"
      />
      <h1 className=" text-emerald-50">Hritesh Mondal</h1>
      <IoSettingsOutline size={32} style={{ color: "white" }} />
    </div>
  );
}
