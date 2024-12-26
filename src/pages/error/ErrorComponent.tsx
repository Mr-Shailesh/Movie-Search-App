import React from "react";

const ErrorComponent = ({ error }: any) => {
  return (
    <div className="alert alert-danger d-flex align-items-center" role="alert">
      <i className="bi bi-exclamation-circle-fill me-2"></i>
      <span>{error}</span>
    </div>
  );
};

export default ErrorComponent;
