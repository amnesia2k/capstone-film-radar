import { errorImg } from "@/assets";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Helmet>
        <title>ReelsRadar • Page Not Found</title>
        <meta
          name="description"
          content="Welcome to ReelsRadar. Explore, discover, and track your favorite films effortlessly."
        />

        {/* OG Tags */}
        <meta property="og:title" content="ReelsRadar • Page Not Found" />
        <meta
          property="og:description"
          content="Welcome to ReelsRadar. Explore, discover, and track your favorite films effortlessly."
        />
        <meta
          property="og:image"
          content="https://reelsradar.netlify.app/movie_reel_pub.png"
        />
        <meta property="og:url" content="https://reelsradar.netlify.app/" />

        {/* TwitterTags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ReelsRadar • Page Not Found" />
        <meta
          name="twitter:description"
          content="Welcome to ReelsRadar. Explore, discover, and track your favorite films effortlessly."
        />
        <meta
          name="twitter:image"
          content="https://reelsradar.netlify.app/movie_reel_pub.png"
        />
      </Helmet>

      <div className="max-w-4xl w-full mx-auto px-5">
        <div className="flex flex-col justify-center items-center gap-5 h-screen md:h-[80vh] text-center">
          <img src={errorImg} alt="error_404_image" />
          <h3 className="text-xl md:text-3xl lg:text-5xl font-bold">
            Lost your way?
          </h3>
          <p className="text-base md:text-lg">
            Oops! This is awkward. You are looking for something that
            doesn&apos;t actually exist.
          </p>
          <Button onClick={handleGoBack}>Go Back</Button>
        </div>
      </div>
    </>
  );
};

export default Error;
