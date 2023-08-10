import api from "../api/apiSlice";
import { createParams } from "@/helpers/urlHelpers";

export const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (params) => ({
        url: `/books?${createParams(params)}`,
      }),
      providesTags: ["get-books"],
    }),
    getSingleBook: builder.query({
      query: (id) => ({
        url: `/books/${id}`,
      }),
      providesTags: ["get-single-books"],
    }),
    postSingleBook: builder.mutation({
      query: (data) => ({
        url: `/books/`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetSingleBookQuery,
  usePostSingleBookMutation,
} = bookApi;
