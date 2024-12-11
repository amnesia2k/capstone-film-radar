/* eslint-disable react/prop-types */
import { imgPathResolve } from "@/services/api";
import { StarIcon } from "lucide-react";
import { Link } from "react-router-dom";

const CardComponent = ({ item, type }) => {
  return (
    <Link to={`/${type}/${item?.id}`}>
      <div
        className="relative group transform transition-all hover:scale-105 z-10 rounded-lg shadow-lg overflow-hidden"
        style={{ transition: "all 0.3s ease-in-out" }}
      >
        {/* Movie Poster */}
        <img
          className="w-full h-full object-cover"
          src={`${imgPathResolve}/${item.poster_path}`}
          alt={item?.title || item?.name}
        />

        {/* Hover Details */}
        <div className="absolute inset-0 flex flex-col justify-end bg-black bg-opacity-70 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* Rating */}
          <div className="flex items-center gap-1 absolute top-3 right-5">
            <StarIcon size={20} color="gold" />
            <h3 className="text-sm font-semibold">
              {item?.vote_average.toFixed(1)}
            </h3>
          </div>

          {/* Title */}
          <h3 className="text-center font-bold text-lg px-2 truncate">
            {item?.title || item?.name}
          </h3>

          {/* Release Year */}
          <h4 className="text-center text-sm pb-3">
            {new Date(item?.release_date || item?.first_air_date).getFullYear()}
          </h4>
        </div>
      </div>
    </Link>
  );
};

export default CardComponent;
