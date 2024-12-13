import { useEffect, useState } from "react";
import { firestoreDb } from "@/services/firestore";
import { useAuth } from "@/context/useAuth";
import { toast } from "sonner";
import { ScaleLoader } from "react-spinners";
import WatclistCard from "@/components/WatclistCard";

const Watchlist = () => {
  const { userWatchlist } = firestoreDb();
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.uid) {
      userWatchlist(user?.uid)
        .then((data) => {
          setWatchlist(data);
        })
        .catch((error) => {
          console.error("Error getting user watchlist: ", error);
          toast.error("Error getting user watchlist😢");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [user?.uid, userWatchlist]);

  const totalItems = watchlist.length;

  return (
    <section className="max-w-7xl w-full mx-auto px-5">
      <div className="flex flex-col md:flex-row items-baseline gap-4 my-5">
        <header>
          <h3 className="text-sm md:text-xl uppercase font-bold">
            {`My Watchlist - (${totalItems})`}
          </h3>
        </header>
      </div>

      {isLoading && (
        <div className="flex justify-center mt-10">
          <ScaleLoader color="#22c55e" />
        </div>
      )}

      {!isLoading && watchlist?.length === 0 && (
        <div className="flex justify-center items-center">
          <h3>Watchlist is Empty, start adding to watchlist now</h3>
        </div>
      )}

      {!isLoading && watchlist?.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {watchlist?.map((item) => (
            <WatclistCard
              key={item?.id}
              item={item}
              type={item?.type}
              setWatchlist={setWatchlist}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Watchlist;
