import {
  getCredits,
  getDetails,
  getVideos,
  imgPathResolve,
  originalImgPathResolve,
} from "@/services/api";
import { Calendar, CheckCircle, Clock, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import "react-circular-progressbar/dist/styles.css";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { minsToHours, resColor, toPercentage } from "@/utils/helpers";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CastBox from "@/components/CastBox";
import VideoComp from "@/components/VideoComp";

const Details = () => {
  const { type, id } = useParams();
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({});
  const [credits, setCredits] = useState([]);
  const [video, setVideo] = useState(null);
  const [videos, setVideos] = useState([]);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ScaleLoader color="#22c55e" />
      </div>
    );
  }

  const title = details?.title || details?.name;
  const date = type === "tv" ? details?.first_air_date : details?.release_date;

  return (
    <div>
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
              src={`${imgPathResolve}/${details?.poster_path}`}
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
                <Button
                  variant="ghost"
                  onClick={() => console.log("clicked")}
                  className="hidden border border-primary hover:bg-transparent text-green-200 hover:text-green-200"
                >
                  <CheckCircle />
                  <span>In Watchlist</span>
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => console.log("clicked")}
                  className="border hover:bg-transparent text-white hover:text-green-200"
                >
                  <PlusIcon />
                  <span>Add to Watchlist</span>
                </Button>
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
          <div className="flex my-10 pb-5 gap-5 max-w-7xl w-full mx-auto overflow-x-scroll">
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
    </div>
  );
};

export default Details;
