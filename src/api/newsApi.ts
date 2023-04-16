import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { NewsData } from '../types';

// type NewsCategoty =
//   | 'business'
//   | 'entertainment'
//   | 'general'
//   | 'health'
//   | 'science'
//   | 'sports'
//   | 'technology';
type NewsCategoty =
  | 'business'
  | 'entertainment'
  | 'environment'
  | 'food'
  | 'health'
  | 'politics'
  | 'science'
  | 'sports'
  | 'technology'
  | 'top'
  | 'tourism'
  | 'world';

const BASE_URL = 'https://newsdata.io/api/1/news';
const API_KEY =
  'pub_2056887da2326a20dade75d6762885111ff3c';
// const BASE_URL = 'https://newsapi.org/v2/';
// const API_KEY =
//   'd9d4d99ddb8440de8d944951bd90e482';

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
  }),
  endpoints: (builder) => ({
    getNews: builder.query<
      NewsData,
      {
        page?: string;
        country?: string;
        category?: NewsCategoty;
      }
    >({
      query: ({ category, page, country }) =>
        `?apikey=${API_KEY}&country=${
          country || 'ru'
        }&category=${category || 'top'}${
          page ? `&page=${page}` : ''
        }`,
      // Only have one cache entry because the arg always maps to one string
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newData, args) => {
        if (args.arg.page) {
          currentCache.results.push(
            ...newData.results
          );
        } else {
          currentCache.results = newData.results;
        }
        currentCache.status = newData.status;
        currentCache.totalResults =
          newData.totalResults;
        currentCache.nextPage = newData.nextPage;
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
  }),
});
// export const newsApi = createApi({
//   reducerPath: 'newsApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: `${BASE_URL}`,
//   }),
//   endpoints: (builder) => ({
//     getNews: builder.query<
//       NewsData,
//       {
//         category: NewsCategoty;
//         page?: number;
//         country?: string;
//       }
//     >({
//       query: ({ category, page, country }) =>
//         `top-headlines?apiKey=${API_KEY}&category=${category}${
//           country
//             ? '&country=' + country
//             : '&country=us'
//         }&pageSize=10&page=${page || 1}`,
//       // Only have one cache entry because the arg always maps to one string
//       serializeQueryArgs: ({ endpointName }) => {
//         return endpointName;
//       },
//       // Always merge incoming data to the cache entry
//       merge: (currentCache, newData, args) => {
//         if (args.arg.page !== 1) {
//           currentCache.articles.push(
//             ...newData.articles
//           );
//         } else {
//           currentCache.articles =
//             newData.articles;
//         }
//         currentCache.status = newData.status;
//         currentCache.totalResults =
//           newData.totalResults;
//       },
//       // Refetch when the page arg changes
//       forceRefetch({ currentArg, previousArg }) {
//         return currentArg !== previousArg;
//       },
//     }),
//   }),
// });

export const { useGetNewsQuery } = newsApi;
