/* eslint-disable @typescript-eslint/no-explicit-any */
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

export type IAuthInputs = {
  email: string;
  password: string;
  confirmPassword?: string;
};

export type IResponse = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  data?: any;
};
