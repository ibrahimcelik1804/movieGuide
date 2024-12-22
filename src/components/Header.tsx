import { useAppSelector } from "../hooks"; // Redux selector
import { NavLink } from "react-router-dom";

const Header = () => {
  // Redux store'dan favori filmlerin sayısını al
  const favoriteMovies = useAppSelector(
    (state) => state.favorites.favoriteMovies
  );

  const favoriteCount = favoriteMovies.length; // Favori filmlerin sayısı

  return (
    <header className="flex justify-between items-center p-4">
      <NavLink to={"/"}>
        <h1 className="text-rose-700 font-semibold text-4xl tracking-widest ">Film Rehberi</h1>
      </NavLink>
      <NavLink
        className="flex items-center gap-2 "
        to={"/favori"}
      >
        <h3 className="text-rose-700 font-semibold text-nowrap">Favori Filmler</h3>

        {/* Sayı sıfırdan büyükse göster */}
        {favoriteCount > 0 && (
          <p className="bg-rose-600 text-white font-bold rounded-full p-2 w-6 h-6 min-w-6 flex items-center justify-center text-center">
            {favoriteCount}
          </p>
        )}
      </NavLink>
    </header>
  );
};

export default Header;
