import { useEffect, useRef, useState } from "react";
import { MovieResponse, MovieResult, fetchRequest } from "../common/api";
import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import { ChevronRightIcon } from "@heroicons/react/16/solid";
type props = {
  title: string;
  endPoint: string;
};

const ContentRows = ({ title, endPoint }: props) => {
  // jsx component function

  const sliderRef = useRef<HTMLSelectElement>(null);
  const containerRef = useRef<HTMLSelectElement>(null);

  const cardVisibleInRow = useRef(0);

  const [translateX, setTranslateX] = useState(0);

  const CARD_WIDTH = 200;

  const [rowData, setRowData] = useState<MovieResult[]>([]);

  async function fetchRowData() {
    const response = await fetchRequest<MovieResponse<MovieResult[]>>(endPoint);

    setRowData(response.results);
  }

  function getTranslateXValue() {
    let translateXValue = 0;

    if (sliderRef.current) {
      translateXValue = Math.floor(
        ((cardVisibleInRow.current * CARD_WIDTH) /
          sliderRef.current.clientWidth) *
          100,
      );
    }

    return translateXValue;
  }

  useEffect(() => {
    if (rowData.length) {
      if (containerRef.current) {
        cardVisibleInRow.current = Math.floor(
          containerRef.current.clientWidth / CARD_WIDTH,
        );
      }
    }
  }, [rowData.length]);

  useEffect(() => {
    fetchRowData();
  }, []);

  const generateImageUrl = (path: string, width: number): string => {
    return `${import.meta.env.VITE_IMAGE_BASE_URL}w${width}${path}`;
  };

  const onNextClick = () => {
    console.log(translateX);
    console.log(getTranslateXValue());
    if (sliderRef.current && translateX >= -48) {
      let updatedTranslateX = translateX - getTranslateXValue();

      console.log(updatedTranslateX);

      sliderRef.current.style.transform = `translateX(${updatedTranslateX}%)`;

      setTranslateX(updatedTranslateX);
    }
  };

  const onPrevClick = () => {
    console.log(translateX);
    console.log(getTranslateXValue());

    if (sliderRef.current && translateX < 0) {
      let updatedTranslateX = translateX + getTranslateXValue();

      console.log(updatedTranslateX);

      sliderRef.current.style.transform = `translateX(${updatedTranslateX}%)`;

      setTranslateX(updatedTranslateX);
    }
  };

  return (
    <section className="w-screen scroll-smooth">
      <h2 className="m-4">{title}</h2>

      <section
        ref={containerRef}
        className=" relative  m-2  flex  h-full w-full flex-nowrap overflow-x-hidden "
      >
        <button
          onClick={onPrevClick}
          className=" absolute z-[1]  h-full w-8  bg-black/60"
        >
          <ChevronLeftIcon />
        </button>
        <button
          onClick={onNextClick}
          className=" absolute right-2 z-[1]  h-full  w-8 bg-black/60"
        >
          <ChevronRightIcon />
        </button>

        <section
          ref={sliderRef}
          className="flex gap-1 transition-transform  duration-700"
        >
          {rowData?.map((row) => {
            const { id, title, poster_path } = row;

            return (
              <section className="  h-[250px] w-[200px]  shrink-0" key={id}>
                <img
                  className="h-full w-full object-contain"
                  src={generateImageUrl(poster_path, CARD_WIDTH)}
                  alt={title}
                />
              </section>
            );
          })}
        </section>
      </section>
    </section>
  );
};

export default ContentRows;
