import BookReview from "@/components/BookReview";
import { IBook } from "@/types/globalTypes";
import { useParams } from "react-router-dom";
import { useGetSingleBookQuery } from "@/redux/features/books/bookApi";
import Loading from "@/components/Loading";
import BookNotFound from "@/components/BookNotFound";
import BookDetailsManager from "@/components/BookDetailsManager";
import { useAppSelector } from "@/redux/hooks";

export default function BookDetails() {
  const { id } = useParams();
  const { email } = useAppSelector((state) => state.auth.user);

  const { data, isLoading: isGetLoading } = useGetSingleBookQuery(id!);
  const book: IBook = data?.data;

  if (isGetLoading) {
    return <Loading />;
  }

  if (!book?._id) {
    return <BookNotFound />;
  }

  const isAuthor = book?.author?.email === email;

  return (
    <div className="flex flex-col items-center relative">
      <aside
        className="sticky top-16 w-full max-w-7xl bg-cover bg-center"
        style={{ backgroundImage: `url(${book?.imageUrl})` }}
      >
        <div className="bg-black bg-opacity-80 w-full h-full min-h-[140vh]  flex items-center justify-center"></div>
      </aside>
      <div className="absolute top-20 max-w-7xl w-full h-96 mt-10 md:mt-0">
        <BookDetailsManager isAuthor={isAuthor} book={book} />
        <BookReview isAuthor={isAuthor} reviews={book.reviews} />
      </div>
    </div>
  );
}
