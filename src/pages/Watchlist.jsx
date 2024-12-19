import { useEffect, useState } from "react";
import { firestoreDb } from "@/services/firestore";
import { useAuth } from "@/context/useAuth";
import { toast } from "sonner";
import { ScaleLoader } from "react-spinners";
import WatclistCard from "@/components/WatclistCard";
import Pagination from "@/components/Pagination";
import { Helmet } from "react-helmet";
import { useSearchParams } from "react-router-dom";

const Watchlist = () => {
  const { userWatchlist } = firestoreDb();
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [paginatedWatchlist, setPaginatedWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [itemsPerPage] = useState(20);

  // React Router's query parameters for pagination
  const [searchParams, setSearchParams] = useSearchParams();

  // activePage from query params or sessionStorage (with a fallback to 1)
  const activePage =
    parseInt(searchParams.get("page"), 10) ||
    parseInt(sessionStorage.getItem("watchlistPage"), 10) ||
    1;

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

  useEffect(() => {
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedWatchlist(watchlist.slice(startIndex, endIndex));
  }, [activePage, watchlist, itemsPerPage]);

  // Save activePage to sessionStorage and update query params
  useEffect(() => {
    sessionStorage.setItem("watchlistPage", activePage); // Save to sessionStorage
    setSearchParams({ page: activePage.toString() }); // Update URL query params
  }, [activePage, setSearchParams]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activePage]);

  const totalItems = watchlist.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const setActivePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      sessionStorage.setItem("watchlistPage", page); // Update sessionStorage
      setSearchParams({ page: page.toString() }); // Update query params
    }
  };

  return (
    <>
      <Helmet>
        <title>ReelsRadar • Watchlist</title>
        <meta
          name="description"
          content="Explore from your collection of movies."
        />
      </Helmet>

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

        {!isLoading && paginatedWatchlist?.length === 0 && (
          <div className="flex justify-center items-center">
            <h3>Watchlist is Empty, start adding to watchlist now</h3>
          </div>
        )}

        {!isLoading && paginatedWatchlist?.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {paginatedWatchlist.map((item) => (
              <WatclistCard
                key={item?.id}
                item={item}
                type={item?.type}
                setWatchlist={setWatchlist}
              />
            ))}
          </div>
        )}

        {!isLoading && totalPages > 1 && (
          <Pagination
            activePage={activePage}
            totalPages={totalPages}
            setActivePage={setActivePage}
          />
        )}
      </section>
    </>
  );
};

export default Watchlist;
