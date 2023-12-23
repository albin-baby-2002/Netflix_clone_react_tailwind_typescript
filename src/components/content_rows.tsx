import { useEffect, useRef, useState } from "react";
import { MovieResponse, MovieResult, fetchRequest } from "../common/api";
import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import { ChevronRightIcon } from "@heroicons/react/16/solid";
import MovieCard from "./movieCard";
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
    console.log(rowData[0]);

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

  const onNextClick = () => {
    console.log(translateX);
    console.log(getTranslateXValue());
    if (sliderRef.current && translateX >= -(getTranslateXValue() * 2)) {
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
    <section className="MovieRow w-screen scroll-smooth">
      <h2 className="m-4">{title}</h2>

      <section
        ref={containerRef}
        className=" relative  m-2  flex  h-full w-full flex-nowrap overflow-x-hidden "
      >
        <button
          onClick={onPrevClick}
          className=" absolute z-[1]  h-full w-8  bg-black/60 opacity-0"
        >
          <ChevronLeftIcon />
        </button>
        <button
          onClick={onNextClick}
          className=" absolute right-2 z-[1]  h-full  w-8 bg-black/60 opacity-0"
        >
          <ChevronRightIcon />
        </button>

        <section
          ref={sliderRef}
          className="flex gap-2 transition-transform  duration-700"
        >
          {rowData?.map((row) => {
            return <MovieCard key={row.id} {...row} />;
          })}
        </section>
      </section>
    </section>
  );
};

export default ContentRows;
