/* eslint-disable @typescript-eslint/no-explicit-any */
import { IBook } from "@/types/globalTypes";
import { format } from "date-fns";
import { FaStar } from "react-icons/fa";
import Rating from "react-rating";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import LoadingButton from "./LoadingButton";
import { MdOutlineDeleteForever } from "react-icons/md";
import { BsCheckCircle } from "react-icons/bs";
import { ImAlarm } from "react-icons/im";
import { LuSmilePlus } from "react-icons/lu";
import { useState } from "react";
import { useDeleteBookMutation } from "@/redux/features/books/bookApi";
import { SwalToast } from "./Toast";
import { storage } from "@/lib/firebase";
import { deleteObject, ref } from "firebase/storage";
import { errorHandler } from "@/errors/errorHandler";

type IProps = {
  book: IBook;
};

export default function BookDetailsManager({ book }: IProps) {
  const [loadingDelete, setLoading] = useState<boolean>(false);
  const [deleteBook, { isLoading: isDeleteLoading }] = useDeleteBookMutation();

  //! Temporary code
  const author = false;
  const startReading = false;
  //!ends here

  const navigate = useNavigate();

  const handleDelete = async () => {
    const proceedDelete = await SwalToast.confirmDelete.fire(
      "Permanently Deletion",
      "The book will be deleted from our collection",
    );

    if (!proceedDelete.isConfirmed) {
      return SwalToast.warn.fire("Cancelled", "Book deletion cancelled!");
    }

    setLoading(true);
    // database and api
    const result: any = await deleteBook(book?._id as string);

    // show success message & visit
    if (result.data?.data?._id) {
      const storageRefPrev = ref(storage, book.imageUrl);
      await deleteObject(storageRefPrev);

      setLoading(false);

      await SwalToast.succeed.fire(
        "Delete Successful",
        "Book successfully Deleted",
      );
      navigate("/books/");
    } else {
      setLoading(false);
      await errorHandler.showApiErrorMessage(result.error);
    }
  };

  return (
    <section className="grid md:grid-cols-12 gap-10 md:gap-1">
      <aside className="col-span-6 md:col-span-5 flex flex-col items-center justify-center">
        <div className="flex justify-center w-3/4">
          <img
            className="object-cover flex h-72 rounded shadow-2xl shadow-gray-200 border border-black"
            src={book?.imageUrl}
            alt=""
          />
        </div>
        <div className="flex justify-center text-white mt-4">
          <Rating
            readonly
            initialRating={book?.rating}
            fullSymbol={<FaStar className="w-5 h-5 mt-1 fill-yellow-400" />}
            emptySymbol={<FaStar className="w-5 h-5 mt-1 fill-gray-300" />}
          />
          <span className="ml-2 flex items-center">
            {`(${book.reviews?.length})`} Ratings
          </span>
        </div>
      </aside>
      <div className="hidden col-span-1 md:flex justify-center items-center">
        <p className="bg-white h-3/4 w-1 rounded-2xl"></p>
      </div>
      <article className="col-span-6 flex justify-center items-center">
        <div className="w-3/4 text-white">
          <h2 className="text-3xl font-semibold mb-6">{book?.title}</h2>
          <p className="mb-1">Author : {book?.author?.name}</p>
          <p className="mb-1 text-lg text-violet-400 font-bold ">
            {book?.genre}
          </p>
          <p className="mb-1">
            Publication Date:{" "}
            {book?.publicationDate &&
              format(new Date(book?.publicationDate), "PP")}
          </p>
          <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 mt-4 whitespace-nowrap">
            {author ? (
              <>
                <Link to={`/edit-book/${book?._id}`}>
                  <Button
                    size="sm"
                    className="rounded mt-4 text-2xl text-blue-50 hover:text-white hover:bg-green-600 bg-[#00aa0080] border-[1px] border-green-700 hover:border-green-600"
                  >
                    <BiEdit />
                  </Button>
                </Link>
                {loadingDelete || isDeleteLoading ? (
                  <div className="mt-4">
                    <LoadingButton
                      btnClass="duration-500 rounded"
                      className="text-xs h-9 w-[50px] bg-red-600 hover:bg-red-600 rounded-sm"
                    />
                  </div>
                ) : (
                  <Button
                    onClick={handleDelete}
                    size="sm"
                    className="rounded mt-4 text-2xl text-red-50 hover:text-white hover:bg-red-600 bg-[#aa000080] border-[1px] border-red-700 hover:border-red-600"
                  >
                    <MdOutlineDeleteForever />
                  </Button>
                )}
              </>
            ) : (
              <>
                {startReading ? (
                  <Button
                    size="sm"
                    className="w-40 rounded mt-4 text-blue-50 hover:text-white hover:bg-green-600 bg-[#00aa0080] border-[1px] border-green-700 hover:border-green-600"
                  >
                    <span className="text-lg">
                      <BsCheckCircle />
                    </span>
                    <span className="ml-2">Finish Reading</span>
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    className="mt-4 w-40 rounded text-blue-50 hover:text-white hover:bg-blue-600 bg-[#0000aa80] border-[1px] border-blue-700 hover:border-blue-600"
                  >
                    <span className="text-lg">
                      <ImAlarm />
                    </span>
                    <span className="ml-2">Start Reading</span>
                  </Button>
                )}
                <Button
                  size="sm"
                  className="mt-4 w-40 rounded text-pink-50 hover:text-white hover:bg-pink-600 bg-[#aa115580] border-[1px] border-pink-700 hover:border-pink-600"
                >
                  <span className="text-lg">
                    <LuSmilePlus />
                  </span>
                  <span className="ml-2">Add to Wishlist</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </article>
    </section>
  );
}
