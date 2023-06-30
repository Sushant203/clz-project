import React from "react";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const NavItems = [
    {
      name: "home",
    },
    {
      name: "about us",
    },
    {
      name: "contact",
    },
    {
      name: "Available Cabs",
    },
  ];
  return (
    <nav>
      <div className="flex justify-around bg-[#0f0f0f] text-white text-center w-screen h-12 items-center capitalize">
        <div>logo</div>

        <div className="">
          <div className="flex justify-evenly gap-3">
            {NavItems.map((val, i) => {
              return (
                <div key={i} className="">
                  {val.name}
                </div>
              );
            })}
          </div>
        </div>
        {/* profile logo section */}
        <h3>
          <CgProfile className="text-white text-2xl" />
        </h3>
      </div>
    </nav>
  );
};

export default Navbar;
