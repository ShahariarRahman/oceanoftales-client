import { isBefore, isEqual } from "date-fns";
import { z } from "zod";

const today = new Date();
today.setHours(today.getHours() + 1);

const addBookZodSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .nonempty({ message: "Title is required" })
    .min(2, { message: "Title cannot be too short" })
    .max(70, { message: "Title cannot be too long" }),
  author: z
    .string({ required_error: "Author name is required" })
    .nonempty({ message: "Author is required" })
    .min(5, { message: "Author name cannot be too short" })
    .max(28, { message: "Author name cannot be too long" }),
  genre: z.object(
    {
      value: z
        .string({ required_error: "Value name is required" })
        .nonempty({ message: "Value is required" }),
      label: z
        .string({ required_error: "Label name is required" })
        .nonempty({ message: "Label is required" }),
    },
    { required_error: "Genre is Required" },
  ),
  publicationDate: z
    .date()
    .refine((value) => isBefore(value, today) || isEqual(value, today), {
      message: "Publication date cannot be in the future",
    }),
  imageUrl: z.instanceof(File, { message: "Image is required" }),
});

export const bookFormValidation = { addBookZodSchema };
