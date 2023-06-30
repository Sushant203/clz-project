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

      {/* body section */}
      <div>
        <article>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Perspiciatis, voluptatibus veritatis quaerat recusandae velit quis,
          consectetur facilis illo id mollitia ipsum qui accusantium odit
          possimus quae ipsam officiis illum natus! Illo ratione veritatis
          quisquam ipsam! Quam accusamus molestiae laudantium nam debitis
          veniam, ex dolores maxime harum aliquam! Nobis officiis quaerat
          voluptatum recusandae, sapiente repellat perferendis nisi excepturi
          sit? Nostrum, itaque. Necessitatibus, atque accusantium. Assumenda
          molestias maiores nobis odit quibusdam est laborum? Laborum,
          aspernatur unde. Illum animi adipisci ad perferendis tenetur veniam
          aspernatur, nulla ea quasi facilis eveniet, labore, nobis sapiente.
          Necessitatibus recusandae omnis suscipit vero reiciendis ducimus a?
          Recusandae minus sequi porro provident reprehenderit unde dolorum
          repellendus temporibus, enim rem nulla dolore eos obcaecati commodi
          velit esse delectus blanditiis facilis.
        </article>
      </div>
    </div>
  );
};

export default Home;
