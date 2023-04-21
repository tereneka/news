import React, {
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import Logo from './components/Logo';
import NewsList from './features/news/NewsList';
import { useGetNewsQuery } from './api/newsApi';
import {
  NavLink,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import {
  throttle,
  checkPosition,
} from './utils.ts/scroll';
import {
  NewsCategoty,
  NewsReqParams,
} from './types';
import {
  useAppDispatch,
  useAppSelector,
} from './store';
import {
  setNewsKeywords,
  setNewsNextPage,
  setNewsReqParams,
} from './features/news/NewsSlice';

function App() {
  const location = useLocation();

  const navigate = useNavigate();

  const endpoints = {
    top: 'top-headlines',
    everything: 'everything',
  };

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

  const routes = [
    {
      path: '/',
      linkText: 'главные',
    },
    {
      path: '/' + endpoints.top + '/business',
      linkText: 'бизнесс',
    },
    {
      path: '/' + endpoints.top + '/sports',
      linkText: 'спорт',
    },
    {
      path: '/' + endpoints.top + '/technology',
      linkText: 'технологии',
    },
    {
      path: '/' + endpoints.top + '/health',
      linkText: 'здоровье',
    },
    {
      path: '/' + endpoints.top + '/science',
      linkText: 'наука',
    },
    {
      path:
        '/' + endpoints.top + '/entertainment',
      linkText: 'развлечения',
    },
  ];

  function searchKeywords() {
    if (newsState.keywords) {
      navigate('/everything');
    }
  }

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
      <header className='header'>
        <div className='header__logo-search-container'>
          <Logo />

          <div className='search header__search'>
            <input
              className='search__input'
              value={newsState.keywords}
              onChange={(e) =>
                dispatch(
                  setNewsKeywords(e.target.value)
                )
              }
              type='text'
            />

            <button
              className='btn btn_icon_x-circle btn_size_s search__x-btn'
              onClick={() => {
                dispatch(setNewsKeywords(''));
              }}
            />

            <button
              className='btn btn_icon_search btn_size_m search__search-btn'
              onClick={searchKeywords}
            />
          </div>
        </div>

        <nav className='menu'>
          {routes.map((route) => (
            <NavLink
              to={route.path}
              className={({ isActive }) =>
                `menu__link ${
                  isActive
                    ? 'menu__link_active'
                    : ''
                }`
              }
              key={route.path}>
              {route.path.slice(1) || 'general'}
            </NavLink>
          ))}
        </nav>
      </header>

      <main>
        <NewsList data={news} />
      </main>
    </>
  );
}

export default App;
