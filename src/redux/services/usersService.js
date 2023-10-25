import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENDPOINT, TOKEN } from "../../constants";
import Cookies from "js-cookie";

export const usersService = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: `${ENDPOINT}api/v1/`,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${Cookies.get(TOKEN)}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPortfolios: builder.query({
      query: (page) => `users?page=${page}`,
      transformResponse: (res) => res,
    }),
    getPortfolio: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: "GET",
      }),
    }),
    addPortfolio: builder.mutation({
      query: (body) => ({
        url: "users",
        method: "POST",
        body,
      }),
    }),
    updatePortfolio: builder.mutation({
      query: ({ id, body }) => ({
        url: `users/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deletePortfolio: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetPortfoliosQuery,
  useAddPortfolioMutation,
  useGetPortfolioMutation,
  useDeletePortfolioMutation,
  useUpdatePortfolioMutation,
} = usersService;

export default usersService.reducer;
