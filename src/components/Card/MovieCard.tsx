import React from "react";
import "../../styles/MovieCard.css";

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  releaseDate,
  posterPath,
  overview,
  onClick,
}) => {
  return (
    <div className="col-12 col-sm-6 col-md-3 mb-4" onClick={onClick}>
      <div className="card fixed-height-card card-hover">
        <img
          src={`https://image.tmdb.org/t/p/w200${posterPath}`}
          className="card-img-top fixed-height-img"
          alt={title}
          loading="lazy"
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{title}</h5>
          <p className="card-text text-truncate-4">{overview}</p>
          <p className="card-text">
            <small className="text-muted">Released: {releaseDate}</small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
