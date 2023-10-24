"use client";
import axios from "axios";
import { useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
const MessageForm = () => {
  const [input, setInput] = useState("");
  const params = useParams();
  const msgRef = useRef<HTMLInputElement>(null);
  const conversationId = useMemo(() => {
    if (!params?.conversationId) {
      return "";
    }

    return params.conversationId as string;
  }, [params?.conversationId]);

  const handleSubmit = (data: string) => {
    if (data) {
      axios.post("/api/messages", {
        message: data,
        conversationId: conversationId,
      });
      msgRef.current!.value = "";
    }
  };
  return (
    <div className="flex w-full p-2">
      <button>
        <HiPhoto size={30} className="text-[#f8f8e9]" />
      </button>
      <input
        type="text"
        onChange={(event) => setInput(event.target.value)}
        className="w-full p-1 border-2 border-[#f8f8e9] text-black mx-2 rounded-md"
        ref={msgRef}
      />
      <button onClick={() => handleSubmit(input)}>
        <HiPaperAirplane size={20} className="text-[#f8f8e9]" />
      </button>
    </div>
  );
};

export default MessageForm;
