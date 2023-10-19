import { User } from "@prisma/client";

const AllConversations = ({ conversations }: { conversations: User[] }) => {
  return (
    <div className="h-full w-full">
      {conversations.map((convo) => {
        return (
          <div className="h-18 w-full grid grid-cols-12 gap-2 border-black border-b-2 p-1">
            <img
              src={`${convo.image}`}
              className="h-fit w-fit object-contain col-span-2 rounded-full"
            />
            <div className="col-span-10 p-1">
              <div className="flex h-fit w-full justify-between">
                <p className="font-semibold">{convo.name}</p>
                <p className="font-semibold">{convo.name}</p> {/*time*/}
              </div>
              <p className="mt-3">{convo.name}</p>
              {/*last msg*/}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default AllConversations;
