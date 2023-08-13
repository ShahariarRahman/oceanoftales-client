import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import Rating from "react-rating";
import { FaStar } from "react-icons/fa";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { IReview } from "@/types/globalTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReviewFormValidation } from "@/validation/reviewForm.validation";
import { BiMessageError } from "react-icons/bi";
import { useAppSelector } from "@/redux/hooks";
import LoadingButton from "./LoadingButton";

export default function ReviewForm() {
  const { email } = useAppSelector((state) => state.auth.user);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IReview>({
    resolver: zodResolver(ReviewFormValidation.reviewBookSchema),
  });

  // ! Temp
  const isLoading = false;
  // ! Temp

  const onSubmit: SubmitHandler<IReview> = (data) => {
    const formattedData = {
      user: email,
      comment: data.comment,
      rating: data.rating,
    };
    console.log(formattedData);
  };

  let errorMessage: string | undefined = "";
  if (Object.keys(errors).length > 0) {
    errorMessage = errors.comment?.message || errors.rating?.message;
  }

  return (
    <div className="mt-8 border-gray-300 pt-4 sm:w-3/4">
      <h3 className="text-2xl font-semibold mb-8">Write New Review</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-4">
          <Controller
            name="comment"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                rows={5}
                placeholder="Write your review here..."
              />
            )}
          />
          <div className="flex justify-between items-center">
            <Controller
              name="rating"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Rating
                  onChange={onChange}
                  initialRating={value}
                  fullSymbol={<FaStar className="w-5 h-5 fill-yellow-400" />}
                  emptySymbol={<FaStar className="w-5 h-5 fill-gray-300" />}
                />
              )}
            />
            {errorMessage && errorMessage?.length > 0 && (
              <p className="ml-1 text-sm flex items-center space-x-2 text-red-500 capitalize">
                <span>{errorMessage}</span>
                <BiMessageError />
              </p>
            )}
          </div>
          <div className="whitespace-nowrap pt-4">
            {!isLoading ? (
              <Button
                disabled={!!errorMessage && errorMessage?.length > 0}
                type="submit"
                className="w-28"
              >
                Share Review
              </Button>
            ) : (
              <LoadingButton className="w-28" />
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
