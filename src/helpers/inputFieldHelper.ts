import { IBookForm } from "@/types/formTypes";
import { IBook } from "@/types/globalTypes";

const bookDefaultField = (book: IBook): IBookForm => {
  return {
    title: book?.title,
    author: book?.author?.name,
    genre: { label: book?.genre, value: book?.genre },
    publicationDate: new Date(book?.publicationDate),
    imageUrl: book?.imageUrl,
  };
};

const formatData = (email: string, data: IBookForm): IBook => {
  return {
    title: data.title,
    author: {
      name: data.author,
      email: email,
    },
    genre: data.genre.value,
    publicationDate: data.publicationDate.toISOString(),
    imageUrl: "",
  };
};

export const inputFieldHelper = {
  bookDefaultField,
  formatData,
};
