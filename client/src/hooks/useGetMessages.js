import React, { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import { toast } from "react-toastify";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        if (!selectedConversation?._id) return; // Ensure _id is valid

        const response = await fetch(
          `/api/messages/${selectedConversation._id}`
        );
        const responseData = await response.json();
        const data = responseData?.messages;
        if (!responseData.messages) setMessages([]);
        if (!response.ok) {
          toast.error(data?.message);
          if (!data) {
            setMessages([]);
          }
          return;
        }

        setMessages(data);
      } catch (error) {
        toast.error(error?.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [selectedConversation]);
  return { messages, loading };
};

export default useGetMessages;
