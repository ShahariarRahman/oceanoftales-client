import config from "@/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: config.baseUrl }),
  tagTypes: [""],
  endpoints: () => ({}),
});

export default api;
