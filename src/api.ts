const API_KEY = "4d63f5762391d745198d5508363f117c";
const BASE_PATH = "https://api.themoviedb.org/3";
export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  original_name: string;
}
export interface ITv {
  id: number;
  backdrop_path: string;
  poster_path: string;
  original_name: string;
  overview: string;
}
export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}
export interface IGetTv {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: ITv[];
  total_pages: number;
  total_results: number;
}
export async function getTv() {
  const respose = await fetch(`${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}`);
  return await respose.json();
}
export async function getMovies() {
  const response = await fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`
  );
  return await response.json();
}
export async function popularTv() {
  const respose = await fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}`);
  return await respose.json();
}
export async function searchMovies(value: String) {
  const response = await fetch(
    `${BASE_PATH}/search/movie?query=${value}&api_key=${API_KEY}`
  );
  return await response.json();
}

export async function trendMovies() {
  const response = await fetch(
    `${BASE_PATH}/trending/movie/day?api_key=${API_KEY}`
  );
  return await response.json();
}
