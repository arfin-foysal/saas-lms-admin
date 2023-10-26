import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Error = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  }
  return (
    <>
      <div className="container-fluid">
        {/* <!-- 404 Error Text --> */}
        {/* <div className="text-center mt-5 row">
          <div className="error mx-auto mt-5" data-text="404"><h2>
            404
          </h2>
          </div>
          <p className="lead text-gray-800 mb-5">Page Not Found</p>
          <p className="text-gray-500 mb-0">
            It looks like you found a glitch in the matrix...
          </p>
        </div> */}
        <div className="text-center mt-5">
          <Link to="#" className="btn btn-primary btn-sm" onClick={goBack}>&larr; Go Back</Link>
        </div>
      </div>
    </>
  );
};

export default Error;
