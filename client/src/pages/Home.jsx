import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import MessageContainer from "../components/messages/MessageContainer";
import useGetMessages from "../hooks/useGetMessages";
import useConversation from "../zustand/useConversation";
import { useState } from "react";
import { useEffect } from "react";

const Home = () => {
  const { selectedConversation } = useConversation();

  return (
    <div className="flex  rounded-lg bg-primary-content w-full md:w-11/12 lg:w-10/12">
      <div
        className={`${
          selectedConversation != null ? "hidden" : "block"
        } md:block w-full md:w-4/12 h-[90dvh]`}
      >
        <Sidebar />
      </div>
      <div
        className={`${
          selectedConversation != null ? "block" : "hidden"
        } md:block w-full md:w-8/12 h-[90dvh]`}
      >
        <MessageContainer />
      </div>
    </div>
  );
};

export default Home;
