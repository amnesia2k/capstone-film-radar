import CardComponent from "@/components/common/CardComponent";
import { trendingMovies } from "@/services/api";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import CardSkeleton from "./constants/CardSkeleton";
import { Button } from "@/components/ui/button";
import { heroClip } from "@/assets";
import { timeForGreeting } from "@/utils/helpers";
import { useAuth } from "@/context/useAuth";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeWindow, setTimeWindow] = useState("day");
  const [greeting, setGreeting] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    trendingMovies(timeWindow)
      .then((res) => {
        setData(res);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [timeWindow]);

  useEffect(() => {
    setGreeting(timeForGreeting(user));
  }, [user]);

  return (
    <>
      <Helmet>
        <title>ReelsRadar • Home</title>
        <meta
          name="description"
          content="Welcome to ReelsRadar. Explore, discover, and track your favorite films effortlessly."
        />

        {/* OG Tags */}
        <meta property="og:title" content="ReelsRadar • Home" />
        <meta
          property="og:description"
          content="Welcome to ReelsRadar. Explore, discover, and track your favorite films effortlessly."
        />
        <meta
          property="og:image"
          content="https://reelsradar.netlify.app/movie_reel_pub.png"
        />
        <meta property="og:url" content="https://reelsradar.netlify.app/" />

        {/* TwitterTags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ReelsRadar • Home" />
        <meta
          name="twitter:description"
          content="Welcome to ReelsRadar. Explore, discover, and track your favorite films effortlessly."
        />
        <meta
          name="twitter:image"
          content="https://reelsradar.netlify.app/movie_reel_pub.png"
        />
      </Helmet>

      <section>
        <div className="relative overflow-hidden h-[90vh] sm-[80vh]">
          <video
            className="absolute top-0 left-0 w-full h-full object-cover bg-[rgba(0,0,0,0.5)]"
            autoPlay
            loop
            muted
          >
            <source src={heroClip} type="video/mp4" />
          </video>
          <div className="absolute inset-x-0 bottom-0 h-full gradient-theme-adaptive"></div>
          <div className="relative z-10 text-center flex flex-col items-center justify-center gap-3 text-white h-[80vh] px-2">
            <h3 className="text-3xl md:text-4xl font-bold">{greeting}</h3>
            <h3 className="sm:text-xl font-semibold mb-10">
              Discover the Latest and Greatest in Movies. <br />{" "}
              <span className="text-primary sm:text-2xl">ReelsRadar</span>,
              Where Every Reel Tells a Story
            </h3>
            <Button
              variant="default"
              className="bg-primary rounded-lg text-white px-[50px] text-lg"
              onClick={() =>
                document
                  .getElementById("movies")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Start Exploring
            </Button>
          </div>
        </div>

        {/* Movies cards rendered */}
        <div id="movies" className="max-w-7xl w-full mx-auto px-5">
          <div className="flex flex-col md:flex-row items-baseline gap-1 md:gap-4 my-5">
            <header>
              <h3
                className="text-sm md:text-xl uppercase font-bold"
                title="Trending"
              >
                Trending Movies
              </h3>
            </header>
            <div className="flex items-center gap-1 border rounded-md p-1">
              <button
                className={`px-3 py-1 rounded-md hover:bg-opacity-50 ${
                  timeWindow === "day" ? "bg-primary text-white" : ""
                }`}
                onClick={() => setTimeWindow("day")}
              >
                Today
              </button>
              <button
                className={`px-3 py-1 rounded-md hover:bg-opacity-50 ${
                  timeWindow === "week" ? "bg-primary text-white" : ""
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
                  <CardSkeleton
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
        </div>
      </section>
    </>
  );
};

export default Home;
