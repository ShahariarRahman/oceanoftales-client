import { urlHelper } from "@/helpers/urlHelpers";
import api from "../api/apiSlice";

export type IParam = {
  id?: string;
  email: string;
};

export const userBooksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // get list
    getWish: builder.query({
      query: ({ email }: IParam) => ({
        url: urlHelper.userBookUrl("get-wish", email),
      }),
      providesTags: ["get-wish"],
    }),
    getRead: builder.query({
      query: ({ email }: IParam) => ({
        url: urlHelper.userBookUrl("get-read", email),
      }),
      providesTags: ["get-read"],
    }),
    getFinish: builder.query({
      query: ({ email }: IParam) => ({
        url: urlHelper.userBookUrl("get-finish", email),
      }),
      providesTags: ["get-finish"],
    }),
    // get single
    getSingleWish: builder.query({
      query: ({ id, email }: IParam) => ({
        url: urlHelper.userBookUrl("get-wish", email, id),
      }),
      providesTags: ["get-single-wish"],
    }),
    getSingleRead: builder.query({
      query: ({ id, email }: IParam) => ({
        url: urlHelper.userBookUrl("get-read", email, id),
      }),
      providesTags: ["get-single-read"],
    }),
    getSingleFinish: builder.query({
      query: ({ id, email }: IParam) => ({
        url: urlHelper.userBookUrl("get-finish", email, id),
      }),
      providesTags: ["get-single-finish"],
    }),
    // add
    addWish: builder.mutation({
      query: ({ id, email }: IParam) => ({
        url: urlHelper.userBookUrl("add-wish"),
        method: "PATCH",
        body: { email, id },
      }),
      invalidatesTags: ["get-single-wish", "get-wish"],
    }),
    addRead: builder.mutation({
      query: ({ id, email }: IParam) => ({
        url: urlHelper.userBookUrl("add-read"),
        method: "PATCH",
        body: { email, id },
      }),
      invalidatesTags: ["get-single-read", "get-read"],
    }),
    addFinish: builder.mutation({
      query: ({ id, email }: IParam) => ({
        url: urlHelper.userBookUrl("add-finish"),
        method: "PATCH",
        body: { email, id },
      }),
      invalidatesTags: ["get-single-finish", "get-finish"],
    }),
  }),
});

export const {
  useAddWishMutation,
  useAddReadMutation,
  useAddFinishMutation,
  useGetSingleWishQuery,
  useGetSingleReadQuery,
  useGetSingleFinishQuery,
  useGetWishQuery,
  useGetReadQuery,
  useGetFinishQuery,
} = userBooksApi;
