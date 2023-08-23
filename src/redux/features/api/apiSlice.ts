import config from "@/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: config.baseUrl }),
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
