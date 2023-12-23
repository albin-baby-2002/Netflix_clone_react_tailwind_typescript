import { useEffect, useState } from "react";
import { MovieResponse, MovieResult, fetchRequest } from "../common/api";
import { ENDPOINT } from "../common/endPoints";

const Banner = () => {
  //

  const generateImageUrl = (path: string | undefined): string => {
    return `${import.meta.env.VITE_IMAGE_BASE_URL}original${path}`;
  };

  const [randomMovie, setRandomMovie] = useState<MovieResult>();

  function getRandomVal(n: number) {
    return Math.floor(Math.random() * (n - 1));
  }

  const fetchPopularMovies = async () => {
    const response = await fetchRequest<MovieResponse<MovieResult[]>>(
      ENDPOINT.MOVIES_POPULAR,
    );

    const filterMovies = response.results.filter(
      (movie) => movie.backdrop_path,
    );

    setRandomMovie(filterMovies[getRandomVal(filterMovies.length)]);
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  return (
    <section className=" relative h-[470px]  w-full">
      <div className="  absolute left-8  top-24   w-1/3 ">
        <h2 className="   w-full  text-wrap text-5xl font-extrabold uppercase">
          {randomMovie?.title}
        </h2>

        <p className=" mt-5 text-white">{randomMovie?.overview}</p>
      </div>

      <img
        className=" h-full w-full "
        src={generateImageUrl(randomMovie?.backdrop_path)}
        alt=""
      />
    </section>
  );
};

export default Banner;
