import BookCard from "@/components/BookCard";
import { IBook } from "@/types/globalTypes";
import BookFilter from "@/components/BookFilter";
import { useGetBooksQuery } from "@/redux/features/books/bookApi";
import BookSkeleton from "@/components/BookSkeleton";
import { useState } from "react";
import { BsBookHalf } from "react-icons/bs";

export default function Books() {
  const [url, setUrl] = useState<string>("/books");
  const { data, isLoading, refetch, isFetching } = useGetBooksQuery(url);
  const books: IBook[] =
    (data?.data &&
      [...data.data]?.sort(
        (a: IBook, b: IBook) =>
          new Date(b.publicationDate).getTime() -
          new Date(a.publicationDate).getTime(),
      )) ||
    [];

  return (
    <section className="max-w-lg lg:max-w-7xl mx-auto relative px-4 xl:px-0">
      <div className="lg:grid grid-cols-12 gap-5">
        <aside className="col-span-3">
          <BookFilter setUrl={setUrl} refetch={refetch} />
        </aside>
        <div className="col-span-9">
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-10 pb-20">
            {!isLoading && !isFetching && books?.length ? (
              books?.map((book: IBook) => (
                <BookCard
                  book={book}
                  key={book._id}
                  className="shadow-md hover:shadow-2xl"
                />
              ))
            ) : !isLoading && !isFetching && !books.length ? (
              <div className="flex flex-col items-center justify-center m-10">
                <BsBookHalf className="w-12 h-12 text-gray-500 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Book Not Found
                </h2>
                <p className="text-gray-600 text-center">
                  We are sorry, but the book you are looking for is currently
                  unavailable in our library. Please feel free to explore our
                  other extensive collections of books or check back later for
                  updates.
                </p>
              </div>
            ) : (
              [
                [...Array(12)].map((_, index) => (
                  <BookSkeleton
                    key={index}
                    className="shadow-md hover:shadow-2xl"
                  />
                )),
              ]
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
