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
import { getShows } from "@/services/api";
import { useEffect, useState } from "react";
import { tvGenres } from "./constants";
import { Helmet } from "react-helmet";
import CardSkeleton from "./constants/CardSkeleton";

const Shows = () => {
  const DEFAULT_SORT = "popularity.desc"; // Default sorting
  const [shows, setShows] = useState([]);
  const [activePage, setActivePage] = useState(() => {
    return parseInt(sessionStorage.getItem("showActivePage"), 10) || 1;
  });
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState(
    () => sessionStorage.getItem("tvSortBy") || DEFAULT_SORT
  );
  const [genres, setGenres] = useState(
    () => sessionStorage.getItem("tvGenres") || ""
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const finalSortBy = sortBy || DEFAULT_SORT;

    getShows(activePage, finalSortBy, genres)
      .then((res) => {
        setShows(res?.results || []);
        setActivePage(res?.page || 1);
        setTotalPages(res?.total_pages || 1);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [activePage, sortBy, genres]);

  // Save activePage to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem("showActivePage", activePage);
  }, [activePage]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activePage]);

  const handleSelectChange = (value) => {
    if (value.includes(".")) {
      setActivePage(1);
      setSortBy(value);
      setGenres("");
      sessionStorage.setItem("tvSortBy", value);
      sessionStorage.removeItem("tvGenres");
    } else {
      setActivePage(1);
      setGenres(value);
      setSortBy(DEFAULT_SORT);
      sessionStorage.setItem("tvGenres", value);
      sessionStorage.setItem("tvSortBy", DEFAULT_SORT);
    }
  };

  return (
    <>
      <Helmet>
        <title>ReelsRadar • TV Shows</title>
        <meta
          name="description"
          content="Explore, discover, and track your favorite TV Shows effortlessly."
        />

        {/* OG Tags */}
        <meta property="og:title" content="ReelsRadar • TV Shows" />
        <meta
          property="og:description"
          content="Explore, discover, and track your favorite TV Shows effortlessly."
        />
        <meta
          property="og:image"
          content="https://reelsradar.netlify.app/movie_reel_pub.png"
        />
        <meta property="og:url" content="https://reelsradar.netlify.app/tv" />

        {/* TwitterTags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ReelsRadar • TV Shows" />
        <meta
          name="twitter:description"
          content="Explore, discover, and track your favorite TV Shows effortlessly."
        />
        <meta
          name="twitter:image"
          content="https://reelsradar.netlify.app/movie_reel_pub.png"
        />
      </Helmet>

      <section className="max-w-7xl w-full mx-auto px-5">
        <div className="flex items-center gap-4">
          <h3 className="text-sm md:text-xl uppercase font-bold my-5">
            Discover Shows
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
                {tvGenres.map((genre) => (
                  <SelectItem key={genre.id} value={String(genre.id)}>
                    {genre.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {/* {loading ? (
            <Skeleton className="w-[170px] h-[240px] md:w-[240px] md:h-[360px] lg:h-[400px]" />
          ) : (
            shows.map((item) => (
              <CardComponent key={item.id} item={item} type={"tv"} />
            ))
          )} */}
          {shows &&
            shows?.map((item, idx) =>
              loading ? (
                <CardSkeleton
                  key={idx}
                  className="w-[170px] h-[150px] md:w-[240px] md:h-[360px] lg:h-[400px]"
                />
              ) : (
                <CardComponent key={item?.id} item={item} type={"tv"} />
              )
            )}
        </div>

        {/* Remember to fix this during the day */}

        <Pagination
          activePage={activePage}
          totalPages={totalPages}
          setActivePage={setActivePage}
        />
      </section>
    </>
  );
};

export default Shows;
