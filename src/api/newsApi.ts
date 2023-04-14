import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

interface NewsResponse {
  status: 'ok' | 'error';
  totalResults: number;
  articles: {
    source: {
      id: string | null;
      name: string;
    };
    author: string;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
  }[];
}

const BASE_URL = 'https://newsapi.org/v2/';
const API_KEY =
  'd9d4d99ddb8440de8d944951bd90e482';

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
  }),
  endpoints: (builder) => ({
    getTopNews: builder.query<
      NewsResponse,
      string | void
    >({
      query: (country) =>
        `top-headlines?apiKey=${API_KEY}&country=${
          country || 'ru'
        }`,
    }),
  }),
});

export const { useGetTopNewsQuery } = newsApi;
