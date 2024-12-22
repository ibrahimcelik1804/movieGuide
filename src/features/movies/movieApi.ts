import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//const API_KEY = "343da7773aacf75708178583dbfa9868"; // API key'inizi buraya ekleyin

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3/",
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNDNkYTc3NzNhYWNmNzU3MDgxNzg1ODNkYmZhOTg2OCIsIm5iZiI6MTczNDQzNDY2OC40NjUsInN1YiI6IjY3NjE1ZjZjODcwY2MzYzAwZmI1MDQ4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1KxbwwfJEhPsGErSc_HZeE5U9Umv0H0_jpLBZrotPCc"
      );
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
        `discover/movie?api_key=YOUR_API_KEY&with_genres=${genreId}`,
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
