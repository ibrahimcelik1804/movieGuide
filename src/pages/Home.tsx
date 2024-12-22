import { useState } from "react";
import MovieCard from "../components/MovieCard";
import GenresList from "../components/GenreList";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import HomeLoading from "./loading/HomeLoading";
import {
  useGetMoviesByGenreQuery,
  useGetTopRatedMoviesQuery,
  useGetPopularMoviesQuery,
  useGetTrendingMoviesQuery,
} from "../features/movies/movieApi";
import { Movie } from "../features/movies/types";

const splitArrayInHalf = (array: Movie[]) => {
  const mid = Math.ceil(array.length / 2);
  return [array.slice(0, mid), array.slice(mid)];
};

const Home = () => {
  const [selectedGenre, setSelectedGenre] = useState<
    | {
        id: number;
        name: string;
      }
    | undefined
  >(undefined);

  const { data: moviesByGenre, isLoading: isLoadingMoviesByGenre } =
    useGetMoviesByGenreQuery(selectedGenre?.id ?? 0, { skip: !selectedGenre });

  const { data: topRatedMovies, isLoading: isLoadingTopRated } =
    useGetTopRatedMoviesQuery({ page: 1 });
  const { data: popularMovies, isLoading: isLoadingPopular } =
    useGetPopularMoviesQuery({ page: 1 });
  const { data: trendingMovies, isLoading: isLoadingTrending } =
    useGetTrendingMoviesQuery({ page: 1 });

  // Tüm verilerin yüklenme durumunu 
  const isLoading =
    isLoadingMoviesByGenre ||
    isLoadingTopRated ||
    isLoadingPopular ||
    isLoadingTrending;

  const categories = [
    { title: "En Yüksek Puanlılar", movies: topRatedMovies?.results },
    { title: "En Popülerler", movies: popularMovies?.results },
    { title: "Gündemdekiler", movies: trendingMovies?.results },
  ];

  if (isLoading) {
    return (
      <div className="h-screen mx-4">
        <HomeLoading />
      </div>
    );
  }

  return (
    <div className="p-3 ">
      {/* Genre List */}
      <GenresList
        onGenreSelect={(id, name) => setSelectedGenre({ id, name })}
      />

      {/* Movies Section */}
      <div className="my-4">
        {selectedGenre ? (
          <>
            <h2 className="text-xl font-bold text-center my-4 text-rose-600">
              {selectedGenre.name}
            </h2>
            {moviesByGenre && moviesByGenre.results.length > 0 ? (
              splitArrayInHalf(moviesByGenre?.results || []).map(
                (movieRow, index) => (
                  <Splide
                    key={index}
                    options={{
                      type: "loop",
                      perPage: 4,
                      perMove: 1,
                      autoplay: true,
                      pauseOnHover: true,
                      gap: "1rem",
                      pagination: false,
                      breakpoints: {
                        1024: { perPage: 3 },
                        768: { perPage: 2 },
                        480: { perPage: 1 },
                      },
                    }}
                    className="my-4"
                  >
                    {movieRow.map((movie: Movie) => (
                      <SplideSlide key={movie.id}>
                        <MovieCard movie={movie} />
                      </SplideSlide>
                    ))}
                  </Splide>
                )
              )
            ) : (
              <p className="text-center text-gray-500">
                No movies found in this genre.
              </p>
            )}
          </>
        ) : (
          categories.map(
            (category) =>
              category.movies && (
                <div key={category.title} className="my-8">
                  <h2 className="text-3xl  font-bold text-center text-rose-600 ">
                    {category.title}
                  </h2>
                  <Splide
                    options={{
                      type: "loop",
                      perPage: 4,
                      perMove: 1,
                      autoplay: true,
                      pauseOnHover: true,
                      pagination: false,
                      gap: "1rem",
                      breakpoints: {
                        1024: { perPage: 3 },
                        768: { perPage: 2 },
                        480: { perPage: 1 },
                      },
                    }}
                    className="my-4"
                  >
                    {category.movies.map((movie: Movie) => (
                      <SplideSlide key={movie.id}>
                        <MovieCard movie={movie} />
                      </SplideSlide>
                    ))}
                  </Splide>
                </div>
              )
          )
        )}
      </div>
    </div>
  );
};

export default Home;
