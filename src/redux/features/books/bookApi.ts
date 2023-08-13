import { IBookParams } from "@/types/globalTypes";
import api from "../api/apiSlice";
import { createParams } from "@/helpers/urlHelpers";

export const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (params: IBookParams) => ({
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
    updateBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["get-books", "get-single-books"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
        body: {},
      }),
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetSingleBookQuery,
  usePostSingleBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;
