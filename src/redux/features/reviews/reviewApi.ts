import { IReview } from "@/types/globalTypes";
import api from "../api/apiSlice";

type IAddReview = {
  id: string;
  data: IReview;
};

export const reviewApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addReview: builder.mutation({
      query: ({ id, data }: IAddReview) => ({
        url: `/reviews/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["get-books", "get-single-books"],
    }),
  }),
});

export const { useAddReviewMutation } = reviewApi;
