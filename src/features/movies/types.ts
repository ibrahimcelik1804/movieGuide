export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;

  backdrop_path: string;

  production_companies: string;
  spoken_languages: string;
  production_countries: string;
  company: string;
  budget: number;

  revenue: number;

  credits: string;
  videos: string;
}
export interface MovieState {
  topRated: Movie[];
  popular: Movie[];
  trending: Movie[];
}
export interface Actor {
  cast_id: number;
  name: string;
  character: string;
  profile_path: string | null;
}
export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}
export interface Country {
  id: string;
  key: string;
  name: string;
}
export interface Language {
  iso_639_1: string;
  name: string;
}
export interface Company {
  id: number;
  name: string;
  logo_path: string | null; // Can be null if the logo is not available
}

export interface Genre{
  id:number;
  name:string;
}