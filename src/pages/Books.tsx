import BookCard from "@/components/BookCard";
import { IBook, IBookParams } from "@/types/globalTypes";
import BookFilter from "@/components/BookFilter";
import { useGetBooksQuery } from "@/redux/features/books/bookApi";
import BookSkeleton from "@/components/BookSkeleton";
import { useMemo, useState } from "react";
import { BsBookHalf } from "react-icons/bs";
import { TiWarningOutline } from "react-icons/ti";
import { IApiResponse, IErrorResponse } from "@/types/responseTypes";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/Pagination";

export default function Books() {
  const [params, setParams] = useState<IBookParams>({
    sortBy: "publicationDate",
    limit: 6,
  });

  const { data, isLoading, refetch, isFetching, isError, error } =
    useGetBooksQuery(params);

  const { data: books, meta }: IApiResponse<IBook[]> = useMemo(() => {
    console.log("book fetched");
    return data || [];
  }, [data]);

  return (
    <section className="max-w-lg lg:max-w-7xl mx-auto relative px-4 xl:px-0">
      <div className="lg:grid grid-cols-12 gap-5">
        <aside className="col-span-3 my-4">
          <BookFilter params={params} setParams={setParams} refetch={refetch} />
        </aside>
        <div className="flex flex-col justify-between col-span-9 min-h-screen">
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-10">
            {!isLoading && !isFetching && books?.length ? (
              books?.map((book: IBook) => (
                <BookCard
                  book={book}
                  key={book._id}
                  className="shadow-md hover:shadow-2xl"
                />
              ))
            ) : !isLoading && !isFetching && !isError && !books?.length ? (
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
            ) : isError ? (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div className="bg-red-600 text-white px-6 py-4 rounded-lg shadow-lg flex flex-col items-center">
                  <div className="flex items-center">
                    <TiWarningOutline className="h-6 w-6 text-red-100 mr-4" />
                    <span className="font-bold text-xl">
                      Oops! Something went wrong
                    </span>
                  </div>
                  <p className="text-red-100 my-5 capitalize">
                    {(error as IErrorResponse)?.data?.message}
                  </p>
                  <Button onClick={() => refetch()} variant="secondary">
                    Try Again
                  </Button>
                </div>
              </div>
            ) : (
              [
                [...Array(6)].map((_, index) => (
                  <BookSkeleton
                    key={index}
                    className="shadow-md hover:shadow-2xl"
                  />
                )),
              ]
            )}
          </div>
          <Pagination params={params} setParams={setParams} meta={meta} />
        </div>
      </div>
    </section>
  );
}
