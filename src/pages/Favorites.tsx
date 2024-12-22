import MovieCard from "../components/MovieCard";
import { useAppSelector, useAppDispatch } from "../hooks";
import { clearFavorites } from "../features/favorites/favoritesSlice";

const Favorites = () => {
  const dispatch = useAppDispatch();
  const favoriteMovies = useAppSelector(
    (state) => state.favorites.favoriteMovies
  );

  const handleClearFavorites = () => {
    dispatch(clearFavorites());
  };

  return (
    <div className="p-4">
      <h2 className="text-red-600 text-2xl font-bold">Favoriler</h2>
      {/* Favorileri sıfırlama butonu */}
      {favoriteMovies.length > 0 && (
        <button
          onClick={handleClearFavorites}
          className="bg-red-600 text-white p-2 rounded mt-4"
        >
          Tüm Fovari Filmleri Sil
        </button>
      )}
      {favoriteMovies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full mt-4">
          {favoriteMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p>Henüz favori filminiz yok.</p>
      )}
    </div>
  );
};

export default Favorites;
