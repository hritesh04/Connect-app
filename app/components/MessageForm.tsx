"use client";
import axios from "axios";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
const MessageForm = () => {
  const [input, setInput] = useState("");
  const params = useParams();
  const conversationId = useMemo(() => {
    if (!params?.conversationId) {
      return "";
    }

    return params.conversationId as string;
  }, [params?.conversationId]);

  const handleSubmit = (data: string) => {
    axios.post("/api/messages", {
      message: data,
      conversationId: conversationId,
    });
  };
  return (
    <div className="flex w-full">
      <button>
        <HiPhoto size={30} className="text-black" />
      </button>
      <input
        type="text"
        onChange={(event) => setInput(event.target.value)}
        className="w-full p-1 border-2 border-black mx-2 rounded-md"
      />
      <button onClick={() => handleSubmit(input)}>
        <HiPaperAirplane size={20} />
      </button>
    </div>
  );
};

export default MessageForm;
