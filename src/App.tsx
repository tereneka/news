import { useEffect } from 'react';
import NewsList from './features/news/NewsList';
import { useGetNewsQuery } from './api/newsApi';
import { useLocation } from 'react-router-dom';
import {
  throttle,
  checkPosition,
} from './utils.ts/scroll';
import {
  useAppDispatch,
  useAppSelector,
} from './store';
import {
  setNewsNextPage,
  setNewsReqParams,
} from './features/news/NewsSlice';
import { endpoints } from './constants';
import Header from './features/header/Header';

function App() {
  const location = useLocation();

  const newsState = useAppSelector(
    (state) => state.news
  );

  const dispatch = useAppDispatch();

  const {
    data: news,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNewsQuery(newsState.reqParams);
  console.log(news);

  const shouldNewsLoad = !!(
    !isLoading &&
    news &&
    newsState.reqParams.page <
      Math.ceil(news?.totalResults / 10)
  );

  useEffect(() => {
    if (
      newsState.nextPage ===
      newsState.reqParams.page + 1
    ) {
      dispatch(
        setNewsReqParams({
          page: newsState.nextPage,
        })
      );
    }
  }, [newsState.nextPage]);

  useEffect(() => {
    if (location.pathname === '/') {
      dispatch(
        setNewsReqParams({
          endPoint: endpoints.top,
          page: 1,
          category: 'general',
          country: 'us',
          q: undefined,
        })
      );
    } else if (
      location.pathname.includes(endpoints.top)
    ) {
      dispatch(
        setNewsReqParams({
          endPoint: endpoints.top,
          page: 1,
          category:
            location.pathname.split('/')[2],
          country: 'us',
          q: undefined,
        })
      );
    } else if (
      location.pathname.includes(
        endpoints.everything
      )
    ) {
      dispatch(
        setNewsReqParams({
          endPoint: 'everything',
          page: 1,
          q: newsState.keywords
            .trim()
            .replaceAll(' ', '+'),
          category: undefined,
          country: undefined,
        })
      );
    }

    dispatch(setNewsNextPage(1));
  }, [location]);

  window.addEventListener(
    'scroll',
    throttle(
      () =>
        checkPosition(
          () =>
            dispatch(
              setNewsNextPage(
                newsState.reqParams.page + 1
              )
            ),
          shouldNewsLoad
        ),
      250
    )
  );

  window.addEventListener(
    'resize',
    throttle(
      () =>
        checkPosition(
          () =>
            dispatch(
              setNewsNextPage(
                newsState.reqParams.page + 1
              )
            ),
          shouldNewsLoad
        ),
      250
    )
  );

  return (
    <>
      <Header />

      <main>
        <NewsList data={news} />
      </main>
    </>
  );
}

export default App;
