import React from "react";
import { Link, useNavigate } from "react-router-dom";
import error from "../../../assets/images/error.png";
const Error = () => {
  const navigate = useNavigate();
	const goBack = () => {
		navigate(-1);
	}
  return (
    <>
      <div className="container-fluid">
        {/* <!-- 404 Error Text --> */}
        <div className="text-center">
          <img width="500px" src={error} alt="" />
        </div>

        <div className="text-center">
          <Link to="#" className="btn btn-primary btn-sm" onClick={goBack}>&larr; Go Back</Link>
        </div>
      </div>
    </>
  );
};

export default Error;
