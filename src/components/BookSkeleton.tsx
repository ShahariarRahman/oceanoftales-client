import { FaStar } from "react-icons/fa";
import Rating from "react-rating";

export default function BookSkeleton({ className }: { className?: string }) {
  return (
    <div className={`rounded-lg p-6 ${className}`}>
      <div className="rounded-md w-full h-64 mb-6 bg-gray-300 animate-pulse"></div>
      <p className="flex animate-pulse">
        {
          <Rating
            readonly
            initialRating={5}
            fullSymbol={<FaStar className="w-4 h-4 fill-gray-300" />}
            emptySymbol={<FaStar className="w-4 h-4 fill-gray-300" />}
          />
        }
      </p>
      <h2 className="rounded-sm w-5/6 h-5 my-1 bg-gray-300 animate-pulse"></h2>
      <p className="rounded-sm w-2/3 h-5 mt-1 bg-gray-300 animate-pulse"></p>
      <p className="rounded-sm w-1/2 h-5 mt-1 bg-gray-300 animate-pulse"></p>
      <p className="rounded-sm w-1/3 h-5 my-1 bg-gray-300 animate-pulse"></p>
      <div className="rounded-md w-32 h-9 mt-8 bg-gray-300 animate-pulse"></div>
    </div>
  );
}
