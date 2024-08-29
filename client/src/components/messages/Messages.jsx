import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView();
    }, 100);
  }, [messages]);

  if (!Array.isArray(messages)) {
    return null;
  } else {
    return (
      <div className="px-4 h-[70dvh] flex-1 overflow-auto pb-4">
        {loading ? (
          <div className="flex justify-center items-center min-h-full">
            <span className="loading loading-bars loading-md text-primary"></span>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={message._id || index}
              ref={index === messages.length - 1 ? lastMessageRef : null}
            >
              <Message message={message} />
            </div>
          ))
        )}
      </div>
    );
  }
};

export default Messages;
