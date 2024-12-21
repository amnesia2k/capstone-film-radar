import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import CardComponent from "@/components/common/CardComponent";
import Pagination from "@/components/Pagination";
import { Input } from "@/components/ui/input";
import { searchAll } from "@/services/api";
import { SkewLoader } from "react-spinners";
import { Helmet } from "react-helmet";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        <meta property="og:title" content="ReelsRadar • Search" />
        <meta
          property="og:description"
          content="Search for your favorite Movies and TV Shows effortlessly."
        />
        <meta
          property="og:image"
          content="https://reelsradar.netlify.app/movie_reel_pub.png"
        />
        <meta
          property="og:url"
          content="https://reelsradar.netlify.app/search"
        />

        {/* TwitterTags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ReelsRadar • Search" />
        <meta
          name="twitter:description"
          content="Search for your favorite Movies and TV Shows effortlessly."
        />
        <meta
          name="twitter:image"
          content="https://reelsradar.netlify.app/movie_reel_pub.png"
        />
      </Helmet>

      <section className="max-w-7xl w-full mx-auto px-5">
        <div className="max-w-3xl mx-auto w-full">
          <h3 className="text-sm md:text-xl uppercase font-bold my-5">
            Search Movies and TV Shows
          </h3>

          <form onSubmit={handleSearch}>
            <div className="relative flex items-center">
              <Input
                placeholder="Search Movies, TV Shows..."
                value={searchValue}
                className="rounded-full p-6"
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <Button
                variant="ghost"
                className="w-10 h-10 absolute top-[5px] right-3 rounded-full"
              >
                <SearchIcon size={50} />
              </Button>
            </div>
          </form>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center mt-20">
            <SkewLoader color="#6d28d9" size={50} />
          </div>
        )}

        {data?.length === 0 && !isLoading && (
          <h3 className="text-center text-lg mt-10">
            ...oops, no results found😢
          </h3>
        )}

        <div>
          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 mt-10 gap-5">
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
