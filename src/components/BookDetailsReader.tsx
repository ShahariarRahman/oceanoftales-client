/* eslint-disable @typescript-eslint/no-explicit-any */
import { ImAlarm } from "react-icons/im";
import LoadingButton from "./LoadingButton";
import { Button } from "./ui/button";
import { LuSmilePlus } from "react-icons/lu";
import { BsCheckCircle } from "react-icons/bs";
import {
  IParam,
  useAddFinishMutation,
  useAddReadMutation,
  useAddWishMutation,
  useGetSingleFinishQuery,
  useGetSingleReadQuery,
  useGetSingleWishQuery,
} from "@/redux/features/userBooks/userBooksApi";
import { useNavigate } from "react-router-dom";
import { SwalToast } from "./Toast";
import { errorHandler } from "@/errors/errorHandler";
import { IBook } from "@/types/globalTypes";
import { useAppSelector } from "@/redux/hooks";

type IProps = {
  book: IBook;
};

export default function BookDetailsReader({ book }: IProps) {
  const email = useAppSelector((state) => state.auth.user.email);
  const navigate = useNavigate();

  const bookId = book._id;

  // get single wish, reading, finish
  const param: IParam = {
    id: bookId,
    email: email!,
  };

  const { data: wishData, isLoading: isGetWishLoad } =
    useGetSingleWishQuery(param);
  const { data: readData, isLoading: isGetReadLoad } =
    useGetSingleReadQuery(param);
  const { data: finishData, isLoading: isGetFinishWishLoad } =
    useGetSingleFinishQuery(param);

  // add wish, reading and finish
  const [addToWish, { isLoading: isAddWishLoad }] = useAddWishMutation();
  const [addToRead, { isLoading: isAddReadLoad }] = useAddReadMutation();
  const [addToFinish, { isLoading: isAddFinishLoad }] = useAddFinishMutation();

  const handleWishlist = async () => {
    const result: any = await addToWish({ id: book._id!, email: email! });
    if (result?.data?.data?.wishList?.includes(book._id)) {
      const proceed = await SwalToast.succeedAndAsk.fire(
        "Added to Wish List!",
        "Book successfully added to wish list",
      );
      if (proceed.isConfirmed) {
        navigate("/wishlist-book");
      }
    } else {
      await errorHandler.showError(result.error, {
        title: "Failed to add",
        des: "Failed to add book to wish list",
      });
    }
  };

  const handleReadList = async () => {
    const result: any = await addToRead({ id: book._id!, email: email! });
    if (result?.data?.data?.readingList?.includes(book._id)) {
      const proceed = await SwalToast.succeedAndAsk.fire(
        "Added to Reading List!",
        "Book successfully added to reading list",
      );
      if (proceed.isConfirmed) {
        navigate("/reading-book");
      }
    } else {
      await errorHandler.showError(result.error, {
        title: "Failed to add",
        des: "Failed to add book to reading list",
      });
    }
  };

  const handleFinishList = async () => {
    const result: any = await addToFinish({ id: book._id!, email: email! });
    if (result?.data?.data?.finishList?.includes(book._id)) {
      const proceed = await SwalToast.succeedAndAsk.fire(
        "Reading Finished!",
        "Reading complete and added to the finished list",
      );
      if (proceed.isConfirmed) {
        navigate("/finished-book");
      }
    } else {
      await errorHandler.showError(result.error, {
        title: "Failed to add",
        des: "Failed to add book to finished list",
      });
    }
  };

  const isWished = wishData?.data?._id === bookId;
  const isReading = readData?.data?._id === bookId;
  const isFinished = finishData?.data?._id === bookId;

  return (
    <>
      {isReading ? (
        isAddFinishLoad || isGetFinishWishLoad ? (
          <div className="mt-4">
            <LoadingButton
              btnClass="duration-300 rounded"
              className=" h-9 w-40 bg-green-600 hover:bg-green-600 rounded-sm"
            />
          </div>
        ) : (
          <Button
            disabled={isFinished}
            onClick={handleFinishList}
            size="sm"
            className="w-40 rounded mt-4 text-blue-50 hover:text-white hover:bg-green-600 bg-[#00aa0080] border-[1px] border-green-700 hover:border-green-600"
          >
            <span className="text-lg">
              <BsCheckCircle />
            </span>
            <span className="ml-2">
              {isFinished ? "Finished" : "Finish Reading"}
            </span>
          </Button>
        )
      ) : isAddReadLoad || isGetReadLoad ? (
        <div className="mt-4">
          <LoadingButton
            btnClass="duration-300 rounded"
            className="h-9 w-40 bg-blue-600 hover:bg-blue-600 rounded-sm"
          />
        </div>
      ) : (
        <Button
          onClick={handleReadList}
          size="sm"
          className="mt-4 w-40 rounded text-blue-50 hover:text-white hover:bg-blue-600 bg-[#0000aa80] border-[1px] border-blue-700 hover:border-blue-600"
        >
          <span className="text-lg">
            <ImAlarm />
          </span>
          <span className="ml-2">Start Reading</span>
        </Button>
      )}
      {isAddWishLoad || isGetWishLoad ? (
        <div className="mt-4">
          <LoadingButton
            btnClass="duration-300 rounded"
            className="text-xs h-9 w-40 bg-pink-600 hover:bg-pink-600 rounded-sm"
          />
        </div>
      ) : (
        <Button
          disabled={isWished}
          onClick={handleWishlist}
          size="sm"
          className="mt-4 w-40 rounded text-pink-50 hover:text-white hover:bg-pink-600 bg-[#aa115580] border-[1px] border-pink-700 hover:border-pink-600"
        >
          <span className="text-lg">
            <LuSmilePlus />
          </span>
          <span className="ml-2">
            {isWished ? "Wishlisted" : "Add to Wishlist"}
          </span>
        </Button>
      )}
    </>
  );
}
