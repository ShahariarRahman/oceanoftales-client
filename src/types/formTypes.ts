/* eslint-disable @typescript-eslint/no-explicit-any */
export type IBookForm = {
  title: string;
  author: string;
  genre: {
    value: string;
    label: string;
  };
  publicationDate: Date | any;
  imageUrl: File | string | null;
};
