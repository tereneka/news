import React from 'react';
import Logo from './components/Logo';
import NewsList from './features/news/NewsList';
import { useGetNewsQuery } from './api/newsApi';
import {
  NavLink,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';

function App() {
  const location = useLocation();

  const pathname = location.pathname.slice(1);

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
  } = useGetNewsQuery({ category: newsCategory });

  console.log(news);

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
