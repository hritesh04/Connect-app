"use client";
import axios from "axios";
import { useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import { CldUploadButton } from "next-cloudinary";
import { IoIosSend } from "react-icons/io";

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
    <div className="flex w-full h-[10%] items-center p-2">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset="aak2eqva"
      >
        <button>
          <HiPhoto size={35} className="text-[#f8f8e9]" />
        </button>
      </CldUploadButton>
      <input
        type="text"
        placeholder="Write a reply..."
        onChange={(event) => setInput(event.target.value)}
        className="w-full p-1 border-2 border-[#f8f8e9] text-black mx-2 rounded-md outline-none"
        ref={msgRef}
      />
      <button
        onClick={() => handleSubmit(input)}
        className=" bg-[#5c61ed] h-full md:w-1/12 flex items-center justify-center rounded-md p-2"
      >
        {/* <HiPaperAirplane size={20} className="text-[#f8f8e9]" /> */}
        <IoIosSend size={20} className="text-[#f8f8e9]" />
        <p className=" text-white pl-2">SEND</p>
      </button>
    </div>
  );
};

export default MessageForm;
