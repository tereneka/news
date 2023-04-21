import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../components/Logo';

export default function Header() {
  return (
    <></>
    // <header className='header'>
    //   <div className='header__logo-search-container'>
    //     <Logo />

    //     <div className='search header__search'>
    //       <input
    //         className='search__input'
    //         value={keywords}
    //         onChange={(e) =>
    //           setKeywords(e.target.value)
    //         }
    //         type='text'
    //       />

    //       <button
    //         className='btn btn_icon_x-circle btn_size_s search__x-btn'
    //         onClick={() => setKeywords('')}
    //       />

    //       <button
    //         className='btn btn_icon_search btn_size_m search__search-btn'
    //         onClick={searchKeywords}
    //       />
    //     </div>
    //   </div>

    //   <nav className='menu'>
    //     {routes.map((route) => (
    //       <NavLink
    //         to={route.path}
    //         className={({ isActive }) =>
    //           `menu__link ${
    //             isActive
    //               ? 'menu__link_active'
    //               : ''
    //           }`
    //         }
    //         key={route.path}>
    //         {route.path.slice(1) || 'general'}
    //       </NavLink>
    //     ))}
    //   </nav>
    // </header>
  );
}
