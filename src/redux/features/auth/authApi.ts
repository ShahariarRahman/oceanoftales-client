import api from "../api/apiSlice";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: "/auth/sign-up",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    signIn: builder.mutation({
      query: (data) => ({
        url: "/auth/sign-in",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    signOut: builder.mutation({
      query: () => ({
        url: "/auth/sign-out",
        method: "POST",
        body: {},
        credentials: "include",
      }),
    }),
    authState: builder.query({
      query: () => ({
        url: "/auth/state",
        method: "GET",
        // credentials: "include",
      }),
    }),
    genAccessToken: builder.mutation({
      query: () => ({
        url: "/auth/refresh-token",
        method: "POST",
        body: {},
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useSignOutMutation,
  useAuthStateQuery,
  useGenAccessTokenMutation,
} = authApi;
