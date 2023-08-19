/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useAddReviewMutation } from "@/redux/features/reviews/reviewApi";
import { useParams } from "react-router-dom";
import { SwalToast } from "./Toast";
import { errorHandler } from "@/errors/errorHandler";

type IProps = {
  isAuthor: boolean;
};

export default function ReviewForm({ isAuthor }: IProps) {
  const params = useParams();
  const id = params.id!;
  const { email } = useAppSelector((state) => state.auth.user);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IReview>({
    resolver: zodResolver(ReviewFormValidation.reviewBookZodSchema),
  });

  const [addReview, { isLoading }] = useAddReviewMutation();

  const onSubmit: SubmitHandler<IReview> = async (data) => {
    const formattedData: IReview = {
      user: email as string,
      comment: data.comment,
      rating: data.rating,
    };
    const result: any = await addReview({ id, data: formattedData });
    console.log(result);

    if (result.data?.data?._id) {
      reset();
      await SwalToast.succeed.fire(
        "Review added",
        "Review added successfully! Thanks for ur feedback..",
      );
    } else {
      await errorHandler.showError(result.error, {
        title: "Failed to review",
        des: "Failed to share book review",
      });
    }
  };

  let errorMessage: string | undefined = "";
  if (Object.keys(errors).length > 0) {
    errorMessage = errors.comment?.message || errors.rating?.message;
  }

  return (
    <div className="mt-8 border-gray-300 pt-4 sm:w-3/4">
      <h3 className="text-2xl font-semibold">Write New Review</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          title={isAuthor ? "You cannot review your own book" : ""}
          className={`flex flex-col space-y-4 pt-8 ${
            isAuthor && "cursor-not-allowed"
          }`}
        >
          <Controller
            name="comment"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Textarea
                disabled={isAuthor}
                onChange={onChange}
                value={value || ""}
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
                  readonly={isAuthor}
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
                disabled={
                  !!(errorMessage && errorMessage?.length > 0) || isAuthor
                }
                type="submit"
                className="w-28"
              >
                Share Review
              </Button>
            ) : (
              <LoadingButton
                btnClass="duration-300"
                className="w-28 bg-primary/70 hover:bg-primary/60"
              />
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
