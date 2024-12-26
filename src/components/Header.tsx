import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Header: React.FC = () => {
  return (
    <header className="bg-dark text-white p-2">
      <div className="container d-flex justify-content-between align-items-center">
        <Link
          to="/"
          className="text-decoration-none display-6 text-white"
          style={{ fontWeight: 500 }}
        >
          Movie Search
        </Link>

        <SearchBar />
      </div>
    </header>
  );
};

export default Header;
