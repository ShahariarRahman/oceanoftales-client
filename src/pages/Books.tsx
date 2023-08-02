import BookCard from "@/components/BookCard";
import { IBook } from "@/types/globalTypes";
import BookFilter from "@/components/BookFilter";
import { useGetBooksQuery } from "@/redux/features/books/bookApi";
import BookSkeleton from "@/components/BookSkeleton";

export default function Books() {
  const { data, isLoading } = useGetBooksQuery(undefined);

  const books = data?.data || {};

  return (
    <section className="max-w-lg lg:max-w-7xl mx-auto relative px-4 xl:px-0">
      <div className="lg:grid grid-cols-12 gap-5">
        <aside className="col-span-3">
          <BookFilter />
        </aside>
        <div className="col-span-9">
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-10 pb-20">
            {!isLoading
              ? books?.map((book: IBook) => (
                  <BookCard
                    book={book}
                    key={book._id}
                    className="shadow-md hover:shadow-2xl"
                  />
                ))
              : [
                  [...Array(10)].map((_, index) => (
                    <BookSkeleton
                      key={index}
                      className="shadow-md hover:shadow-2xl"
                    />
                  )),
                ]}
          </div>
        </div>
      </div>
    </section>
  );
}
