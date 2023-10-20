import getMessages from "../../utils/getMessages";
import ConversationBox from "../../components/ConverationBox";
import ConvoSettings from "../../components/ConvoSettings";
import getConversationById from "../../utils/getConversationById";

export default async function ConversationId({
  params,
}: {
  params: { conversationId: string };
}) {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);
  return (
    <div className="h-full w-full col-span-7">
      <ConversationBox conversation={conversation} messages={messages}>
        <ConvoSettings conversation={conversation} />
      </ConversationBox>
    </div>
  );
}
