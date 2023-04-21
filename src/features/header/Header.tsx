import React from 'react';
import {
  NavLink,
  useNavigate,
} from 'react-router-dom';
import Logo from '../../components/Logo';
import {
  useAppSelector,
  useAppDispatch,
} from '../../store';
import { setNewsKeywords } from '../news/NewsSlice';
import { endpoints } from '../../constants';

export default function Header() {
  const newsState = useAppSelector(
    (state) => state.news
  );

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const routes = [
    {
      path: '/',
      linkText: 'general',
    },
    {
      path: `/${endpoints.top}/business`,
      linkText: 'business',
    },
    {
      path: `/${endpoints.top}/sports`,
      linkText: 'sports',
    },
    {
      path: `/${endpoints.top}/technology`,
      linkText: 'technology',
    },
    {
      path: `/${endpoints.top}/health`,
      linkText: 'health',
    },
    {
      path: `/${endpoints.top}/science`,
      linkText: 'science',
    },
    {
      path: `/${endpoints.top}/entertainment`,
      linkText: 'entertainment',
    },
  ];

  function searchKeywords() {
    if (newsState.keywords) {
      navigate('/everything');
    }
  }

  return (
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
            onClick={() =>
              dispatch(setNewsKeywords(''))
            }
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
            {route.linkText}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
