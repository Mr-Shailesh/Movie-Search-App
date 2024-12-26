import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMovies, resetMovies } from "../redux/features/movies/movieSlice";
import { AppDispatch } from "../redux/store";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import "../styles/SearchBar.css";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  let currentPage = 1;

  useEffect(() => {
    const searchQuery = searchParams.get("search") || "";
    setQuery(searchQuery);
  }, [searchParams]);

  useEffect(() => {
    if (query.trim()) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/search/movie`, {
          params: {
            api_key: process.env.REACT_APP_API_KEY,
            query: query,
            page: currentPage,
          },
        })
        .then((response) => {
          const movieTitles = response.data.results.map(
            (movie: { title: string }) => movie.title
          );
          setSuggestions(movieTitles);
        })
        .catch((error) => {
          console.error("Error fetching movie suggestions:", error);
        });
    } else {
      setSuggestions([]);
    }
  }, [query, currentPage]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      dispatch(fetchMovies({ query: query, page: currentPage }));
      navigate(`?search=${query}`);
      dispatch(resetMovies());
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    dispatch(fetchMovies({ query: suggestion, page: currentPage }));
    navigate(`?search=${suggestion}`);
    dispatch(resetMovies());
    setSuggestions([]);
  };

  return (
    <div className="search-bar-container position-relative">
      <input
        type="text"
        className="search-input form-control w-100"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Search for movies..."
      />
      {suggestions.length > 0 && (
        <ul className="suggestions-list list-group position-absolute w-100">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="suggestion-item list-group-item list-group-item-action"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
