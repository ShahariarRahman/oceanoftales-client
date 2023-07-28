import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IBook } from "@/types/globalTypes";
import BookCard from "./BookCard";

export default function RecentBooks() {
  const [books, setBooks] = useState<IBook[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  //! Dummy Data
  useEffect(() => {
    fetch("/books.json")
      .then((response) => response.json())
      .then((data) => setBooks(data.books));
  }, []);
  const latestBooks = books.slice(0, 10);
  //! Dummy Data

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    afterChange: (current: number) => setCurrentSlide(current),
    customPaging: (i: number) => (
      <div
        className="text-white bg-slate-600 border border-gray-700 hover:scale-110 relative top-12 lg:top-10"
        style={{
          borderRadius: "30%",
          marginTop: "10px",
        }}
      >
        {i + 1}
      </div>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div
      className="container mx-auto py-8 mb-24 scroll-smooth"
      id="newly-arrived-books"
    >
      <div className="flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl uppercase font-extrabold leading-tight mb-6">
            <span className="pb-2">Newly arrived books</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Delve into the latest captivating reads that will take you on
            extraordinary adventures and wondrous journeys.
          </p>
        </div>
      </div>

      <Slider {...sliderSettings} className="mt-12 rounded-2xl">
        {latestBooks.map((book, index) => (
          <BookCard book={book} key={index} />
        ))}
      </Slider>

      <div className="flex items-center justify-center mt-24">
        <span className="text-gray-600  border px-2 rounded">
          {currentSlide + 1}/{latestBooks.length}
        </span>
      </div>
    </div>
  );
}