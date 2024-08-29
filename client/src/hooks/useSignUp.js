import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const { authUser, setAuthUser } = useAuthContext();
  const signUp = async ({ fullname, username, gender, password }) => {
    const success = handleInputErrors({ fullname, username, gender, password });
    if (!success) return false;
    try {
      setLoading(true);
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullname, username, gender, password }),
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

  return { signUp, loading };
};

export default useSignUp;

function handleInputErrors({ fullname, username, gender, password }) {
  if (!fullname || !username || !gender || !password) {
    toast.error("Fill all the fields");
    return false;
  }
  if (password.length < 8) {
    toast.error("Password must be 8 charecters");
    return false;
  }
  return true;
}
