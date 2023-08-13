import { z } from "zod";

const reviewBookSchema = z.object({
  comment: z
    .string({ required_error: "Comment is required" })
    .min(5, "Comment must be at least 5 characters")
    .max(100, "Comment cannot exceed 100 characters"),
  rating: z
    .number({ required_error: "Rating is required" })
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot exceed 5")
    .nullable(),
});

export const ReviewFormValidation = { reviewBookSchema };
