import React, { useState, useEffect } from "react";

import axios from "axios";

const Dashboard = () => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/1") // Replace with your API endpoint URL
      .then((response) => {
        setData([response.data]);
        console.log(response.data); // Handle successful response
      })
      .catch((error) => {
        console.error(error); // Handle error
      });
  }, []);

  const TableFields = [
    {
      title: "S.N",
      label: "S.N",
    },
    {
      title: "Date Booked",
      label: "Date Booked",
    },
    {
      title: "Driver Name",
      label: "Driver Name",
    },
    {
      title: "Details",
      label: "Details",
    },
    {
      title: "Status",
      label: "Status",
    },
    {
      title: "Action",
      label: "Action",
    },
  ];

  return (
    <div>
      <div className="">
        <table className="border-2 w-full" cellPadding={6}>
          <thead className=" bg-slate-300">
            <tr className=" ">
              {TableFields.map((val, i) => {
                return (
                  <th key={i} className="border">
                    {val.title}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="">
            {Data.map((item, index) => {
              console.log(item);
              return (
                <tr key={index} className="">
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>1</td>
                  <td>2023-7/5</td>
                  <td>sushant</td>
                  <td>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Ab, est! Id eligendi possimus aliquid voluptatum voluptatem
                    magnam doloribus fugiat corporis! Exercitationem, quia.{" "}
                  </td>
                </tr>
              );
            })}
            {/* <tr>
              <td>1</td>
              <td>nj</td>
              <td>xdb</td>
              <td>sfg</td>
              <td>sf</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
