import React, { useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { useAuthContext } from "./context/AuthContext";

const App = () => {
  const { authUser } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      authUser &&
      (window.location.pathname === "/login" ||
        window.location.pathname === "/signup")
    ) {
      navigate("/", { replace: true });
    }
  }, [authUser, navigate]);

  const routes = [
    {
      path: "/",
      element: authUser ? <Home /> : <LogIn />,
    },
    {
      path: "/login",
      element: authUser ? <Navigate to="/" replace /> : <LogIn />,
    },
    {
      path: "/signup",
      element: authUser ? <Navigate to="/" replace /> : <SignUp />,
    },
    {
      path: "*",
      element: <div>404 - Page Not Found</div>,
    },
  ];

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  );
};

export default App;
