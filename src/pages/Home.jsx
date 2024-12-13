import CardComponent from "@/components/common/CardComponent";
import { Skeleton } from "@/components/ui/skeleton";
import { trendingMovies } from "@/services/api";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeWindow, setTimeWindow] = useState("day");
  useEffect(() => {
    setLoading(true);
    trendingMovies(timeWindow)
      .then((res) => {
        setData(res);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [timeWindow]);

  return (
    <>
      <Helmet>
        <title>ReelsRadar • Home</title>
        <meta
          name="description"
          content="Welcome to ReelsRadar. Explore, discover, and track your favorite films effortlessly."
        />

        {/* OG Tags */}
        <meta name="og:title" content="ReelsRadar • Home" />
        <meta
          name="og:description"
          content="Welcome to ReelsRadar. Explore, discover, and track your favorite films effortlessly."
        />
        <meta name="og:image" content="/movie_reel.png" />
        <meta name="og:url" content="https://reelsradar.netlify.app/" />

        {/* TwitterTags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ReelsRadar • Home" />
        <meta
          name="twitter:description"
          content="Welcome to ReelsRadar. Explore, discover, and track your favorite films effortlessly."
        />
        <meta name="twitter:image" content="/movie_reel.png" />
      </Helmet>

      <section className="max-w-7xl w-full mx-auto px-5">
        <div className="flex flex-col md:flex-row items-baseline gap-4 my-5">
          <header>
            <h3
              className="text-sm md:text-xl uppercase font-bold"
              title="Trending"
            >
              Trending Movies
            </h3>
          </header>
          <div className="flex items-center gap-1 border border-green-200 rounded-full">
            <button
              className={`px-3 py-1 rounded-full hover:bg-green-200 hover:bg-opacity-50 ${
                timeWindow === "day"
                  ? "bg-green-200 bg-opacity-50 dark:text-black"
                  : ""
              }`}
              onClick={() => setTimeWindow("day")}
            >
              Today
            </button>
            <button
              className={`px-3 py-1 rounded-full hover:bg-green-200 hover:bg-opacity-50 ${
                timeWindow === "week"
                  ? "bg-green-200 bg-opacity-50 dark:text-black"
                  : ""
              }`}
              onClick={() => setTimeWindow("week")}
            >
              This Week
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {data &&
            data?.map((item, idx) =>
              loading ? (
                <Skeleton
                  key={idx}
                  className="w-[170px] h-[240px] md:w-[240px] md:h-[360px] lg:h-[400px]"
                />
              ) : (
                <CardComponent
                  key={item?.id}
                  item={item}
                  type={item?.media_type}
                />
              )
            )}
        </div>
      </section>
    </>
  );
};

export default Home;
