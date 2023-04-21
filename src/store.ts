import {
  configureStore,
  ConfigureStoreOptions,
} from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';
import { newsApi } from './api/newsApi';
import news from './features/news/NewsSlice';

export const createStore = (
  options?:
    | ConfigureStoreOptions['preloadedState']
    | undefined
) =>
  configureStore({
    reducer: {
      [newsApi.reducerPath]: newsApi.reducer,
      news,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        newsApi.middleware
      ),
    ...options,
  });

export const store = createStore();

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch =
  useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> =
  useSelector;
export type RootState = ReturnType<
  typeof store.getState
>;
export const useTypedSelector: TypedUseSelectorHook<RootState> =
  useSelector;
