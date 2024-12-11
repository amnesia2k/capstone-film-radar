/* eslint-disable react/prop-types */

import { avatar } from "@/assets";
import { imgPathResolve } from "@/services/api";

const CastBox = ({ credits }) => {
  return (
    <div>
      <h3 className="text-xl uppercase font-bold mt-10">Cast</h3>
      <div className="flex flex-row flex-wrap mt-5 mb-10 gap-5">
        {credits?.length === 0 && <p>Uh oh, No Casts found!!😢</p>}
        {credits &&
          credits?.map((item) => (
            <div key={item?.id} className="flex items-end gap-2 max-w-[350px] w-full mx-auto rounded-md shadow-md border">
              <img
                src={
                  item?.profile_path
                    ? `${imgPathResolve}/${item.profile_path}`
                    : avatar
                }
                className="w-[90px] h-[100px] rounded-l-md object-cover"
                alt={item.name}
              />
              <div className="pr-3">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <h3 className="text-sm font-medium text-slate-500 mb-3">{item.character}</h3>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CastBox;
