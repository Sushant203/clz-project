import React from "react";
import cab4 from "../resources/images/cab4.jpg";
const Home = () => {
  return (
    <div>
      {/* upper body */}
      <div className="border-none shadow-lg shadow-slate-400 flex justify-center items-center">
        <div
          className=""
          style={{
            backgroundImage: `url(${cab4})`,
            backgroundRepeat: "no-repeat",
            height: "400px",
            width: "600px",
            opacity: "0.2",
          }}
        ></div>
      </div>
      <h1
        className="capitalize text-6xl font-semibold
      absolute top-48 left-[30rem]  text-[#9E0F0F] "
      >
        cab booking system
      </h1>
    </div>
  );
};

export default Home;
