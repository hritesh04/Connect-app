import getMessages from "../../utils/getMessages";
import getConversationById from "../../utils/getConversationById";
import EmptyConvo from "@/app/components/EmptyConvo";
import ConvoInfo from "@/app/components/ConvoInfo";
import ConvoList from "@/app/components/ConvoList";
import MessageForm from "@/app/components/MessageForm";
import getCurrentUser from "@/app/utils/getCurrentUser";
interface IParams {
  conversationId: string;
}
interface Params {
  conversationId: string;
}

const Conversation = async ({ params }: { params: Params }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId!);

  if (!conversation) {
    return <EmptyConvo />;
  }
  return (
    <div className="h-full w-full col-span-7 p-1 overflow-hidden">
      <div className="flex h-full w-full flex-col gap-1 rounded-xl border-2 border-black">
        <ConvoInfo conversation={conversation} />
        <ConvoList messages={messages} />
        <MessageForm />
      </div>
    </div>
  );
};
export default Conversation;
