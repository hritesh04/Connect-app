"use client";
import axios from "axios";
import { useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import { CldUploadButton } from "next-cloudinary";
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

  const handleUpload = (data: any) => {
    axios.post("/api/messages", {
      image: data?.info?.secure_url,
      conversationId: conversationId,
    });
  };

  return (
    <div className="flex w-full p-2">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset="aak2eqva"
      >
        <button>
          <HiPhoto size={30} className="text-[#f8f8e9]" />
        </button>
      </CldUploadButton>
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
