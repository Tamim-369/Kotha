import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/users");
        const responseData = await response.json();
        if (!response.ok) {
          toast.error(data.message);
          setLoading(false);
          return;
        }
        const data = responseData.allUsers;
        setConversations(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, []);
  return { loading, conversations, setConversations };
};

export default useGetConversations;
