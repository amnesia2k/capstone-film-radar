import CardComponent from "@/components/common/CardComponent";
import Pagination from "@/components/Pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getMovies } from "@/services/api";
import { useEffect, useState } from "react";
import { movieGenres } from "./constants";
import { Skeleton } from "@/components/ui/skeleton";
import { Helmet } from "react-helmet-async";

const Movies = () => {
  const DEFAULT_SORT = "popularity.desc"; // Default sorting
  const [movies, setMovies] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState(
    () => sessionStorage.getItem("movieSortBy") || DEFAULT_SORT
  );
  const [genres, setGenres] = useState(
    () => sessionStorage.getItem("movieGenres") || ""
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const finalSortBy = sortBy || DEFAULT_SORT;

    getMovies(activePage, finalSortBy, genres)
      .then((res) => {
        setMovies(res?.results || []);
        setActivePage(res?.page || 1);
        setTotalPages(res?.total_pages || 1);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [activePage, sortBy, genres]);

  const handleSelectChange = (value) => {
    if (value.includes(".")) {
      setActivePage(1);
      setSortBy(value);
      setGenres("");
      sessionStorage.setItem("movieSortBy", value);
      sessionStorage.removeItem("movieGenres");
    } else {
      setActivePage(1);
      setGenres(value);
      setSortBy(DEFAULT_SORT);
      sessionStorage.setItem("movieGenres", value);
      sessionStorage.setItem("movieSortBy", DEFAULT_SORT);
    }
  };

  return (
    <>
      <Helmet>
        <title>ReelsRadar • Movies</title>
        <meta
          name="description"
          content="Explore, discover, and track your favorite movies effortlessly."
        />

        {/* OG Tags */}
        <meta name="og:title" content="ReelsRadar • Movies" />
        <meta
          name="og:description"
          content="Explore, discover, and track your favorite movies effortlessly."
        />
        <meta name="og:image" content="/public/movie_reel.png" />
        <meta name="og:url" content="https://reelsradar.netlify.app/movies" />

        {/* TwitterTags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ReelsRadar • Movies" />
        <meta
          name="twitter:description"
          content="Explore, discover, and track your favorite movies effortlessly."
        />
        <meta name="twitter:image" content="/public/movie_reel.png" />
      </Helmet>

      <section className="max-w-7xl w-full mx-auto px-5">
        <div className="flex items-center gap-4">
          <h3 className="text-sm md:text-xl uppercase font-bold my-5">
            Discover Movies
          </h3>
          <Select onValueChange={handleSelectChange} value={genres || sortBy}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Choose Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="popularity.desc">Popular</SelectItem>
                <SelectItem value="vote_average.desc&vote_count.gte=1000">
                  Top Rated
                </SelectItem>
                {movieGenres.map((genre) => (
                  <SelectItem key={genre.id} value={String(genre.id)}>
                    {genre.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {loading ? (
            <Skeleton className="w-[170px] h-[240px] md:w-[240px] md:h-[360px] lg:h-[400px]" />
          ) : (
            movies.map((item) => (
              <CardComponent key={item.id} item={item} type={"movie"} />
            ))
          )}
        </div>

        <Pagination
          activePage={activePage}
          totalPages={totalPages}
          setActivePage={setActivePage}
        />
      </section>
    </>
  );
};

export default Movies;
