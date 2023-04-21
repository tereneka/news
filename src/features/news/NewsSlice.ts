import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { NewsReqParams } from '../../types';

interface NewsState {
  reqParams: NewsReqParams;
  nextPage: number;
  keywords: string;
}

const initialState: NewsState = {
  reqParams: {
    endPoint: 'top-headlines',
    page: 1,
    category: 'general',
    country: 'us',
  },
  nextPage: 1,
  keywords: '',
};

const NewsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setNewsReqParams: (
      state,
      action: PayloadAction<{
        endPoint?: string;
        page?: number;
        category?: string;
        country?: string;
        q?: string;
      }>
    ) => {
      state.reqParams = {
        ...state.reqParams,
        ...action.payload,
      };
    },

    setNewsNextPage: (
      state,
      action: PayloadAction<number>
    ) => {
      state.nextPage = action.payload;
    },

    setNewsKeywords: (
      state,
      action: PayloadAction<string>
    ) => {
      state.keywords = action.payload;
    },
  },
});

export const {
  setNewsReqParams,
  setNewsNextPage,
  setNewsKeywords,
} = NewsSlice.actions;

export default NewsSlice.reducer;
