import React from "react";
import { Outlet } from "react-router-dom";

const SiteRoot = () => {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
};

export default SiteRoot;
