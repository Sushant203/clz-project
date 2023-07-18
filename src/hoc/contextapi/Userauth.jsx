import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserAuthContext = createContext();
const UserAuthContextapi = ({ children }) => {
  const navigate = useNavigate();
  const [Token, setToken] = useState("");
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [localStorage]);

  return (
    <UserAuthContext.Provider
      value={{ name: "hello", tkn: localStorage.getItem("token") }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthContextapi;
