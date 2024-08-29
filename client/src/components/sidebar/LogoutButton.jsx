import React from "react";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
const LogoutButton = () => {
  const { loading, logout } = useLogout();
  return (
    <div className="mt-auto  ">
      <div
        onClick={logout}
        className="btn btn-circle gradient-background flex flex-col justify-center items-center"
      >
        <BiLogOut className="w-6 h-6 mr-1  text-white cursor-pointer" />
      </div>
    </div>
  );
};

export default LogoutButton;
