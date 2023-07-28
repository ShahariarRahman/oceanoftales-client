import { useState } from "react";
import { IReview } from "@/types/globalTypes";
import Rating from "react-rating";
import { FaStar } from "react-icons/fa";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export default function ReviewForm() {
  const [newReview, setNewReview] = useState<IReview | null>(null);
  const handleReviewSubmit = () => {
    console.log(newReview);
  };

  return (
    <div className="mt-8 border-gray-300 pt-4 sm:w-3/4">
      <h3 className="text-2xl font-semibold mb-4">Write New Review</h3>
      <div className="flex flex-col space-y-4">
        <Input placeholder="Your Name" />
        <Textarea rows={4} placeholder="Your Review" />
        <div className="flex items-center">
          <span className="mr-2">Rating:</span>
          <Rating
            onClick={(e) =>
              setNewReview({
                rating: e,
                user: "aa",
                comment: "",
              })
            }
            initialRating={4.5}
            fullSymbol={<FaStar className="w-5 h-5 fill-yellow-400" />}
            emptySymbol={<FaStar className="w-5 h-5 fill-gray-300" />}
          />
        </div>
        <Button onClick={handleReviewSubmit} className="w-32">
          Submit Review
        </Button>
      </div>
    </div>
  );
}
