import { IBook } from "@/types/globalTypes";
import { toast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import Rating from "react-rating";
import { FaCrown, FaStar } from "react-icons/fa";
import { format } from "date-fns";
import { ImAlarm } from "react-icons/im";
import { BsCheckCircle } from "react-icons/bs";
import { LuSmilePlus } from "react-icons/lu";

type IBookCardProps = {
  className?: string;
  book: IBook;
};

export default function BookCard({ book, className }: IBookCardProps) {
  const handleBook = (book: IBook) => {
    console.log(book);
    toast({
      description: "Book Added to Wishlist",
    });
  };

  return (
    <div
      className={`relative hover:scale-105 duration-100 caret-transparent cursor-default rounded-lg p-6 ${className}`}
    >
      <div>
        <Link to={`/book/${book?._id}`}>
          <img
            src={book?.imageUrl}
            alt={book?.title}
            className="w-full h-64 object-contain mb-6 rounded-lg"
          />
        </Link>
        <div className="flex items-center justify-between">
          <p className="text-yellow-500 flex whitespace-nowrap">
            <Rating
              readonly
              initialRating={book?.rating || 0}
              fullSymbol={<FaStar className="w-4 h-4 fill-yellow-400" />}
              emptySymbol={<FaStar className="w-4 h-4 fill-gray-300" />}
            />
          </p>
          <div className="text-white text-xs flex space-x-2 whitespace-nowrap">
            <small className="px-1 pb-[2px] bg-blue-500 rounded flex items-center space-x-1">
              <FaCrown />
              <span>Owner</span>
            </small>
            <small className="px-1 pb-[2px] bg-violet-500 rounded flex items-center space-x-1">
              <ImAlarm />
              <span>Reading</span>
            </small>
            <small className="px-1 pb-[2px] bg-green-500 rounded flex items-center space-x-1">
              <BsCheckCircle />
              <span>Finished</span>
            </small>
            <small className="px-1 pb-[2px] bg-pink-500 rounded flex items-center space-x-1">
              <LuSmilePlus />
              <span>Wishlist</span>
            </small>
          </div>
        </div>
        <h2 title={book?.title} className="text-xl font-semibold">
          {book?.title?.length > 20
            ? book?.title?.slice(0, 20) + "..."
            : book?.title}
        </h2>
        <p className="text-gray-600 text-sm">Author: {book?.author?.name}</p>
        <p className="text-purple-700 font-semibold mt-1">{book?.genre}</p>
        <p className="text-gray-700 mt-2 text-sm">
          Publication Date: {format(new Date(book?.publicationDate), "PP")}
        </p>
        <Button
          size="sm"
          variant="default"
          className="mt-5 cursor-pointer"
          onClick={() => handleBook(book)}
        >
          Add to Wishlist
        </Button>
      </div>
    </div>
  );
}
