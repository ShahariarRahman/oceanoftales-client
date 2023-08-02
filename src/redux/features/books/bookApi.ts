import api from "../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => ({
        url: "/books",
      }),
    }),
  }),
});

export const { useGetBooksQuery } = bookApi;
