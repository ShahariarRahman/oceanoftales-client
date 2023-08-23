export type IReview = {
  user?: string;
  rating: number;
  comment: string;
};

export type IBook = {
  _id?: string;
  title: string;
  author: {
    email: string;
    name: string;
  };
  genre: string;
  publicationDate: string;
  imageUrl: string;
  rating?: number;
  reviews?: IReview[];
};

export type IBookParams = {
  sortBy?: string;
  sort?: string;
  limit?: number;
  page?: number;
  searchTerm?: string;
  genre?: string;
  publicationDate?: string;
  "author.email"?: string;
};

export type IAuthInputs = {
  email: string;
  password: string;
  confirmPassword?: string;
};

export type IUserBook = {
  finishList?: IBook;
  readingList?: IBook;
  wishList?: IBook;
};
