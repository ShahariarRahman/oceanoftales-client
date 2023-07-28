import { IReview } from "@/types/globalTypes";
import Rating from "react-rating";
import { FaStar } from "react-icons/fa";
import BookReviewForm from "./BookReviewForm";

type BookReviewProps = {
  reviews: IReview[] | undefined;
};

export default function BookReview({ reviews }: BookReviewProps) {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-3xl font-semibold mb-4">Book Reviews</h2>
        <ul className="space-y-4">
          {reviews?.map((review: IReview, index: number) => (
            <li key={index} className="border-b border-gray-300 pb-4">
              <div className="flex items-center mb-2">
                <span className="font-bold mr-2">{review.user}</span>
                <span className="text-yellow-500 flex">
                  {
                    <Rating
                      readonly
                      initialRating={review.rating}
                      fullSymbol={
                        <FaStar className="w-5 h-5 fill-yellow-400" />
                      }
                      emptySymbol={<FaStar className="w-5 h-5 fill-gray-300" />}
                    />
                  }
                </span>
              </div>
              <p className="text-lg">{review.comment}</p>
            </li>
          ))}
        </ul>
        <BookReviewForm />
      </div>
    </div>
  );
}
