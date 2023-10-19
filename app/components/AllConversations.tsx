import { User } from "@prisma/client";

const AllConversations = ({ conversations }: { conversations: User[] }) => {
  return (
    <div className="h-full w-full">
      {conversations.map((convo) => {
        return (
          <div className="h-18 w-full">
            <p>{convo.name}</p>
            <img src={`${convo.image}`} />
          </div>
        );
      })}
    </div>
  );
};
export default AllConversations;
