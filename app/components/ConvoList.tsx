import { Message, User } from "@prisma/client";
import getCurrentUser from "../utils/getCurrentUser";
import useSession from "../utils/useSession";
interface convo extends Message {
  sender: User;
}
const ConvoList = async ({ messages }: { messages: convo[] }) => {
  const session = await useSession();
  if (!messages) {
    return <div>No Messages</div>;
  }
  return (
    <div>
      {messages.map((msg) =>
        session?.user?.email === msg.sender.email ? (
          <div>CurrentUser is the Sender</div>
        ) : (
          <div>OtherUser is the Sender</div>
        )
      )}
    </div>
  );
};
export default ConvoList;
