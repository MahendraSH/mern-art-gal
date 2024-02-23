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
  endpoints: (build) => ({
    loginUser: build.mutation<UserType, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: "/login",
        method: "POST",
        body: { email, password },
        invalidatesTags: ["profile"],
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
        invalidatesTags: ["profile"],
      }),
    }),

    logoutUser: build.mutation<UserType, null>({
      query: () => ({
        url: "/logout",
        method: "POST",
        invalidatesTags: ["profile"],
      }),
    }),
    getProfileDetails: build.query<UserType, null>({
      query: () => ({
        url: "/me",

        providesTags: ["profile"],
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useLogoutUserMutation,
  useGetProfileDetailsQuery,
} = authApi;
