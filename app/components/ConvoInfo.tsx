"use client";
import { Conversation, Message, User } from "@prisma/client";
import getOtherUser from "../utils/getOtherUsers";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiVideo } from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import axios from "axios";

interface ConvoInfoProps {
  conversation: Conversation & {
    users: User[];
  };
}

const ConvoInfo: React.FC<ConvoInfoProps> = ({ conversation }) => {
  const handleVideoCall = async () => {
    const res = await axios.post("/api/messages", {
      message: "Video Call",
      conversationId: conversation.id,
    });
    router.push(`${res.data?.id}/${currentUser}`);
  };
  const router = useRouter();
  const path = usePathname();
  const session = useSession();
  const currentUser = useMemo(() => session.data?.user?.name, [router]);
  const otherUser = getOtherUser(conversation);
  return (
    <div className="h-[10%] w-full flex items-center justify-between p-2 mb-2">
      <div className="h-full flex justify-start items-center">
        <img
          src={`${
            otherUser.image || "https://randomuser.me/api/portraits/lego/6.jpg"
          }`}
          className="h-16 w-16 object-contain rounded-full"
        />
        <p className="ml-4 text-[#f6f6e9]">{otherUser.name?.toUpperCase()}</p>
      </div>
      <div className="flex mr-4">
        <FiVideo
          size={20}
          className="text-white mr-4"
          onClick={() => handleVideoCall()}
        />
        <BsThreeDotsVertical size={20} className="text-white" />
      </div>
    </div>
  );
};
export default ConvoInfo;
