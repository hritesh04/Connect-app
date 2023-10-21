import { Conversation, Message, User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
interface Convo extends Conversation {
  messages: Partial<Message>[];
  users: User[];
}
const AllConversations = ({ conversations }: { conversations: Convo[] }) => {
  const router = useRouter();
  const handleNewConvo = async (userId: string) => {
    await axios
      .post("/api/conversations", {
        userId: userId,
      })
      .then((data) => router.push(`/conversations/${data.data.id}`))
      .finally(() => {
        console.log("Done");
      });
  };

  if (!conversations) {
    <div className="h-[92%] overflow-y-auto flex justify-center items-center w-full">
      <h1>All your Conversations are shown here</h1>
    </div>;
  }
  return (
    <div className="max-h-[92%] overflow-y-auto w-full">
      {conversations.map((convo) => {
        return (
          <div
            className="h-18 w-full grid grid-cols-12 gap-2 mb-1 pr-4 pb-1"
            onClick={() => handleNewConvo(convo.users[0].id)}
          >
            <img
              src={`${convo.users[1].image}`}
              className="h-fit w-fit object-contain p-1 col-span-2 rounded-full"
            />
            <div className="col-span-10 p-1">
              <div className="flex h-fit w-full justify-between">
                <p className="font-semibold">{convo.messages[0]?.body}</p>
                <p className="font-semibold">{convo.name}</p>
              </div>
              <p className="mt-3">{convo.messagesIds[0]}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default AllConversations;
