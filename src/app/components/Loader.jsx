import React from "react";
const Loader = () => {
  return (
    <>
      <div
        className="text-center"
        style={{
          textAlign: "center",
          color: "#8500ffa3",
          backgroundColor: "#000000a3",
          zIndex: "99999",
          width: "100%",
          height: "100%",
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="spinner-border text-secondary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>

    </>
  );
};

export default Loader;
