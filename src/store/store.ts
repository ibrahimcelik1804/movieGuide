import { movieApi } from "../features/movies/movieApi";
import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "../features/favorites/favoritesSlice";
import { RootState, AppDispatch } from ".types/features/favorites/types"; // Uygulamanın RootState ve AppDispatch tiplerini dışa aktarın.

const store = configureStore({
  reducer: {
    [movieApi.reducerPath]: movieApi.reducer,
    favorites: favoriteReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(movieApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
