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
            opacity: "0.4",
          }}
        ></div>
      </div>

      {/* body section */}
      <div>
        <div className="py-5 text-center">
          <h2 className="text-3xl font-bold">why choose us?</h2>
        </div>
      </div>
    </div>
  );
};

export default Home;
