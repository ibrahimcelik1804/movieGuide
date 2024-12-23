import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../movies/types";

interface FavoritesState {
  favoriteMovies: Movie[];
}


const loadFavoritesFromLocalStorage = (): Movie[] => {
  const storedFavorites = localStorage.getItem("favorites");
  return storedFavorites ? JSON.parse(storedFavorites) : [];
};

const initialState: FavoritesState = {
  favoriteMovies: loadFavoritesFromLocalStorage(),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Movie>) => {
      state.favoriteMovies.push(action.payload);
     
      localStorage.setItem("favorites", JSON.stringify(state.favoriteMovies));
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.favoriteMovies = state.favoriteMovies.filter(
        (movie) => movie.id !== action.payload
      );

      localStorage.setItem("favorites", JSON.stringify(state.favoriteMovies));
    },
    clearFavorites: (state) => {
      state.favoriteMovies = [];
  
      localStorage.setItem("favorites", JSON.stringify([]));
    },
  },
});

export const { addToFavorites, removeFromFavorites, clearFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
