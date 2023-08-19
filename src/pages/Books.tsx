import BookCard from "@/components/BookCard";
import { IBook, IBookParams } from "@/types/globalTypes";
import BookFilter from "@/components/BookFilter";
import { useGetBooksQuery } from "@/redux/features/books/bookApi";
import BookSkeleton from "@/components/BookSkeleton";
import { useEffect, useMemo, useState } from "react";
import { IApiResponse } from "@/types/responseTypes";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/Pagination";
import bookNotFound from "@/assets/images/illustration/bookNotFound.png";

export default function Books() {
  const [autoRefetch, setAutoRefetch] = useState(false);

  const [params, setParams] = useState<IBookParams>({
    sortBy: "publicationDate",
    limit: 6,
  });

  const { data, isLoading, refetch, isFetching, isError } = useGetBooksQuery(
    params,
    {
      refetchOnMountOrArgChange: true,
      pollingInterval: autoRefetch ? 3000 : 0,
    },
  );

  const { data: books, meta }: IApiResponse<IBook[]> = useMemo(
    () => data || [],
    [data],
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isFetching]);

  if (isError && !autoRefetch) {
    setAutoRefetch(true);
  }
  if (!isError && autoRefetch) {
    setAutoRefetch(false);
  }

  return (
    <section className="lg:max-w-7xl mx-auto relative px-4 2xl:px-0">
      <div className="lg:grid grid-cols-12 gap-5">
        <aside className="col-span-3 my-3">
          <BookFilter params={params} setParams={setParams} refetch={refetch} />
        </aside>
        <div className="flex flex-col justify-between col-span-9 min-h-screen">
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-8 mt-3">
            {!isLoading && !isFetching && books?.length ? (
              books?.map((book: IBook) => (
                <BookCard
                  book={book}
                  key={book._id}
                  className="shadow-md hover:shadow-md"
                />
              ))
            ) : !isLoading && !isFetching && !isError && !books?.length ? (
              <div className="flex col-span-3 justify-center m-10">
                <div className="flex flex-col items-center max-w-lg">
                  <img
                    className="w-64 caret-transparent"
                    src={bookNotFound}
                    alt="bookNotFound"
                  />
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Oops! Book Not Found
                  </h2>
                  <p className="text-muted-foreground text-sm text-center">
                    We are sorry, but the book you are looking for is currently
                    unavailable in our library. Please feel free to explore our
                    other extensive collections of books or check back later for
                    updates.
                  </p>
                  <Button
                    onClick={() =>
                      setParams({
                        sortBy: "publicationDate",
                        limit: 6,
                      })
                    }
                    variant="outline"
                    size="sm"
                    className="mt-5 w-20 rounded"
                  >
                    Back
                  </Button>
                </div>
              </div>
            ) : (
              [
                [...Array(6)].map((_, index) => (
                  <BookSkeleton
                    key={index}
                    className="shadow-md hover:shadow-md"
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
