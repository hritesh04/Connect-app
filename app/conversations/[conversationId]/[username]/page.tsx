"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";

interface Params {
  conversationId: string;
  username: string;
}

const Room = ({ params }: { params: Params }) => {
  const [token, setToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!params?.username) return;
    (async () => {
      try {
        const resp = await fetch(
          `/api/livekit?room=${params.conversationId}&username=${params.username}`
        );
        const data = await resp.json();
        setToken(data.token);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [params.username, params.conversationId]);

  const roomId = params.username;
  console.log(roomId);
  return (
    <div className="h-full w-full col-span-7 p-1 overflow-hidden">
      <div className="flex h-full w-full flex-col gap-1 rounded-xl border-2 border-black text-white">
        <LiveKitRoom
          data-lk-theme="default"
          serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
          token={token}
          connect={true}
          video={true}
          audio={true}
          onDisconnected={() => router.back()}
        >
          <VideoConference />
        </LiveKitRoom>
      </div>
    </div>
  );
};

export default Room;
