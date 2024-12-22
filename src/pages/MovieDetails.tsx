import { useParams } from "react-router-dom";
import { useGetMovieDetailsQuery } from "../features/movies/movieApi";
import { baseImgURL } from "../constant";
import millify from "millify";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import ReactPlayer from "react-player";
import Comment from "../components/Comment";
import DetailLoading from "./loading/DetailLoading";
import { Actor, Company, Country, Language, Video } from "../features/movies/types";

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div className="text-red-500">Geçersiz film ID'si</div>;
  }

  const { data: movie, isLoading, error } = useGetMovieDetailsQuery(id);

  if (isLoading) {
    return (
      <div className="h-screen">
        <DetailLoading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center text-lg">
        Film bilgileri alınırken bir hata oluştu. 
      </div>
    );
  }

  if (!movie) {
    return <div className="text-red-500 text-center">Film bilgisi bulunamadı.</div>;
  }

  const {
    title,
    backdrop_path,
    vote_average,
    production_companies,
    spoken_languages,
    production_countries,
    overview,
    budget,
    revenue,
    credits,
    videos,
  } = movie;

  return (
    <div className="flex flex-col mx-6 text-white ">
      {/* Üst Alan */}
      <div className="relative w-full h-60 md:h-80 rounded-xl">
        <img
          className="w-full h-full object-cover rounded-xl"
          src={backdrop_path ? baseImgURL + backdrop_path : "/default_banner.jpg"}
          alt={title}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex justify-center items-center">
          <span className="text-white text-xl md:text-3xl font-bold">{title}</span>
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-lg font-semibold">
          IMDB : <span className="text-green-500">{vote_average}</span>
        </div>
      </div>

      {/* İçerik */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Sol Taraf */}
        <div>
          <h3 className="text-xl font-semibold mt-4">Yapımcı Şirketler</h3>
          <div className="flex flex-wrap gap-4 mt-2">
            {production_companies?.map((company: Company) => (
              <div key={company.id} className="bg-white p-4 rounded-lg flex items-center shadow-md">
                {company.logo_path ? (
                  <img
                    src={baseImgURL + company.logo_path}
                    alt={company.name}
                    className="w-24 h-12 object-contain"
                  />
                ) : (
                  <span className="text-gray-700">{company.name}</span>
                )}
              </div>
            ))}
          </div>

          <h3 className="text-xl font-semibold mt-6">Konuşulan Diller</h3>
          <div className="flex flex-wrap gap-4 mt-2">
            {spoken_languages?.map((language: Language) => (
              <div key={language.iso_639_1} className="bg-white p-2 rounded-lg shadow-md">
                <span className="text-gray-700">{language.name}</span>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-semibold mt-6">Yapımcı Ülkeler</h3>
          <div className="flex flex-wrap gap-4 mt-2">
            {production_countries?.map((country: Country) => (
              <div key={country.id} className="bg-white p-2 rounded-lg shadow-md">
                <span className="text-gray-700">{country.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sağ Taraf */}
        <div>
          <p className="text-lg">{overview}</p>
          <p className="text-lg mt-4">
            <span className="font-semibold">Bütçe: </span>
            <span className="text-green-500">
              {budget === 0 ? "Bilinmiyor" : millify(budget)} $
            </span>
          </p>
          <p className="text-lg mt-4">
            <span className="font-semibold">Gelir: </span>
            <span className="text-green-500">
              {revenue === 0 ? "Bilinmiyor" : millify(revenue)} $
            </span>
          </p>
        </div>
      </div>

      {/* Oyuncular */}
      <div className="my-6">
        <h2 className="text-xl font-semibold mb-4">Oyuncular</h2>
        <Splide options={{ gap: "10px", pagination: false, autoWidth: true }}>
          {credits?.cast?.map((actor: Actor) => (
            <SplideSlide key={actor.cast_id}>
              <div className="actor-card flex flex-col items-center relative group">
                <img
                  className="w-32 h-48 object-cover rounded-lg"
                  src={actor.profile_path ? baseImgURL + actor.profile_path : "/default_actor.png"}
                  alt={actor.name}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-lg font-semibold">{actor.name}</p>
                  <p className="text-white text-sm">{actor.character}</p>
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>

      {/* Videolar */}
      <div className="my-6">
        <h1 className="text-xl font-semibold mb-4">Videolar</h1>
        <Splide options={{ height: "auto" }}>
          {videos?.results?.length > 0 ? (
            videos.results.map((video: Video) => (
              <SplideSlide key={video.id}>
                <ReactPlayer
                  controls
                  width="100%"
                  height="500px"
                  url={`https://www.youtube.com/watch?v=${video.key}`}
                />
              </SplideSlide>
            ))
          ) : (
            <p className="text-rose-600 w-full text-center">
              Üzgünüz, bu filmin videosu yok.
            </p>
          )}
        </Splide>
      </div>

  
      <Comment />
    </div>
  );
};

export default MovieDetail;
