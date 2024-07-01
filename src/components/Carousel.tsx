"use client";

import React, { useState } from "react";
import Image from "next/image";

interface CarouselProps {
  data: {
    title: string;
    description: string;
    imageSrc: string;
  }[];
}

const Carousel: React.FC<CarouselProps> = ({ data }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? data.length - 1 : prevSlide - 1
    );
  };

  const handleNext = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === data.length - 1 ? 0 : prevSlide + 1
    );
  };

  return (
    <div className="carousel w-full">
      {data.map((item, index) => (
        <div
          key={index}
          className={`carousel-item relative w-full ${
            index === currentSlide ? "block" : "hidden"
          }`}
        >
          <div className="flex justify-between items-center my-10">
            <button className="" onClick={handlePrev}>
              <Image
                src="/left-arrow.svg"
                alt="left arrow"
                width={25}
                height={32}
              />
            </button>
            <div className="grid justify-center gap-2">
              <Image
                src={item.imageSrc}
                alt={item.title}
                width={100}
                height={100}
                className="mx-auto"
              />

              <h3 className="text-base font-bold text-center">{item.title}</h3>
              <p className="text-[10px] mb-0 text-center">{item.description}</p>
            </div>
            <button className="" onClick={handleNext}>
              <Image
                src="/right-arrow.svg"
                alt="right arrow"
                width={25}
                height={32}
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
