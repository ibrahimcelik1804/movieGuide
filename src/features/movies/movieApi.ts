import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3/",
    prepareHeaders: (headers) => {
      const apiKey = import.meta.env.VITE_API_KEY; 
      if (apiKey) {
        headers.set("Authorization", `Bearer ${apiKey}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopRatedMovies: builder.query({
      query: () => "movie/top_rated?language=tr-TR",
    }),
    getPopularMovies: builder.query({
      query: () => "movie/popular?language=tr-TR",
    }),
    getTrendingMovies: builder.query({
      query: () => "trending/movie/week?language=tr-TR",
    }),
    getMovieDetails: builder.query({
      query: (id: string) =>
        `/movie/${id}?append_to_response=credits,videos&language=tr-TR`,
    }),
    getMoviesByGenre: builder.query({
      query: (genreId: number) =>
        `discover/movie?with_genres=${genreId}`,
    }),
    getGenres: builder.query({
      query: () => "genre/movie/list?language=tr-TR",
    }),
    getMovieReviews: builder.query({
      query: (id: string) => `movie/${id}/reviews?language=en-US`,
    }),
  }),
});

export const {
  useGetTopRatedMoviesQuery,
  useGetPopularMoviesQuery,
  useGetTrendingMoviesQuery,
  useGetMovieDetailsQuery,
  useGetMoviesByGenreQuery,
  useGetGenresQuery,
  useGetMovieReviewsQuery,
} = movieApi;
