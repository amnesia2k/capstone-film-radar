import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import CardComponent from "@/components/common/CardComponent";
import Pagination from "@/components/Pagination";
import { Input } from "@/components/ui/input";
import { searchAll } from "@/services/api";
import { ScaleLoader } from "react-spinners";
import { Helmet } from "react-helmet-async";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Parse query params
  const { q = "", page = 1 } = queryString.parse(location.search);

  const [searchValue, setSearchValue] = useState(q);
  const [searchInput, setSearchInput] = useState(q);
  const [activePage, setActivePage] = useState(Number(page));
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    searchAll(searchInput, activePage)
      .then((res) => {
        setData(res?.results || []);
        setTotalPages(res?.total_pages || 1);
      })
      .catch((err) => console.error(err, "err"))
      .finally(() => setIsLoading(false));
  }, [searchInput, activePage]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchInput(searchValue);

    // Update URL with the search query and reset the page to 1
    navigate(`?q=${searchValue}&page=1`);
  };

  const handlePageChange = (page) => {
    setActivePage(page);

    // Update the URL with the new page
    navigate(`?q=${searchInput}&page=${page}`);
  };

  return (
    <>
      <Helmet>
        <title>ReelsRadar • Search</title>
        <meta
          name="description"
          content="Search for your favorite Movies and TV Shows effortlessly."
        />

        {/* OG Tags */}
        <meta name="og:title" content="ReelsRadar • Search" />
        <meta
          name="og:description"
          content="Search for your favorite Movies and TV Shows effortlessly."
        />
        <meta name="og:image" content="/public/movie_reel.png" />
        <meta name="og:url" content="https://reelsradar.netlify.app/search" />

        {/* TwitterTags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ReelsRadar • Search" />
        <meta
          name="twitter:description"
          content="Search for your favorite Movies and TV Shows effortlessly."
        />
        <meta name="twitter:image" content="/public/movie_reel.png" />
      </Helmet>

      <section className="max-w-7xl w-full mx-auto px-5">
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
          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 mt-5 gap-5">
            {data?.length > 0 &&
              !isLoading &&
              data?.map((item) => (
                <CardComponent
                  key={item?.id}
                  item={item}
                  type={item?.media_type}
                />
              ))}
          </div>
        </div>

        {data?.length > 0 && !isLoading && (
          <Pagination
            activePage={activePage}
            totalPages={totalPages}
            setActivePage={handlePageChange}
          />
        )}
      </section>
    </>
  );
};

export default Search;
