import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import { timeAgo } from "../../utils/extractTime";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  return (
    <>
      <div
        className={`chat ${
          message?.senderId !== authUser?._id ? "chat-start" : "chat-end"
        }`}
      >
        <div className="chat-image avatar">
          <div className="w-10 rounded-full gradient-background ">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://static.thenounproject.com/png/1266207-200.png"
              className="rounded-full invert"
            />
          </div>
        </div>
        <div
          className={`chat-bubble ${
            message?.senderId !== authUser?._id
              ? "bg-secondary text-secondary-content"
              : "bg-primary text-primary-content"
          }`}
        >
          {message.message}
        </div>
        <time className="text-xs opacity-50">{timeAgo(message.createdAt)}</time>
      </div>
    </>
  );
};

export default Message;
