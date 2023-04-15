import React, {
  useEffect,
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

function App() {
  const location = useLocation();

  const pathname = location.pathname.slice(1);

  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(1);

  const newsCategory =
    pathname === 'business' ||
    pathname === 'sports' ||
    pathname === 'technology' ||
    pathname === 'health' ||
    pathname === 'science' ||
    pathname === 'entertainment'
      ? pathname
      : 'general';

  const {
    data: news,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNewsQuery({
    category: newsCategory,
    page,
  });

  const shouldNewsLoad = !!(
    !isLoading &&
    news &&
    page < Math.ceil(news?.totalResults / 10)
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

  useEffect(() => {
    if (nextPage === page + 1) {
      setPage(nextPage);
    }
  }, [nextPage]);

  window.addEventListener(
    'scroll',
    throttle(
      () =>
        checkPosition(
          () => setNextPage(page + 1),
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
          () => setNextPage(page + 1),
          shouldNewsLoad
        ),
      250
    )
  );

  return (
    <>
      <header>
        <Logo />

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
