import CardComponent from "@/components/common/CardComponent";
import Loader from "@/components/common/Loader";
import { trendingMovies } from "@/services/api";
import { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeWindow, setTimeWindow] = useState("day");
  useEffect(() => {
    setLoading(true);
    trendingMovies(timeWindow)
      .then((res) => {
        setData(res);
        console.log("res", res);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [timeWindow]);

  return (
    <section className="max-w-7xl w-full mx-auto px-5">
      <div className="flex flex-col md:flex-row items-baseline gap-4 my-10">
        <header>
          <h1 className="text-xl font-bold uppercase" title="Trending">
            Trending Movies
          </h1>
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

      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {data &&
          data?.map((item, idx) =>
            loading ? (
              <Loader key={idx} />
            ) : (
              <CardComponent key={item?.id} item={item} type={item?.media_type} />
            )
          )}
      </div>
    </section>
  );
};

export default Home;
