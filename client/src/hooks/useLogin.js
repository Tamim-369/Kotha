import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";

const useLogIn = () => {
  const [loading, setLoading] = useState(false);
  const { authUser, setAuthUser } = useAuthContext();
  const LogIn = async ({ username, password }) => {
    const success = handleInputErrors({ username, password });
    if (!success) return false;
    try {
      setLoading(true);
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message);
        setLoading(false);

        return false;
      }
      localStorage.setItem("userInfo", JSON.stringify(data.user));
      toast.success(data.message);
      setAuthUser(data.user);
      return true;
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { LogIn, loading };
};

export default useLogIn;

function handleInputErrors({ username, password }) {
  if (!username || !password) {
    toast.error("Fill all the fields");
    return false;
  }
  if (password.length < 8) {
    toast.error("Password must be 8 charecters");
    return false;
  }
  return true;
}
