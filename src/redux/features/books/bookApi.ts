import { IBook, IBookParams } from "@/types/globalTypes";
import api from "../api/apiSlice";
import { urlHelper } from "@/helpers/urlHelpers";

type IUpdateBook = {
  id: string;
  data: IBook;
};

export const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (params: IBookParams) => ({
        url: `/books?${urlHelper.createParams(params)}`,
      }),
      providesTags: ["get-books"],
    }),
    getSingleBook: builder.query({
      query: (id: string) => ({
        url: `/books/${id}`,
      }),
      providesTags: ["get-single-books"],
    }),
    postSingleBook: builder.mutation({
      query: (data: IBook) => ({
        url: `/books/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["get-books", "get-single-books"],
    }),
    updateBook: builder.mutation({
      query: ({ id, data }: IUpdateBook) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["get-books", "get-single-books"],
    }),
    deleteBook: builder.mutation({
      query: (id: string) => ({
        url: `/books/${id}`,
        method: "DELETE",
        body: {},
      }),
      invalidatesTags: ["get-books", "get-single-books"],
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
