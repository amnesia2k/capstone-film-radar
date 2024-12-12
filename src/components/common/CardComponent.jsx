/* eslint-disable react/prop-types */
import { imgPathResolve } from "@/services/api";
import { StarIcon } from "lucide-react";
import { Link } from "react-router-dom";

const CardComponent = ({ item, type }) => {
  // Provide fallback values for missing properties
  const posterPath = item?.poster_path
    ? `${imgPathResolve}/${item.poster_path}`
    : "https://www.reelviews.net/resources/img/default_poster.jpg"; // Replace with a valid placeholder image path
  const voteAverage = item?.vote_average ? item.vote_average.toFixed(1) : "N/A";
  const title = item?.title || item?.name || "Untitled";
  const releaseYear =
    item?.release_date || item?.first_air_date
      ? new Date(item.release_date || item.first_air_date).getFullYear()
      : "Unknown";

  return (
    <Link to={`/${type}/${item?.id}`}>
      <div
        className="relative group transform transition-all hover:scale-105 z-10 rounded-lg shadow-lg overflow-hidden"
        style={{ transition: "all 0.3s ease-in-out" }}
      >
        {/* Movie Poster */}
        <img
          className="w-full h-full object-cover"
          src={posterPath}
          alt={item?.title || item?.name}
        />

        {/* Hover Details */}
        <div className="absolute inset-0 flex flex-col justify-end bg-black bg-opacity-70 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* Rating */}
          <div className="flex items-center gap-1 absolute top-3 right-5">
            <StarIcon size={20} color="gold" />
            <h3 className="text-sm font-semibold">{voteAverage}</h3>
          </div>

          {/* Title */}
          <h3 className="text-center font-bold text-lg px-2 truncate">
            {title}
          </h3>

          {/* Release Year */}
          <h4 className="text-center text-sm pb-3">{releaseYear}</h4>
        </div>
      </div>
    </Link>
  );
};

export default CardComponent;
