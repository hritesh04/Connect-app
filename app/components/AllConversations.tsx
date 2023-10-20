import { Conversation, Message, User } from "@prisma/client";
interface Convo extends Conversation {
  messages: Partial<Message>[];
  users: User[];
}
const AllConversations = ({ conversations }: { conversations: Convo[] }) => {
  return (
    <div className="max-h-[92%] overflow-y-auto w-full">
      <h1> Hello All conversation</h1>
      {conversations.map((convo) => {
        return (
          <div className="h-18 w-full grid grid-cols-12 gap-2 mb-1 pr-4 pb-1">
            <img
              src={`${convo.users[0].image}`}
              className="h-fit w-fit object-contain p-1 col-span-2 rounded-full"
            />
            <div className="col-span-10 p-1">
              <div className="flex h-fit w-full justify-between">
                <p className="font-semibold">{convo.messages[0].body}</p>
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
