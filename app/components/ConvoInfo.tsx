"use client";
import { Conversation, Message, User } from "@prisma/client";
import getOtherUSer from "../utils/getOtherUsers";
import { BsThreeDotsVertical } from "react-icons/bs";

interface ConvoInfoProps {
  conversation: Conversation & {
    users: User[];
  };
}

const ConvoInfo: React.FC<ConvoInfoProps> = ({ conversation }) => {
  const otherUser = getOtherUSer(conversation);
  return (
    <div className="bg-black h-[10%] w-full flex items-center justify-between p-2 shadow-[rgba(0,0,0,0.8)_0px_2px_5px_0px,_rgba(256,256,256,0.8)_0px_1px_1px_0px] mb-2">
      <div className="h-full flex justify-start items-center">
        <img
          src={`${
            otherUser.image || "https://randomuser.me/api/portraits/lego/6.jpg"
          }`}
          className="h-16 w-16 object-contain rounded-full"
        />
        <p className="ml-4 text-[#f6f6e9]">{otherUser.name}</p>
      </div>
      <div className="mr-4">
        <BsThreeDotsVertical size={20} className="text-white" />
      </div>
    </div>
  );
};
export default ConvoInfo;
