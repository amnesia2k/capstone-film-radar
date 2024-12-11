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
