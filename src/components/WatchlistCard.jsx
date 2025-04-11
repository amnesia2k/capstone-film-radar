/* eslint-disable react/prop-types */
import { useAuth } from "@/context/useAuth";
import { imgPathResolve } from "@/services/api";
import { firestoreDb } from "@/services/firestore";
import { Check } from "lucide-react";
import { StarIcon, Trash } from "lucide-react";
import { Link } from "react-router-dom";

const WatchlistCard = ({ type, item, setWatchlist }) => {
  const { removeFromDb, toggleWatchedMovie } = firestoreDb();
  const { user } = useAuth();

  const handleRemove = (e) => {
    e.preventDefault();

    removeFromDb(user.uid, item.id).then(() => {
      setWatchlist((prev) => prev.filter((ev) => ev.id !== item.id));
    });
  };

  const handleWatched = (e) => {
    e.preventDefault();

    toggleWatchedMovie(user.uid, item.id, !item.watchedMovie).then(() => {
      setWatchlist((prev) =>
        prev.map((movie) =>
          movie.id === item.id
            ? { ...movie, watchedMovie: !item.watchedMovie }
            : movie
        )
      );
    });
  };

  const isWatched = item.watchedMovie;

  const posterPath = item?.poster_path
    ? `${imgPathResolve}/${item.poster_path}`
    : "https://www.reelviews.net/resources/img/default_poster.jpg";
  const voteAverage = item?.vote_average ? item.vote_average.toFixed(1) : "N/A";
  const title = item?.title || item?.name || "Untitled";
  const releaseYear =
    item?.release_date || item?.first_air_date
      ? new Date(item.release_date || item.first_air_date).getFullYear()
      : "Unknown";

  return (
    <Link to={`/${type}/${item?.id}`}>
      <div className="relative group transform transition-all hover:scale-105 z-10 rounded-lg shadow-lg overflow-hidden">
        <div
          className="absolute z-50 top-0 left-0 bg-red-500 p-[5px] rounded-br-md"
          onClick={handleRemove}
        >
          <Trash color="white" />
        </div>

        <div
          className={`absolute z-50 top-0 right-0 ${
            isWatched ? "bg-green-500" : "bg-white/80"
          } p-[5px] rounded-bl-md`}
          onClick={handleWatched}
        >
          <Check color={isWatched ? "white" : "black"} />
        </div>

        <img
          className="w-full h-full object-cover"
          src={posterPath}
          alt={title}
          onError={(e) => {
            e.target.src =
              "https://www.reelviews.net/resources/img/default_poster.jpg";
          }}
        />

        <div className="absolute inset-0 flex flex-col justify-end bg-black bg-opacity-70 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-1 absolute top-3 right-5">
            <StarIcon size={20} color="gold" />
            <h3 className="text-sm font-semibold">{voteAverage}</h3>
          </div>

          <h3 className="text-center font-bold text-lg px-2 truncate">
            {title}
          </h3>
          <h4 className="text-center text-sm pb-3">{releaseYear}</h4>
        </div>
      </div>
    </Link>
  );
};

export default WatchlistCard;
