import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  return (
    <div className="py-2 h-[100%] flex flex-col overflow-auto">
      {conversations.map((conversation, idx) => (
        <Conversation key={conversation._id} conversation={conversation} />
      ))}

      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};
export default Conversations;
