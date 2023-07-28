import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/homepage/footer/Footer";
import UserAuthContextapi from "../contextapi/Userauth";
import Login from "../../components/login/Login";
import Signup from "../../components/login/Signup";

const Layout = () => {
  const location = useLocation();
  return (
    <UserAuthContextapi>
      <>
        {location.pathname === "/login" && <Login />}
        {location.pathname === "/signup" && <Signup />}
        {location.pathname !== "/login" && location.pathname !== "/signup" && (
          <div>
            <Navbar />
            <div className="min-h-screen ">
              <Outlet />
            </div>
            <Footer />
          </div>
        )}
      </>
    </UserAuthContextapi>
  );
};

export default Layout;
