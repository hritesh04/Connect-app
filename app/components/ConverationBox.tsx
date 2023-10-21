import { Conversation, Message, User } from "@prisma/client";
import ConvoInfo from "./ConvoInfo";
import ConvoList from "./ConvoList";
import MessageForm from "./MessageForm";
interface convo extends Message {
  sender: User;
}

interface ConversationBoxProps {
  children: React.ReactNode;
  conversation: Conversation | null;
  messages: convo[];
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
  children,
  conversation,
  messages,
}) => {
  return (
    <div className="h-full w-full">
      <ConvoInfo conversation={conversation} />
      <ConvoList messages={messages} />
      <MessageForm />
      {children}
    </div>
  );
};

export default ConversationBox;
