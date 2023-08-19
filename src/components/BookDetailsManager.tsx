import { IBook } from "@/types/globalTypes";
import { format } from "date-fns";
import { FaStar } from "react-icons/fa";
import Rating from "react-rating";
import BookDetailsAuthor from "./BookDetailsAuthor";
import BookDetailsReader from "./BookDetailsReader";

type IProps = {
  book: IBook;
  isAuthor: boolean;
};

export default function BookDetailsManager({ book, isAuthor }: IProps) {
  return (
    <section className="grid md:grid-cols-12 gap-10 md:gap-1">
      <aside className="col-span-6 md:col-span-5 flex flex-col items-center justify-center">
        <div className="flex justify-center w-3/4">
          <img
            className="object-cover flex h-72 rounded shadow-2xl shadow-gray-200 border border-black"
            src={book?.imageUrl}
            alt="book-cover"
          />
        </div>
        <div className="flex justify-center text-white mt-4">
          <Rating
            readonly
            initialRating={book?.rating}
            fullSymbol={<FaStar className="w-5 h-5 mt-1 fill-yellow-400" />}
            emptySymbol={<FaStar className="w-5 h-5 mt-1 fill-gray-300" />}
          />
          <span className="ml-2 flex items-center">
            {`(${book.reviews?.length})`} Ratings
          </span>
        </div>
      </aside>
      <div className="hidden col-span-1 md:flex justify-center items-center">
        <p className="bg-white h-3/4 w-1 rounded-2xl"></p>
      </div>
      <article className="col-span-6 flex justify-center items-center">
        <div className="w-3/4 text-white">
          <h2 className="text-3xl font-semibold mb-6">{book?.title}</h2>
          <p className="mb-1">Author : {book?.author?.name}</p>
          <p className="mb-1 text-lg text-violet-400 font-bold ">
            {book?.genre}
          </p>
          <p className="mb-1">
            Publication Date:{" "}
            {book?.publicationDate &&
              format(new Date(book?.publicationDate), "PP")}
          </p>
          <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 mt-4 whitespace-nowrap">
            {isAuthor ? (
              <BookDetailsAuthor book={book} />
            ) : (
              <BookDetailsReader book={book} />
            )}
          </div>
        </div>
      </article>
    </section>
  );
}
