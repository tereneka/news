import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import {
  NewsCategoty,
  NewsData,
  NewsReqParams,
} from '../types';

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
      NewsReqParams
    >({
      query: ({
        endPoint,
        category,
        page,
        country,
        q,
      }) =>
        `${endPoint}?apiKey=${API_KEY}${
          category ? '&category=' + category : ''
        }${country ? '&country=' + country : ''}${
          q ? '&q=' + q : ''
        }&pageSize=10&page=${page || 1}`,
      // Only have one cache entry because the arg always maps to one string
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newData, args) => {
        if (args.arg.page !== 1) {
          currentCache.articles.push(
            ...newData.articles
          );
        } else {
          currentCache.articles =
            newData.articles;
        }
        currentCache.status = newData.status;
        currentCache.totalResults =
          newData.totalResults;
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),

    // getNews: builder.query<
    //   NewsData,
    //   {
    //     category: NewsCategoty;
    //     page?: number;
    //     country?: string;
    //   }
    // >({
    //   query: ({ category, page, country }) =>
    //     `top-headlines?apiKey=${API_KEY}&category=${category}${
    //       country
    //         ? '&country=' + country
    //         : '&country=us'
    //     }&pageSize=10&page=${page || 1}`,
    // }),
  }),
});

export const { useGetNewsQuery } = newsApi;
