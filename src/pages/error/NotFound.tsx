import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div className="container text-center mt-5">
      <div className="row">
        <div className="col-md-12">
          <h1 className="display-3 text-danger">404</h1>
          <p className="lead">
            Oops! The page you are looking for does not exist.
          </p>
          <hr />
          <p>
            <Link to="/" className="btn btn-primary">
              Go Back Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
