import BookCard from "@/components/BookCard";
import { IBook } from "@/types/globalTypes";
import { useEffect, useState } from "react";

export default function WishList() {
  const [books, setBooks] = useState<IBook[]>([]);
  //! Dummy Data
  useEffect(() => {
    fetch("/books.json")
      .then((response) => response.json())
      .then((data) => setBooks(data.books));
  }, []);
  //! Dummy Data

  return (
    <div className="max-w-lg sm:max-w-7xl mx-auto relative px-4 xl:px-0">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 pb-20">
        {books.map((book, index) => (
          <BookCard
            book={book}
            key={index}
            className="shadow-md hover:shadow-2xl"
          />
        ))}
      </div>
    </div>
  );
}
