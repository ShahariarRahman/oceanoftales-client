export type IReview = {
  user: string;
  rating: number;
  comment: string;
};

export type IBook = {
  _id: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  imageUrl: string;
  reviews: IReview[];
};
