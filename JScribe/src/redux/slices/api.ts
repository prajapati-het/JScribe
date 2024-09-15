import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CompilerSliceStateType } from "./compilerSlice";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
    credentials: "include"
  }),
  endpoints: (builder) => ({
    saveCode: builder.mutation<
      { url: string; status: string },
      CompilerSliceStateType["fullCode"]
    >({
      query: (fullCode) => {console.log(fullCode);return {
        url: "/compiler/save",
        method: "POST",
        body: fullCode,
      }},
    }),
    loadCode: builder.mutation({
      query: ({ urlId }) => ({
        url: `/compiler/load`,
        method: "POST",
        body: { urlId },
      }),
    }),
    login: builder.mutation<userInfoType, loginCredentialsType>({
      query: (body) => ({
        url: '/user/login',
        method: 'POST',
        body: body,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/user/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const { useSaveCodeMutation, useLoadCodeMutation, useLoginMutation, useLogoutMutation } = api;
