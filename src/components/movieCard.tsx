import { useEffect, useRef, useState } from "react";
import Modal from "./model";
import YouTube from "react-youtube";
import { fetchRequest } from "../common/api";
import { ENDPOINT } from "../common/endPoints";
import { XMarkIcon } from "@heroicons/react/16/solid";

export interface MovieVideoResult<T> {
  id: number;
  results: T[];
  [k: string]: unknown;
}

export type MovieVideoInfo = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
  [k: string]: unknown;
};

type props = {
  id: number;
  title: string;
  poster_path: string;
};

const MovieCard = ({ id, title, poster_path }: props) => {
  const [videoInfo, setVideoInfo] = useState<MovieVideoInfo>();

  useEffect(() => {
    console.log(videoInfo);
  }, [[videoInfo]]);

  async function fetchVideoInfo() {
    const response = await fetchRequest<MovieVideoResult<MovieVideoInfo>>(
      ENDPOINT.MOVIE_VIDEO.replace("movie_id", id.toString()),
    );

    let ans = response.results.filter(
      (video) =>
        video.official &&
        video.type === "Trailer" &&
        video.name === "Official Trailer",
    )[0];

    return ans;
  }
  const CARD_WIDTH = 200;

  const generateImageUrl = (path: string, width: number): string => {
    return `${import.meta.env.VITE_IMAGE_BASE_URL}w${width}${path}`;
  };

  const [isOpen, setIsOpen] = useState(false);

  const movieCardRef = useRef<HTMLSelectElement>(null);

  async function onmouseenter() {
    setIsOpen(true);

    let videoData = await fetchVideoInfo();
    setVideoInfo(videoData);
  }

  useEffect(() => {
    movieCardRef.current?.addEventListener("click", onmouseenter);

    return () =>
      movieCardRef.current?.removeEventListener("mouseenter", onmouseenter);
  }, []);

  function onClose(value: boolean) {
    setIsOpen(value);
  }

  function closeModal() {
    if (isOpen) {
      setIsOpen(false);
    }
  }
  return (
    <>
      <section
        ref={movieCardRef}
        className="  h-[250px] w-[200px] shrink-0  cursor-pointer"
      >
        <img
          className="h-full w-full  object-fill"
          src={generateImageUrl(poster_path, CARD_WIDTH)}
          alt={title}
        />
      </section>

      <Modal isOpen={isOpen} onClose={onClose} closeModal={closeModal}>
        <div className=" flex justify-end">
          <button
            className=" w-6  text-white outline-none "
            onClick={closeModal}
          >
            <XMarkIcon />
          </button>
        </div>

        <YouTube
          opts={{
            width: "400",
            playerVars: {
              autoplay: 1,
              playsinline: 1,
              controls: 0,
              modestbranding: 1,
              showinfo: 0,
            },
          }}
          videoId={videoInfo?.key}
        />
      </Modal>
    </>
  );
};

export default MovieCard;
