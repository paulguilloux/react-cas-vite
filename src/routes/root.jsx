import React from "react";
import { Outlet } from "react-router";

const Root = () => {
  return (
    <div>
      <h1>React + CAS</h1>
      <Outlet />
    </div>
  );
};

export default Root;
