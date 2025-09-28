import React from "react";
import { useNavigate } from "react-router-dom";

const MovieCard = ({
  movie: { id, title, name, vote_average, poster_path, release_date, first_air_date, original_language }
}) => {
  const navigate = useNavigate();

  // Agar title hai toh movie, warna TV show
  const type = title ? "movie" : "tv";
  const displayTitle = title || name || "Untitled";

  return (
    <div
      onClick={() => navigate(`/${type}/${id}`)}
      className="movie-card relative cursor-pointer group rounded-lg overflow-hidden hover:scale-105 transition duration-300"
    >
      {/* Poster */}
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : "/No-Poster.png"
        }
        alt={displayTitle}
        className="w-full h-auto object-cover"
      />

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
        <span className="text-white font-bold text-lg">View Details</span>
      </div>

      {/* Info Section */}
      <div className="mt-4">
        <h3 className="font-semibold">{displayTitle}</h3>
        <div className="content flex items-center space-x-2 text-sm text-gray-600">
          {/* Rating */}
          <div className="rating flex items-center space-x-1">
            <img src="star.png" alt="rating-star" className="w-4 h-4" />
            <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
          </div>

          <span>•</span>

          {/* Language */}
          <p className="lang uppercase">{original_language}</p>

          <span>•</span>

          {/* Year */}
          <p className="year">
            {release_date
              ? release_date.split("-")[0]
              : first_air_date
              ? first_air_date.split("-")[0]
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
