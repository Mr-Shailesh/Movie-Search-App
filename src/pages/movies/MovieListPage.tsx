import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import MovieCard from "../../components/Card/MovieCard";
import FullPageLoader from "../../components/Loader/FullPageLoader";
import FetchingLoader from "../../components/Loader/FetchingLoader";
import {
  fetchMovies,
  fetchPopularMovies,
  resetMovies,
} from "../../redux/features/movies/movieSlice";
import ErrorComponent from "../error/ErrorComponent";

const MovieListPage: React.FC = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const { movies, searchResults, loading, error } = useSelector(
    (state: RootState) => state.movies
  );

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(resetMovies());

    if (searchQuery.trim() === "") {
      dispatch(fetchPopularMovies(1)).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          setTotalPages(action.payload.total_pages);
          setCurrentPage(2);
        }
      });
    } else {
      dispatch(fetchMovies({ query: searchQuery, page: 1 })).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          setTotalPages(action.payload.total_pages);
          setCurrentPage(2);
        }
      });
    }
  }, [searchQuery, dispatch]);

  const handleMovieClick = (id: number) => {
    navigate(`/movie-details/${id}`);
  };

  const headerTitle = searchQuery.trim() ? "Search Results" : "Popular Movies";

  const loadMoreMovies = useCallback(() => {
    if (isFetching || currentPage >= totalPages) return;
    setIsFetching(true);

    if (searchQuery.trim() === "") {
      dispatch(fetchPopularMovies(currentPage)).then((action) => {
        // here we have take the response to set the current page and totalpage value
        if (action.meta.requestStatus === "fulfilled") {
          setTotalPages(action.payload.total_pages);
          setCurrentPage(currentPage + 1);
        }
      });
    } else {
      dispatch(fetchMovies({ query: searchQuery, page: currentPage })).then(
        (action) => {
          // here we have take the response to set the current page and totalpage value
          if (action.meta.requestStatus === "fulfilled") {
            setTotalPages(action.payload.total_pages);
            setCurrentPage(currentPage + 1);
          }
        }
      );
    }
  }, [isFetching, currentPage, totalPages, dispatch, searchQuery]);

  // Here scroll event listener detect when the user reaches the bottom
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.innerHeight + document.documentElement.scrollTop;
      const bottomPosition = document.documentElement.scrollHeight;

      if (scrollPosition >= bottomPosition - 100) {
        loadMoreMovies();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      // Clean up the event listener
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loadMoreMovies]);

  useEffect(() => {
    if (!loading) {
      setIsFetching(false);
    }
  }, [loading]);

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">{headerTitle}</h2>
      {loading && !isFetching && <FullPageLoader />}
      {error && <ErrorComponent error={error} />}
      <div className="row">
        {(searchQuery.trim() ? searchResults : movies).map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            releaseDate={movie.release_date}
            posterPath={movie.poster_path}
            overview={movie.overview}
            onClick={() => handleMovieClick(movie.id)}
          />
        ))}
      </div>
      {isFetching && <FetchingLoader />}
    </div>
  );
};

export default MovieListPage;
