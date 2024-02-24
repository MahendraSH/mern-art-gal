import { UserType } from "@/types/user";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = import.meta.env.VITE_APP_API_URL;

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: api + "/user",
    credentials: "include", // Include credentials with requests
    timeout: 10000,
  }),
  reducerPath: "authApi",
  tagTypes: ["auth"],
  endpoints: (build) => ({
    getProfileDetails: build.query<UserType, void>({
      query: () => ({
        url: "/me",
      }),
      providesTags: ["auth"],
    }),
    loginUser: build.mutation<UserType, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: "/login",
        method: "POST",
        body: { email, password },
      }),
    }),
    registerUser: build.mutation<
      UserType,
      { email: string; password: string; userName: string }
    >({
      query: ({ email, password, userName }) => ({
        url: "/register",
        method: "POST",
        body: { email, password, userName },
      }),
    }),

    logoutUser: build.mutation<UserType, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useLogoutUserMutation,
  useGetProfileDetailsQuery,
} = authApi;
