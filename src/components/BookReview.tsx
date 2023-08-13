import { IReview } from "@/types/globalTypes";
import Rating from "react-rating";
import { FaStar } from "react-icons/fa";
import BookReviewForm from "./BookReviewForm";

type BookReviewProps = {
  reviews: IReview[] | undefined;
};

export default function BookReview({ reviews }: BookReviewProps) {
  return (
    <section className="w-full min-h-screen bg-white text-gray-700  mx-auto mt-32 pt-10 pb-32">
      <div className="p-4">
        <h2 className="text-3xl font-semibold mb-12">
          Book Reviews ({reviews?.length})
        </h2>
        <ul className="space-y-4">
          {reviews?.map((review: IReview, index: number) => (
            <li key={index} className="border-b border-gray-300 pb-4">
              <div className="flex items-center mb-2">
                <span className="font-bold mr-2 text-sm">{review.user}</span>
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
              <p>{review.comment}</p>
            </li>
          ))}
        </ul>
        <BookReviewForm />
      </div>
    </section>
  );
}
