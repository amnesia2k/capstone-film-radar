import {
  getCredits,
  getDetails,
  getVideos,
  imgPathResolve,
  originalImgPathResolve,
} from "@/services/api";
import { CheckCircle, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SkewLoader } from "react-spinners";
import "react-circular-progressbar/dist/styles.css";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { minsToHours, resColor, toPercentage } from "@/utils/helpers";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CastBox from "@/components/CastBox";
import VideoComp from "@/components/VideoComp";
import { toast } from "sonner";
import { useAuth } from "@/context/useAuth";
import { firestoreDb } from "@/services/firestore";
import { Helmet } from "react-helmet";
import { useTheme } from "@/components/theme-provider";

const Details = () => {
  const { theme } = useTheme();
  const { type, id } = useParams();
  const { user } = useAuth();
  const { addToWatchlist, checkIfInWatchlist, removeFromDb } = firestoreDb();
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({});
  const [credits, setCredits] = useState([]);
  const [video, setVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const getData = async () => {
      try {
        const [detailsData, creditData, videosData] = await Promise.all([
          getDetails(type, id),
          getCredits(type, id),
          getVideos(type, id),
        ]);

        setDetails(detailsData); //movie details data
        setCredits(creditData?.cast?.slice(0, 10)); //credit details data
        const video = videosData.results?.find(
          (video) => video?.type === "Trailer"
        );
        setVideo(video);
        const videos = videosData.results
          ?.filter((video) => video?.type !== "Trailer")
          ?.slice(0, 10);
        setVideos(videos);
      } catch (error) {
        console.error(error, "error");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [type, id]);

  const toWatchlist = async () => {
    if (!user) {
      toast.error("Please sign in to add to your watchlist");
      return;
    }
    const data = {
      id: details?.id,
      title: details?.title || details?.name,
      type: type,
      poster_path:
        details?.poster_path ||
        "https://www.reelviews.net/resources/img/default_poster.jpg",
      release_date:
        type === "movie" ? details?.release_date : details?.first_air_date,
      vote_average: details?.vote_average,
      overview: details?.overview,
    };

    const dataId = details?.id?.toString();
    await addToWatchlist(user?.uid, dataId, data);
    const isSetToWatchlist = await checkIfInWatchlist(user?.uid, dataId);
    setIsInWatchlist(isSetToWatchlist);
  };

  useEffect(() => {
    if (!user) {
      setIsInWatchlist(false);
      return;
    }

    checkIfInWatchlist(user?.uid, id).then((data) => {
      setIsInWatchlist(data);
    });
  }, [id, user, checkIfInWatchlist]);

  const handleDelete = async () => {
    await removeFromDb(user?.uid, id);
    const isSetToWatchlist = await checkIfInWatchlist(user?.uid, id);
    setIsInWatchlist(isSetToWatchlist);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <SkewLoader color="#6d28d9" size={50} />
      </div>
    );
  }
  const posterPath = details?.poster_path
    ? `${imgPathResolve}/${details.poster_path}`
    : "https://www.reelviews.net/resources/img/default_poster.jpg";
  const title = details?.title || details?.name;
  const date = type === "tv" ? details?.first_air_date : details?.release_date;
  const lastAirDate = type === "tv" ? details?.last_air_date : "";
  const backdropBanner = details?.backdrop_path
    ? `${originalImgPathResolve}/${details?.backdrop_path}`
    : ``;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={details?.overview} />

        {/* OG Tags */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={details?.overview} />
        <meta
          property="og:image"
          content="https://reelsradar.netlify.app/movie_reel_pub.png"
        />
        <meta
          property="og:url"
          content="https://reelsradar.netlify.app/watchlist"
        />

        {/* TwitterTags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={details?.overview} />
        <meta
          name="twitter:image"
          content="https://reelsradar.netlify.app/movie_reel_pub.png"
        />
      </Helmet>

      <section className="max-w-7xl w-full mx-auto px-5">
        <div className="flex flex-col gap-[90px]">
          <div className="relative mt-5 mx-auto">
            <img
              src={backdropBanner}
              className="opacity-70 rounded-xl"
              alt="backdrop_banner"
            />
            <div className="absolute bottom-[-40px] left-4 text-white md:left-20 w-[90%] md:w-[50%] flex flex-col px-3 md:px-5 py-3 rounded-xl bg-[#6d28d9] bg-opacity-30">
              <h3>ReelsRadar || {type === "tv" ? "TV Show" : "Movie"}</h3>
              <h1 className="text-lg md:text-2xl truncate font-bold">
                {title}
              </h1>
            </div>
          </div>

          <div className="flex justify-center md:justify-start gap-5 flex-col md:flex-row">
            <div className="flex justify-center items-center md:block flex-shrink-0">
              <img
                src={posterPath}
                className="w-[220px] lg:w-[300px] h-[300px] md:h-[350px] lg:h-[450px] rounded-xl"
                alt={title}
              />
            </div>
            <div className="text-center md:text-left">
              {/* Overview */}
              <div className="flex flex-col gap-3">
                <h1 className="text-base md:text-xl font-semibold italic">
                  {details?.tagline}
                </h1>
                <h2 className="text-base md:text-lg font-semibold">
                  Overview: <br />
                  <span className="text-base italic">
                    <span className="text-2xl font-bold">&#8220;{/* */}</span>
                    {details?.overview}
                  </span>
                </h2>

                {/* CTA */}
                <div className="flex gap-3 items-center justify-center md:justify-start">
                  <div className="flex gap-2 items-center">
                    <div className="w-[45px] h-[45px] flex justify-center items-center">
                      <CircularProgressbar
                        value={toPercentage(details?.vote_average)}
                        strokeWidth={12}
                        text={`${toPercentage(details?.vote_average)}%`}
                        className="rounded-full"
                        styles={buildStyles({
                          textSize: "25px",
                          textColor: theme === "light" ? "black" : "white",
                          pathColor: resColor(details?.vote_average),
                        })}
                      />
                    </div>
                    <h3 className="hidden md:block">User Score</h3>
                  </div>
                  {isInWatchlist ? (
                    <Button
                      variant="ghost"
                      onClick={handleDelete}
                      className="border border-primary hover:bg-transparent text-green-200 hover:text-green-200"
                    >
                      <CheckCircle />
                      <span>In Watchlist</span>
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      onClick={toWatchlist}
                      className="border hover:bg-transparent hover:text-green-200"
                    >
                      <PlusIcon />
                      <span>Add to Watchlist</span>
                    </Button>
                  )}
                </div>

                {/* Show Stats */}
                <div className="flex flex-row gap-3 md:gap-10 xl:gap-20">
                  <div className="flex flex-col gap-[5px]">
                    <div className="flex flex-col text-left">
                      <h3 className="text-[17px] md:text-[20px] font-semibold italic">
                        Type
                      </h3>
                      <h2 className="text-[13px] md:text-[15px] font-normal">
                        {type === "tv" ? "TV Show" : "Movie"}
                      </h2>
                    </div>
                    <div className="flex flex-col text-left">
                      <h3 className="text-[17px] md:text-[20px] font-semibold italic">
                        {type === "movie" ? "Released date" : "First Air date"}
                      </h3>
                      <h2 className="text-[13px] md:text-[15px] font-normal">
                        {new Date(date).toLocaleDateString("en-US")} (US)
                      </h2>
                    </div>
                    {type === "movie" ? (
                      <div className="flex flex-col text-left">
                        <h3 className="text-[17px] md:text-[20px] font-semibold italic">
                          Runtime
                        </h3>
                        <h2 className="text-[13px] md:text-[15px] font-normal">
                          {minsToHours(details?.runtime)}
                        </h2>
                      </div>
                    ) : (
                      <div className="flex flex-col text-left">
                        <h3 className="text-[17px] md:text-[20px] font-semibold italic">
                          Seasons
                        </h3>
                        <h2 className="text-[13px] md:text-[15px] font-normal">
                          {details?.number_of_seasons > 1
                            ? `${details.number_of_seasons} seasons`
                            : `${details.number_of_seasons} season`}
                        </h2>
                      </div>
                    )}
                  </div>

                  {type === "tv" ? (
                    <div className="flex flex-col gap-[5px]">
                      <div className="flex flex-col text-right">
                        <h3 className="text-[17px] md:text-[20px] font-semibold italic">
                          Status
                        </h3>
                        <h2 className="text-[13px] md:text-[15px] font-normal">
                          {details?.status}
                        </h2>
                      </div>
                      <div className="flex flex-col text-right">
                        <h3 className="text-[17px] md:text-[20px] font-semibold italic">
                          Last air date
                        </h3>
                        <h2 className="text-[13px] md:text-[15px] font-normal">
                          {new Date(lastAirDate).toLocaleDateString("en-US")}{" "}
                          (US)
                        </h2>
                      </div>
                      <div className="flex flex-col text-right">
                        <h3 className="text-[17px] md:text-[20px] font-semibold italic">
                          Number of Episodes
                        </h3>
                        <h2 className="text-[13px] md:text-[15px] font-normal">
                          {details?.number_of_episodes}
                        </h2>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                {/* Genres Bagde */}
                <div className="flex items-center md:justify-start gap-2 flex-wrap justify-center">
                  {details?.genres?.map((genre) => (
                    <Badge
                      key={genre?.key}
                      className="bg-slate-500 bg-opacity-50 text-white hover:bg-slate-800"
                    >
                      {genre?.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl w-full mx-auto flex items-center">
          <CastBox credits={credits} />
        </div>

        <div className="max-w-7xl w-full mx-auto">
          <h3 className="text-xl text-center md:text-left uppercase font-bold my-5">
            Watch Trailer
          </h3>
          <div className="flex flex-col items-center">
            <VideoComp id={video?.key} />
            <div className="flex my-10 pb-5 gap-5 max-w-7xl w-full mx-auto overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar-thumb-rounded scrollbar-track-rounded">
              {videos &&
                videos?.map((item) => (
                  <div key={item?.id} className="min-w-[300px]">
                    <VideoComp id={item.key} small />
                    <h3 className="line-clamp-2 text-lg font-semibold">
                      {item?.name}
                    </h3>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* <section>
        <div
          className="w-full h-auto md:h-[500px] flex items-center z-[-1]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${originalImgPathResolve}/${details?.backdrop_path})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="max-w-7xl w-full mx-auto p-5">
            <div className="flex items-center justify-center md:justify-start gap-5 flex-col md:flex-row text-white">
              <img
                src={posterPath}
                className="w-[220px] lg:w-[300px] h-[300px] md:h-[350px] lg:h-[450px] rounded-md"
                alt=""
              />
              <div className="flex flex-col gap-2 justify-center items-center md:items-start">
                <h3 className="text-xl md:text-3xl font-bold">
                  {title}{" "}
                  <span className="text-[18px] font-semibold">
                    {new Date(date).getFullYear()}
                  </span>
                </h3>

                <div className="flex items-center gap-4 mt-1 mb-5">
                  <div className="flex items-center gap-1">
                    <Calendar size={17} />
                    <h3>{new Date(date).toLocaleDateString("en-US")} (US)</h3>
                  </div>
                  {type === "movie" && (
                    <>
                      <div>*</div>
                      <div className="flex items-center gap-1">
                        <Clock size={17} />
                        <h3 className="text-sm">
                          {minsToHours(details?.runtime)}
                        </h3>
                      </div>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-[45px] h-[45px] flex justify-center items-center">
                    <CircularProgressbar
                      value={toPercentage(details?.vote_average)}
                      strokeWidth={12}
                      text={`${toPercentage(details?.vote_average)}%`}
                      className="rounded-full"
                      styles={buildStyles({
                        textSize: "25px",
                        textColor: "white",
                        pathColor: resColor(details?.vote_average),
                      })}
                    />
                  </div>
                  <h3 className="hidden md:block">User Score</h3>

                  {isInWatchlist ? (
                    <Button
                      variant="ghost"
                      onClick={handleDelete}
                      className="border border-primary hover:bg-transparent text-green-200 hover:text-green-200"
                    >
                      <CheckCircle />
                      <span>In Watchlist</span>
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      onClick={toWatchlist}
                      className="border hover:bg-transparent text-white hover:text-green-200"
                    >
                      <PlusIcon />
                      <span>Add to Watchlist</span>
                    </Button>
                  )}
                </div>
                <h3 className="text-slate-300 text-sm italic">
                  {details?.tagline}
                </h3>
                <h2 className="text-xl font-bold">Overview:</h2>
                <h3 className="text-base italic">{details?.overview}</h3>
                <div className="flex items-center md:justify-start gap-2 flex-wrap justify-center">
                  {details?.genres?.map((genre) => (
                    <Badge
                      key={genre?.key}
                      className="bg-slate-500 bg-opacity-50 text-white hover:bg-slate-800"
                    >
                      {genre?.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl w-full mx-auto px-5 flex items-center">
          <CastBox credits={credits} />
        </div>

        <div className="max-w-7xl w-full mx-auto px-5">
          <h3 className="text-xl text-left uppercase font-bold my-5">
            Watch Trailer
          </h3>
          <div className="flex flex-col items-center">
            <VideoComp id={video?.key} />
            <div className="flex my-10 pb-5 gap-5 max-w-7xl w-full mx-auto overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar-thumb-rounded scrollbar-track-rounded">
              {videos &&
                videos?.map((item) => (
                  <div key={item?.id} className="min-w-[300px]">
                    <VideoComp id={item.key} small />
                    <h3 className="line-clamp-2 text-lg font-semibold">
                      {item?.name}
                    </h3>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default Details;
