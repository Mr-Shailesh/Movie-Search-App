import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetMovies } from "../redux/features/movies/movieSlice";
import { AppDispatch } from "../redux/store";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import "../styles/SearchBar.css";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  let currentPage = 1;

  useEffect(() => {
    const searchQuery = searchParams.get("search") || "";
    setQuery(searchQuery);
  }, [searchParams]);

  // This useEffect works for suggestion of movies
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

  const handleSearchAction = (query: string) => {
    if (query.trim()) {
      navigate(`?search=${query}`);
      dispatch(resetMovies());
      setSuggestions([]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchAction(query);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    handleSearchAction(suggestion);
  };

  const handleBlur = () => {
    setTimeout(() => setIsFocused(false), 200);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  return (
    <div className="search-bar-container position-relative">
      <input
        type="text"
        className="search-input form-control w-100"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Search for movies..."
      />
      {isFocused && suggestions.length > 0 && (
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
