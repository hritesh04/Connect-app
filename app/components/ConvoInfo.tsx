import { Conversation } from "@prisma/client";

interface ConvoInfoProps {
  conversation: Conversation | null;
}

const ConvoInfo: React.FC<ConvoInfoProps> = ({ conversation }) => {
  return (
    <div className="bg-slate-400 h-[10%] w-full flex items-center justify-between p-2">
      <div className="h-full flex justify-start items-center">
        <img src="" className="h-full w-full object-contain rounded-full" />
        <p className="ml-4">{conversation?.name}</p>
      </div>
      <div className="mr-4">:</div>
    </div>
  );
};
export default ConvoInfo;
