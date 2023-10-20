import { Conversation, Message, User } from "@prisma/client";
import ConvoInfo from "./ConvoInfo";
import ConvoList from "./ConvoList";
interface convo extends Message {
  sender: User;
}

const ConversationBox = ({
  children,
  conversation,
  messages,
}: {
  children: React.ReactNode;
  conversation: Conversation | null;
  messages: convo[];
}) => {
  //   if (!conversation) {
  //     return <EmptyConvo />;
  //   }
  return (
    <div className="h-full w-full">
      <ConvoInfo conversation={conversation} />
      <ConvoList messages={messages} />
      {children}
    </div>
  );
};

export default ConversationBox;
