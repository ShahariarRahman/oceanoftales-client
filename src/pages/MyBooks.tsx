import BookCard from "@/components/BookCard";

import { useAppSelector } from "@/redux/hooks";
import bookNotFound from "@/assets/images/illustration/bookNotFound.png";
import BookSkeleton from "@/components/BookSkeleton";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { IBook, IBookParams } from "@/types/globalTypes";
import { IApiResponse } from "@/types/responseTypes";
import { useGetBooksQuery } from "@/redux/features/books/bookApi";
import Pagination from "@/components/Pagination";

export default function MyBooks() {
  const email = useAppSelector((state) => state.auth.user.email);
  const [params, setParams] = useState<IBookParams>({
    "author.email": email!,
  });

  const navigate = useNavigate();
  const { data, isLoading, isFetching } = useGetBooksQuery(params);

  const { data: books, meta }: IApiResponse<IBook[]> = useMemo(
    () => data || [],
    [data],
  );

  return (
    <div className="max-w-lg sm:max-w-7xl mx-auto relative px-4 xl:px-0">
      <div className="flex flex-col justify-between min-h-screen">
        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-10">
          {!isLoading && !isFetching && books?.length ? (
            books?.map((book: IBook) => (
              <BookCard
                book={book}
                key={book._id}
                className="shadow-md hover:shadow-2xl"
              />
            ))
          ) : isLoading && isFetching ? (
            [
              [...Array(8)].map((_, index) => (
                <BookSkeleton
                  key={index}
                  className="shadow-md hover:shadow-2xl"
                />
              )),
            ]
          ) : (
            <div className="flex col-span-4 justify-center">
              <div className="flex flex-col items-center max-w-lg absolute -top-5 mx-5">
                <img
                  className="w-64 caret-transparent"
                  src={bookNotFound}
                  alt="bookNotFound"
                />
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Currency List is Empty
                </h2>
                <p className="text-muted-foreground text-sm text-center">
                  You have not add any book yet. This book list is currently
                  empty. If you have any questions or need assistance in finding
                  the perfect books to add, please feel free to contact our
                  team. We're here to help you make the most of your reading
                  experience.
                </p>
                <Button
                  onClick={() => navigate("/add-new-book")}
                  variant="outline"
                  size="sm"
                  className="mt-5 w-32 rounded"
                >
                  Add Book
                </Button>
              </div>
            </div>
          )}
        </div>
        <Pagination params={params} setParams={setParams} meta={meta} />
      </div>
    </div>
  );
}
