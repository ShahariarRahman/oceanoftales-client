import BookReview from "@/components/BookReview";
import { Button } from "@/components/ui/button";
import { IBook } from "@/types/globalTypes";
import { Link, useParams } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDeleteForever } from "react-icons/md";
import { BsCheckCircle, BsFillBagCheckFill } from "react-icons/bs";
import { LuSmilePlus } from "react-icons/lu";
import Rating from "react-rating";
import { FaStar } from "react-icons/fa";
import { useGetSingleBookQuery } from "@/redux/features/books/bookApi";
import Loading from "@/components/Loading";

export default function BookDetails() {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleBookQuery(id);

  //! Temporary code, should be replaced with redux
  const author = true;
  //! Temporary code ends here

  const book: IBook = data?.data;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center relative">
      <div
        className="absolute top w-full max-w-7xl h-[700px] md:h-96 bg-cover bg-center"
        style={{ backgroundImage: `url(${book?.imageUrl})` }}
      >
        <div className="bg-black bg-opacity-70 w-full h-full flex items-center justify-center"></div>
      </div>
      <section className="max-w-7xl grid md:grid-cols-12 gap-10 md:gap-1 w-full h-96 mx-auto mt-10 md:mt-0 relative">
        <aside className="col-span-6 md:col-span-5 flex flex-col items-center justify-center">
          <div className="flex justify-center w-3/4">
            <img
              className="object-cover flex h-72 rounded shadow-2xl shadow-gray-200 border border-black"
              src={book?.imageUrl}
              alt=""
            />
          </div>
          <div className="flex flex-col md:flex-row justify-center space-x-0 md:space-x-4">
            {author ? (
              <>
                <Link to="/edit-book">
                  <Button className="mt-4 w-32 text-2xl text-blue-600 hover:text-white hover:bg-blue-500 bg-white">
                    <BiEdit />
                  </Button>
                </Link>
                <Button className="mt-4 w-32 text-2xl text-red-600 hover:text-white hover:bg-red-500 bg-white">
                  <MdOutlineDeleteForever />
                </Button>
              </>
            ) : (
              <>
                <Button className="mt-4 w-32 text-pink-600 hover:text-white hover:bg-pink-600 bg-white">
                  <span className="text-lg ">
                    <BsFillBagCheckFill />
                  </span>
                  <span className="ml-2">Read Now</span>
                </Button>
                <Button className="mt-4 w-32  text-blue-600 hover:text-white hover:bg-blue-600 bg-white">
                  <span className="text-lg">
                    <LuSmilePlus />
                  </span>
                  <span className="ml-2">Wishlist</span>
                </Button>
                <Button className="mt-4 w-28 text-green-600 hover:text-white hover:bg-green-600 bg-white">
                  <span className="text-lg">
                    <BsCheckCircle />
                  </span>
                  <span className="ml-2">Finished</span>
                </Button>
              </>
            )}
          </div>
        </aside>
        <div className="hidden col-span-1 md:flex justify-center items-center">
          <p className="bg-white h-3/4 w-1 rounded-2xl"></p>
        </div>
        <article className="col-span-6 flex justify-center items-center">
          <div className="w-3/4">
            <p className="text-yellow-500 flex">
              {
                <Rating
                  readonly
                  initialRating={book?.rating}
                  fullSymbol={<FaStar className="w-5 h-5 fill-yellow-400" />}
                  emptySymbol={<FaStar className="w-5 h-5 fill-gray-300" />}
                />
              }
            </p>
            <h2 className="text-3xl font-semibold mb-4 text-gray-100">
              {book?.title}
            </h2>
            <p className="text-gray-200 mb-2">Author: {book?.author?.name}</p>
            <p className="text-gray-200 mb-2">Genre: {book?.genre}</p>
            <p className="text-gray-200 mb-2">
              Publication Date: {book?.publicationDate}
            </p>
          </div>
        </article>
      </section>
      <section className="w-full pt-72 md:pt-20 relative">
        <BookReview reviews={book?.reviews} />
      </section>
    </div>
  );
}
