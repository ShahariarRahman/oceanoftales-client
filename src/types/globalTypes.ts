/* eslint-disable @typescript-eslint/no-explicit-any */
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
