import React from "react";

import "./Dashboard.scss";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="py-2 shadow-lg row px-3 footer">
      <div className="col text-center">
        <p style={{ fontSize: "13px" }} className="p-0 m-0   ">
          <span className="text-info ">BacBon Limited </span> © {year}.
        </p>
      </div>
      {/* <div className="col text-e">
        <p style={{ fontSize: "13px" }} className="p-0 m-0 fw-bold ">
          Developed by
          <Link
            className="text-decoration-none text-info ms-1"
            target="_blank"
            to="https://bacbonltd.com
             "
          >
            BacBon Limited.
          </Link>
        </p>
      </div> */}
    </div>
  );
};

export default Footer;
