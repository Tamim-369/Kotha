import React, { useState } from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";
import { FaSearch } from "react-icons/fa";

const Sidebar = () => {
  const { loading, conversations } = useGetConversations();
  const [search, setSearch] = useState("");

  // Filter and sort conversations
  const filteredConversations = conversations
    .filter((conversation) =>
      conversation.username.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      // If 'a' matches exactly with the search query, it should appear before 'b'
      if (a.username.toLowerCase() === search.toLowerCase()) return -1;
      // If 'b' matches exactly with the search query, it should appear before 'a'
      if (b.username.toLowerCase() === search.toLowerCase()) return 1;
      // Otherwise, keep the original order
      return 0;
    });

  return (
    <div className={`border-r border-secondary p-4 h-[100%] flex flex-col`}>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered rounded-lg w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="divider px-3"></div>
      <div className="py-2 flex flex-col overflow-auto h-[100%]">
        {loading ? (
          <span className="loading loading-spinner mx-auto"></span>
        ) : (
          filteredConversations.map((conversation) => (
            <Conversation key={conversation._id} conversation={conversation} />
          ))
        )}
      </div>
      <div className="divider px-3"></div>
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
