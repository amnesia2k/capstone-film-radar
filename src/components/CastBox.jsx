/* eslint-disable react/prop-types */

import { avatar } from "@/assets";
import { imgPathResolve } from "@/services/api";

const CastBox = ({ credits }) => {
  // cast google search
  const googleUrl = "https://www.google.com/search?q="; //what+was+the+last+joseon+treasure+in+jumong (this is the query)

  return (
    <div>
      <h3 className="text-xl text-center md:text-left uppercase font-bold mt-10">
        Cast
      </h3>
      <div className="flex flex-row flex-wrap mt-5 mb-10 gap-5">
        {credits?.length === 0 && <p>Uh oh, No Casts found!!😢</p>}
        {credits &&
          credits?.map((item) => {
            const formatedName = encodeURIComponent(
              item?.name.toLowerCase()
            ).replace(/%20/, "+");
            return (
              <a
                key={item?.id}
                href={`${googleUrl}${formatedName}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-end gap-2 max-w-[350px] w-full mx-auto rounded-md shadow-md border"
              >
                {/* transform transition-all hover:scale-105 --- removed from the link tag */}
                <img
                  src={
                    item?.profile_path
                      ? `${imgPathResolve}/${item?.profile_path}`
                      : avatar
                  }
                  className="w-[90px] h-[100px] rounded-l-md object-cover"
                  alt={item?.name}
                />
                <div className="pr-3">
                  <h3 className="font-semibold">{item?.name}</h3>
                  <h3 className="text-sm font-medium text-slate-500 mb-3">
                    {item?.character}
                  </h3>
                </div>
              </a>
            );
          })}
      </div>
    </div>
  );
};

export default CastBox;
