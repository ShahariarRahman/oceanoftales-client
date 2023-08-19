/* eslint-disable @typescript-eslint/no-explicit-any */
import { IBook } from "@/types/globalTypes";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import LoadingButton from "./LoadingButton";
import { useState } from "react";
import { useDeleteBookMutation } from "@/redux/features/books/bookApi";
import { SwalToast } from "./Toast";
import { storage } from "@/lib/firebase";
import { deleteObject, ref } from "firebase/storage";
import { errorHandler } from "@/errors/errorHandler";

type IProps = {
  book: IBook;
};

export default function BookDetailsAuthor({ book }: IProps) {
  const [loadingDelete, setDeleteLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const [deleteBook, { isLoading: isDeleteLoading }] = useDeleteBookMutation();

  const handleDelete = async () => {
    const proceedDelete = await SwalToast.confirmDelete.fire(
      "Permanently Deletion",
      "The book will be deleted from our collection",
    );

    if (!proceedDelete.isConfirmed) {
      return SwalToast.warn.fire("Cancelled", "Book deletion cancelled!");
    }

    setDeleteLoading(true);
    // database and api
    const result: any = await deleteBook(book?._id as string);

    // show success message & visit
    if (result.data?.data?._id) {
      const storageRefPrev = ref(storage, book.imageUrl);
      await deleteObject(storageRefPrev);

      setDeleteLoading(false);

      await SwalToast.succeed.fire(
        "Delete Successful",
        "Book successfully Deleted",
      );
      navigate("/books/");
    } else {
      setDeleteLoading(false);
      await errorHandler.showError(result.error, {
        title: "Failed to delete",
        des: "Failed to delete your book from collection",
      });
    }
  };

  return (
    <>
      <Link to={`/edit-book/${book?._id}`}>
        <Button
          size="sm"
          className="w-40 rounded mt-4 text-blue-50 hover:text-white hover:bg-green-600 bg-[#00aa0080] border-[1px] border-green-700 hover:border-green-600"
        >
          <span className="text-lg">
            <BiEdit />
          </span>
          <span className="ml-2">Edit Book</span>
        </Button>
      </Link>
      {loadingDelete || isDeleteLoading ? (
        <div className="mt-4">
          <LoadingButton
            btnClass="duration-300 rounded"
            className="h-9 w-36 bg-red-600 hover:bg-red-600 rounded-sm"
          />
        </div>
      ) : (
        <Button
          onClick={handleDelete}
          size="sm"
          className="w-40 rounded mt-4 text-blue-50 hover:text-white hover:bg-red-600 bg-[#aa000080] border-[1px] border-red-700 hover:border-red-600"
        >
          <span className="text-lg">
            <RiDeleteBin5Line />
          </span>
          <span className="ml-2">Delete Book</span>
        </Button>
      )}
    </>
  );
}
