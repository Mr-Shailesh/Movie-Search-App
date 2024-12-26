import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMovies } from "../redux/features/movies/movieSlice";
import { AppDispatch } from "../redux/store";
import { useNavigate, useSearchParams } from "react-router-dom";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  let currentPage = 1;

  useEffect(() => {
    const searchQuery = searchParams.get("search") || "";
    setQuery(searchQuery);
  }, [searchParams]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      dispatch(fetchMovies({ query: query, page: currentPage }));
      navigate(`?search=${query}`);
    }
  };

  return (
    <input
      type="text"
      className="form-control w-50"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={handleKeyPress}
      placeholder="Search for movies..."
    />
  );
};

export default SearchBar;
