import React from "react";
import { Movie } from "../features/movies/types";
import { FaStar, FaComment } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import {
  addToFavorites,
  removeFromFavorites,
} from "../features/favorites/favoritesSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const dispatch = useAppDispatch();
  const favoriteMovies = useAppSelector(
    (state) => state.favorites.favoriteMovies
  );

  const isFavorite = favoriteMovies.some((fav) => fav.id === movie.id);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(movie.id));
    } else {
      dispatch(addToFavorites(movie));
    }
  };
  

  return (
    <div className="relative border rounded-lg shadow-lg overflow-hidden">
      {/* Film Görseli */}
      <NavLink to={`/detay/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full object-cover aspect-[2/3]"
        />
      </NavLink>

      {/* Detaylar */}
      <div className="absolute bottom-0 w-full bg-black bg-opacity-75 text-white p-2">
        {/* Başlık */}

        {/* Ek Bilgiler */}
        <div className="flex justify-evenly text-sm">
          {/* Yayın Tarihi */}
          <div>
            <p>
              {movie.release_date
                ? new Date(movie.release_date).getFullYear()
                : "N/A"}
            </p>
          </div>

          {/* IMDb Puanı */}
          <div className="flex gap-1 items-center text-yellow-400">
            <FaStar
              onClick={handleFavoriteToggle}
              className={`cursor-pointer ${
                isFavorite ? "text-yellow-400" : "text-white"
              }`}
            />
            <p>{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</p>
          </div>

          {/* Yorum Sayısı */}
          <div className="flex items-center gap-1">
            <FaComment />
            <p>{movie.vote_count || 0}</p>
          </div>
        </div>

        <h3 className="text-sm font-bold text-center mb-0">{movie.title}</h3>
      </div>
    </div>
  );
};

export default MovieCard;
