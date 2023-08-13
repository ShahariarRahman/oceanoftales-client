import BookReview from "@/components/BookReview";
import { IBook, IReview } from "@/types/globalTypes";
import { useParams } from "react-router-dom";
import { useGetSingleBookQuery } from "@/redux/features/books/bookApi";
import Loading from "@/components/Loading";
import BookNotFound from "@/components/BookNotFound";
import BookDetailsManager from "@/components/BookDetailsManager";

export default function BookDetails() {
  const { id } = useParams();
  const { data, isLoading: isGetLoading } = useGetSingleBookQuery(id);

  const book: IBook = data?.data;

  if (isGetLoading) {
    return <Loading />;
  }

  if (!book?._id) {
    return <BookNotFound />;
  }

  //  ! test data
  const reviews: IReview[] = [
    {
      user: "John Doe",
      rating: 4,
      comment: "Excellent product, met all my expectations.",
    },
    {
      user: "Jane Smith",
      rating: 5,
      comment: "Outstanding service! Will definitely recommend to others.",
    },
    {
      user: "Michael Johnson",
      rating: 3,
      comment: "Good quality, but could use some improvements.",
    },
    {
      user: "Emily White",
      rating: 4,
      comment: "Great value for the price. Prompt delivery.",
    },
    {
      user: "David Lee",
      rating: 5,
      comment: "Impressive customer support. Very satisfied with the purchase.",
    },
  ];
  //  ! test data

  return (
    <div className="flex flex-col items-center relative">
      <aside
        className="sticky top-16 w-full max-w-7xl min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${book?.imageUrl})` }}
      >
        <div className="bg-black bg-opacity-80 w-full h-full min-h-screen flex items-center justify-center"></div>
      </aside>
      <div className="absolute top-20 max-w-7xl w-full h-96 mt-10 md:mt-0">
        <BookDetailsManager book={book} />
        <BookReview reviews={reviews} />
      </div>
    </div>
  );
}
