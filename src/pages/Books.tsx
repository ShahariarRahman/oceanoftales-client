import BookCard from "@/components/BookCard";
import { useState, useEffect } from "react";
import { IBook } from "@/types/globalTypes";
import BookFilter from "@/components/BookFilter";

export default function Books() {
  const [books, setBooks] = useState<IBook[]>([]);

  //! Dummy Data
  useEffect(() => {
    fetch("/books.json")
      .then((response) => response.json())
      .then((data) => setBooks(data.books));
  }, []);
  //! Dummy Data

  return (
    <section className="max-w-lg lg:max-w-7xl mx-auto relative px-4 xl:px-0">
      <div className="lg:grid grid-cols-12 gap-5">
        <aside className="col-span-3">
          <BookFilter />
        </aside>
        <div className="col-span-9">
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-10 pb-20">
            {books.map((book, index) => (
              <BookCard
                book={book}
                key={index}
                className="shadow-md hover:shadow-2xl"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
