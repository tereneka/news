import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { NewsData } from '../types';

type NewsCategoty =
  | 'business'
  | 'entertainment'
  | 'general'
  | 'health'
  | 'science'
  | 'sports'
  | 'technology';

const BASE_URL = 'https://newsapi.org/v2/';
const API_KEY =
  'd9d4d99ddb8440de8d944951bd90e482';

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
  }),
  endpoints: (builder) => ({
    getNews: builder.query<
      NewsData,
      {
        category: NewsCategoty;
        country?: string;
      }
    >({
      query: ({ category, country }) =>
        `top-headlines?apiKey=${API_KEY}&category=${category}${
          country
            ? '&country=' + country
            : '&country=us'
        }`,
    }),
  }),
});

export const { useGetNewsQuery } = newsApi;
