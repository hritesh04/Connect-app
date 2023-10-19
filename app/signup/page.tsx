"use client";

import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Signup = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [roomId, setRoomId] = useState("");
  return (
    <div>
      Name
      <br />
      <input
        type="text"
        placeholder="name"
        onChange={(event) => setName(event.target.value)}
        className="text-black"
      />
      <br />
      Password
      <br />
      <input
        type="text"
        placeholder="password"
        onChange={(event) => setPassword(event.target.value)}
        className="text-black"
      />
      <br />
      RoomId
      <br />
      <input
        type="text"
        placeholder="text"
        onChange={(event) => setRoomId(event.target.value)}
        className="text-black"
      />
      <button onClick={() => router.push(`/chat/${roomId}`)}>SignUp</button>
    </div>
  );
};

export default Signup;
