import config from "@/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: config.baseUrl,
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem("accessToken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "get-books",
    "get-single-books",
    "get-single-wish",
    "get-single-read",
    "get-single-finish",
    "get-wish",
    "get-read",
    "get-finish",
  ],
  endpoints: () => ({}),
});

export default api;
