import React from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import { useState } from "react";
const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message == "") return;
    await sendMessage(message);
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="px-1 py-1 border-t border-secondary"
    >
      <div className="w-full relative flex">
        <textarea
          type="text"
          className="border-2 text-sm rounded-lg block w-full p-2.5 bg-neutral  focus:outline-none border-secondary text-white "
          placeholder="Write a message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <button
          type="submit"
          className="absolute bg-secondary input-y-0 end-0 rounded-r-lg h-full flex items-center px-3"
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <BsSend className="w-6 h-6 text-secondary-content" />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
