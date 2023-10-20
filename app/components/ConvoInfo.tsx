import { Conversation } from "@prisma/client";

const ConvoInfo = ({ conversation }: { conversation: Conversation | null }) => {
  return (
    <div className="bg-slate-400 h-[15%] w-full flex items-center justify-between p-2">
      <div className="h-full flex justify-start items-center">
        <img src="" className="h-full w-full object-contain rounded-full" />
        <p className="ml-4">Hello</p>
      </div>
      <div className="mr-4">:</div>
    </div>
  );
};
export default ConvoInfo;
