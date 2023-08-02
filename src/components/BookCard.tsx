import { IBook } from "@/types/globalTypes";
import { toast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import Rating from "react-rating";
import { FaStar } from "react-icons/fa";

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
    <div className={`rounded-lg p-6 hover:scale-105 duration-100 ${className}`}>
      <Link to={`/book/${book._id}`}>
        <img
          src={book.imageUrl}
          alt={book.title}
          className="w-full h-64 object-contain mb-6 rounded-lg"
        />
      </Link>
      <p className="text-yellow-500 flex">
        {
          <Rating
            readonly
            initialRating={book?.rating || 0}
            fullSymbol={<FaStar className="w-4 h-4 fill-yellow-400" />}
            emptySymbol={<FaStar className="w-4 h-4 fill-gray-300" />}
          />
        }
      </p>
      <h2 className="text-xl font-semibold">{book.title}</h2>
      <p className="text-gray-600 text-sm">Author: {book.author}</p>
      <p className="text-purple-700 font-semibold mt-1">{book.genre}</p>
      <p className="text-gray-700 mt-2 text-sm">
        Publication Date: {book.publicationDate}
      </p>
      <Button
        variant="default"
        className="mt-5 cursor-pointer"
        onClick={() => handleBook(book)}
      >
        Add to Wishlist
      </Button>
    </div>
  );
}
