import React from "react";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketioContext";

const Conversation = ({ conversation }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id == conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);
  return (
    <>
      <div
        onClick={() => setSelectedConversation(conversation)}
        className={`flex gap-2 items-center hover:bg-primary/85 rounded-md px-2 py-1 cursor-pointer ${
          isSelected ? "bg-primary/85" : ""
        }`}
      >
        <div className={`avatar ${isOnline ? "online" : "offline"}`}>
          <div className="w-24 gradient-background bg-opacity-65 rounded-full border max-w-14 border-primary">
            <img
              src={"https://static.thenounproject.com/png/1266207-200.png"}
              className=" invert"
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200 ">{conversation.username}</p>
            <span>12:30</span>
          </div>
        </div>
      </div>
      <div className="divide-x-0 my-0 py-0 h-1"></div>
    </>
  );
};

export default Conversation;
