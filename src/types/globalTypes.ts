export type IReview = {
  user: string;
  rating: number;
  comment: string;
};

export type IBook = {
  _id: string;
  title: string;
  author: {
    email: string;
    name: string;
  };
  genre: string;
  publicationDate: string;
  imageUrl: string;
  rating: number;
  reviews: IReview[];
};

export type IBookParams = {
  sortBy?: string;
  limit?: number;
  page?: number;
  searchTerm?: string;
  sort?: string;
  genre?: string;
  publicationYear?: string;
};

export type IAuthInputs = {
  email: string;
  password: string;
  confirmPassword?: string;
};
