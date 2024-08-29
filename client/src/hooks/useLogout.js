import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const logout = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        setLoading(false);
        return;
      }
      localStorage.removeItem("userInfo");
      setAuthUser(null);
      toast.success(data.message);
      setLoading(false);
      return true;
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading };
};

export default useLogout;
