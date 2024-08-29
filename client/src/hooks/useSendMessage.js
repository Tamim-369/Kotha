import { useState } from "react";
import useConversation from "../zustand/useConversation";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const {
    messages,
    setMessages,
    setSelectedConversation,
    selectedConversation,
  } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/messages/send/${selectedConversation._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message);
        setLoading(false);
      }

      setMessages([...messages, data.message]);
      setSelectedConversation({
        ...selectedConversation,
        lastMessage: data.message,
      });
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { sendMessage, loading };
};

export default useSendMessage;
