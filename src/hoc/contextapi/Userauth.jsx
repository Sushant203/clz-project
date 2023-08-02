import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserAuthContext = createContext();
const UserAuthContextapi = ({ children }) => {
  const navigate = useNavigate();
  const [Token, setToken] = useState("");

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      // Check if the user is navigating within the application or leaving the site
      const internalNavigation =
        e.currentTarget.performance.navigation.type === 1;

      // Clear the token from localStorage only if the user is leaving the site (not on internal navigation)
      if (!internalNavigation) {
        localStorage.removeItem("token");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      navigate("/");
    } else {
      navigate("/login");
    }

    return () => {
      // Cleanup: Remove the event listener when the component is unmounted
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <UserAuthContext.Provider
      value={{ name: "hello", tkn: localStorage.getItem("token") }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthContextapi;
