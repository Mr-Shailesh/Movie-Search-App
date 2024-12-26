import React from "react";

const FullPageLoader: React.FC = () => {
  return (
    <div className="d-flex justify-content-center align-items-center position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50">
      <div
        className="spinner-border text-light"
        style={{ width: "48px", height: "48px" }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default FullPageLoader;
