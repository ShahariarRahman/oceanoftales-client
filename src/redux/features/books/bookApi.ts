import api from "../api/apiSlice";

export const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (url) => ({
        url: url,
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
