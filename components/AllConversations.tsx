"use client";
import { Conversation, Message, User } from "@prisma/client";
import ConversationBox from "./ConverationBox";
type Convo = Conversation & {
  messages: Message[];
  users: User[];
};
const AllConversations = ({ conversations }: { conversations: Convo[] }) => {
  if (!conversations || conversations.length == 0) {
    return (
      <div className="h-[92%] md:w-full overflow-y-auto flex justify-center items-start w-full text-[#f8f8e9]">
        <h1 className=" text-center mt-14">
          All your Conversations are shown here
        </h1>
      </div>
    );
  }
  return (
    <div className="h-full max-h-[92%] p-2 overflow-y-auto w-full">
      {conversations.map((convo) => (
        <ConversationBox conversation={convo} key={convo.id} />
      ))}
    </div>
  );
};
export default AllConversations;
