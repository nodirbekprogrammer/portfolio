import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { TOKEN } from "../../constants";

const portfolioQuery = createApi({
  reducerPath: "portfolio",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ap-portfolio-backend.up.railway.app/api/v1/",
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${Cookies.get(TOKEN)}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPortfolios: builder.query({
      query: (params) => ({
        method: "GET",
        url: "portfolios",
        params,
      }),
      transformResponse: (res) => ({
        portfolios: res.data.map((el) => ({ ...el, key: el._id })),
        total: res.pagination.total,
      }),
    }),
    getPortfolio: builder.mutation({
      query: (id) => ({
        method: "GET",
        url: `portfolios/${id}`,
      }),
    }),
    createPortfolio: builder.mutation({
      query: (body) => ({
        method: "POST",
        url: "portfolios",
        body,
      }),
    }),
    updatePortfolio: builder.mutation({
      query: ({ id, body }) => ({
        method: "PUT",
        url: `portfolios/${id}`,
        body,
      }),
    }),
    deletePortfolio: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `portfolios/${id}`,
      }),
    }),
    uploadPhoto: builder.mutation({
      query: (body) => ({
        method: "POST",
        url: "upload",
        body,
      }),
    }),
  }),
});

const { reducer: portfolioReducer, reducerPath: portfolioName } =
  portfolioQuery;

export { portfolioQuery as default, portfolioReducer, portfolioName };

export const {
  useGetPortfoliosQuery,
  useCreatePortfolioMutation,
  useUploadPhotoMutation,
  useGetPortfolioMutation,
  useUpdatePortfolioMutation,
  useDeletePortfolioMutation,
} = portfolioQuery;
