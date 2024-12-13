import CardComponent from "@/components/common/CardComponent";
import Loader from "@/components/common/Loader";
import Pagination from "@/components/Pagination";
import { Input } from "@/components/ui/input";
import { searchAll } from "@/services/api";
import { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    // TODO: Fetch movies/shows based on search input
    searchAll(searchInput, activePage)
      .then((res) => {
        setData(res?.results);
        setActivePage(res?.page);
        setTotalPages(res?.total_pages);
      })
      .catch((err) => console.error(err, "err"))
      .finally(() => setIsLoading(false));
  }, [searchInput, activePage]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchInput(searchValue);
  };
  return (
    <div className="max-w-7xl w-full mx-auto px-5">
      <h3 className="text-sm md:text-xl uppercase font-bold my-5">Search</h3>

      <form onSubmit={handleSearch}>
        <Input
          placeholder="Search Movies, TV Shows..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </form>

      {isLoading && (
        <div className="flex justify-center items-center mt-20">
          <ScaleLoader color="#22c55e" />
        </div>
      )}

      {data?.length === 0 && !isLoading && (
        <h3 className="text-center text-lg mt-10">
          ...oops, no results found😢
        </h3>
      )}

      <div>
        {/* <h3 className="text-sm md:text-xl uppercase font-bold my-5">Results</h3> */}
        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 mt-5 gap-5">
          {data?.length > 0 &&
            !isLoading &&
            data?.map((item, idx) =>
              isLoading ? (
                <Loader key={idx} />
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

      {data?.length > 0 && !isLoading && (
        <Pagination
          activePage={activePage}
          totalPages={totalPages}
          setActivePage={setActivePage}
        />
      )}
    </div>
  );
};

export default Search;
