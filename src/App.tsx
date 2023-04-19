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
} from 'react-router-dom';
import {
  throttle,
  checkPosition,
} from './utils.ts/scroll';
import { NewsCategoty } from './types';
import { keyboard } from '@testing-library/user-event/dist/keyboard';

function App() {
  const location = useLocation();

  const pathname = location.pathname.slice(1);

  const defaultReqParams = {
    endPoint: 'top-headlines',
    page: 1,
    category: pathname || 'general',
    country: 'us',
  };

  const [reqParams, setReqParams] = useState<{
    endPoint: string;
    category?: string;
    page: number;
    country?: string;
    q?: string;
  }>(defaultReqParams);

  const [nextPage, setNextPage] = useState(1);

  const [keywords, setKeywords] = useState('');

  const {
    data: news,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNewsQuery(reqParams);
  console.log(news, keywords);

  const shouldNewsLoad = !!(
    !isLoading &&
    news &&
    reqParams.page <
      Math.ceil(news?.totalResults / 10)
  );

  const routes = [
    {
      path: '/',
      linkText: 'главные',
    },
    {
      path: '/business',
      linkText: 'бизнесс',
    },
    {
      path: '/sports',
      linkText: 'спорт',
    },
    {
      path: '/technology',
      linkText: 'технологии',
    },
    {
      path: '/health',
      linkText: 'здоровье',
    },
    {
      path: '/science',
      linkText: 'наука',
    },
    {
      path: '/entertainment',
      linkText: 'развлечения',
    },
  ];

  function searchKeywords() {
    if (keywords) {
      setReqParams({
        endPoint: 'everything',
        page: 1,
        q: keywords.trim().replaceAll(' ', '+'),
        category: undefined,
        country: undefined,
      });
    }
  }

  useEffect(() => {
    if (nextPage === reqParams.page + 1) {
      setReqParams({
        ...reqParams,
        page: nextPage,
      });
    }
  }, [nextPage]);

  useEffect(() => {
    setReqParams({
      ...reqParams,
      category: pathname || 'general',
      page: 1,
    });
    setNextPage(1);
  }, [location]);

  useEffect(() => {
    if (!keywords) {
      setReqParams(defaultReqParams);
    }
  }, [keywords]);

  window.addEventListener(
    'scroll',
    throttle(
      () =>
        checkPosition(
          () => setNextPage(reqParams.page + 1),
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
          () => setNextPage(reqParams.page + 1),
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

          <div className='search'>
            <input
              className='search__input'
              value={keywords}
              onChange={(e) =>
                setKeywords(e.target.value)
              }
              type='text'
            />

            <button
              className='btn btn_icon_x-circle btn_size_s search__x-btn'
              onClick={() => setKeywords('')}
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
