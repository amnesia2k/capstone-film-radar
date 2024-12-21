import axios from "axios";

// Image resolver links
export const imgPathResolve = "https://image.tmdb.org/t/p/w500";
export const originalImgPathResolve = "https://image.tmdb.org/t/p/original";

const baseURL = import.meta.env.VITE_TMDB_API_URL;
const apiKey = import.meta.env.VITE_TMDB_API_KEY;

// Trending Movies
export const trendingMovies = async (timeWindow = "day") => {
  const { data } = await axios.get(
    `${baseURL}/trending/all/${timeWindow}?api_key=${apiKey}`
  );
  return data?.results;
};

// Movies & Series Details
export const getDetails = async (type, id) => {
  const res = await axios.get(`${baseURL}/${type}/${id}?api_key=${apiKey}`);
  // console.log(res?.data);
  return res?.data;
};

// Credits
export const getCredits = async (type, id) => {
  const res = await axios.get(
    `${baseURL}/${type}/${id}/credits?api_key=${apiKey}`
  );

  return res?.data;
};

// Youtube Videos
export const getVideos = async (type, id) => {
  const res = await axios.get(
    `${baseURL}/${type}/${id}/videos?api_key=${apiKey}`
  );

  return res?.data;
};

// Movies
export const getMovies = async (page, sortBy, genres) => {
  const res = await axios.get(
    `${baseURL}/discover/movie?api_key=${apiKey}&page=${page}&sort_by=${sortBy}&with_genres=${genres}`
  );

  return res?.data;
};

// TV Shows
export const getShows = async (page, sortBy, genres) => {
  const res = await axios.get(
    `${baseURL}/discover/tv?api_key=${apiKey}&page=${page}&sort_by=${sortBy}&with_genres=${genres}`
  );

  return res?.data;
};

// Search
export const searchAll = async (query, page) => {
  const res = await axios.get(
    `${baseURL}/search/multi?api_key=${apiKey}&query=${query}&page=${page}`
  );

  return res?.data;
};
