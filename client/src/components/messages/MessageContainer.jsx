import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { useState } from "react";
import useConversation from "../../zustand/useConversation";
import { MdMenuOpen } from "react-icons/md";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  return (
    <div className="w-full flex flex-col ">
      {selectedConversation ? (
        <div className="w-full">
          <div
            className={`bg-secondary text-white ${
              selectedConversation != null ? "rounded-t-lg" : "rounded-tr-lg"
            } sm:rounded-tr-lg flex items-center gap-1 sm:rounded-t-none  px-4 py-2 mb-2`}
          >
            <div className="mr-2 md:hidden">
              <MdMenuOpen
                onClick={() => setSelectedConversation(null)}
                className="text-white text-3xl cursor-pointer"
              />
            </div>
            <span className="font-bold text-lg uppercase ">
              {selectedConversation?.username}
            </span>
          </div>
          <Messages />
          <MessageInput />
        </div>
      ) : (
        <div className="bg-secondary px-4 py-2 mb-2">
          <span className="label-text font-bold text-lg">Select a chat</span>
        </div>
      )}
    </div>
  );
};

export default MessageContainer;
