import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchMovieDetails } from "../redux/features/movies/movieSlice";
import FullPageLoader from "./Loader/FullPageLoader";
import ErrorComponent from "../pages/error/ErrorComponent";

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedMovie, loading, error } = useSelector(
    (state: RootState) => state.movies
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieDetails(Number(id)));
    }
  }, [id, dispatch]);

  if (loading) return <FullPageLoader />;
  if (error) return <ErrorComponent error={error}/>;
  if (!selectedMovie) return <p>No movie found.</p>;

  return (
    <div className="container my-5">
      <button className="btn btn-secondary mb-4" onClick={() => navigate("/")}>
        Back to Movies
      </button>
      <div className="row">
        <div className="col-md-4 mb-4">
          <img
            src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
            className="img-fluid rounded"
            alt={selectedMovie.title}
            loading="lazy"
          />
        </div>

        <div className="col-md-8">
          <h2 className="display-4">{selectedMovie.title}</h2>
          <p className="text-muted">
            <small>Release Date: {selectedMovie.release_date}</small>
          </p>

          <div className="mb-4">
            <h5>Overview</h5>
            <p>{selectedMovie.overview}</p>
          </div>

          <div className="mb-4">
            <h5>Genres</h5>
            <ul className="list-inline">
              {selectedMovie.genres.map((genre: any) => (
                <li key={genre.id} className="list-inline-item">
                  <span className="badge bg-primary">{genre.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5>Rating</h5>
            <p>
              <span className="badge bg-success">
                {selectedMovie.vote_average} / 10
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
