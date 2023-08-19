import { IBook } from "@/types/globalTypes";
import { Link } from "react-router-dom";
import Rating from "react-rating";
import { FaStar, FaUserCheck } from "react-icons/fa";
import { format } from "date-fns";
import { useAppSelector } from "@/redux/hooks";

type IBookCardProps = {
  className?: string;
  book: IBook;
};

export default function BookCard({ book, className }: IBookCardProps) {
  const user = useAppSelector((state) => state.auth.user);

  const isAuthor = user?.email === book?.author?.email;

  return (
    <div
      className={`relative hover:scale-105 duration-100 caret-transparent cursor-default rounded-lg p-6 ${className}`}
    >
      <Link to={`/book/${book?._id}`}>
        <div>
          <img
            src={book?.imageUrl}
            alt={book?.title}
            className="w-full h-64 object-contain mb-6 rounded-lg"
          />

          <div className="flex items-center justify-between">
            <p className="text-yellow-500 flex whitespace-nowrap">
              <Rating
                readonly
                initialRating={book?.rating || 0}
                fullSymbol={<FaStar className="w-4 h-4 fill-yellow-400" />}
                emptySymbol={<FaStar className="w-4 h-4 fill-gray-300" />}
              />
            </p>
          </div>
          <h2
            title={book?.title}
            className="text-xl font-semibold capitalize text-gray-700"
          >
            {book?.title?.length > 20
              ? book?.title?.slice(0, 20) + "..."
              : book?.title}
          </h2>
          <p className="text-gray-700 text-sm">Author: {book?.author?.name}</p>
          <p className="text-[#3870ff] font-semibold mt-1">{book?.genre}</p>
          <p className="text-gray-700 mt-1 text-sm">
            Publication Date: {format(new Date(book?.publicationDate), "PP")}
          </p>
          <div className="mt-5 text-green-700 text-xs">
            {isAuthor ? (
              <p className="flex space-x-2">
                <FaUserCheck size={18} />
                <span>Your Book</span>
              </p>
            ) : (
              "** Publicly available to read"
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
