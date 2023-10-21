import getMessages from "../../utils/getMessages";
import ConversationBox from "../../components/ConverationBox";
import ConvoSettings from "../../components/ConvoSettings";
import getConversationById from "../../utils/getConversationById";
import EmptyConvo from "@/app/components/EmptyConvo";
import ConvoInfo from "@/app/components/ConvoInfo";
import ConvoList from "@/app/components/ConvoList";
import MessageForm from "@/app/components/MessageForm";

export default async function ConversationId({
  params,
}: {
  params: { conversationId: string };
}) {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return <EmptyConvo />;
  }
  return (
    <div className="h-full w-full col-span-7">
      <div className="flex flex-col">
        <ConvoInfo conversation={conversation} />
        <ConvoList messages={messages} />
        <MessageForm />
      </div>
    </div>
  );
}
