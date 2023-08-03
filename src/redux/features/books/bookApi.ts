import api from "../api/apiSlice";

export const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (url) => ({
        url: url,
      }),
      providesTags: ["get-books"],
    }),
  }),
});

export const { useGetBooksQuery } = bookApi;
