import React from 'react';
import s from './Header.module.scss';
import logo from './../../assets/img/logo.png';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import { fetchRecipes } from '../../redux/reducers/fetchSlice';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();

  const onClickHome = () => {
    const category = '';
    dispatch(fetchRecipes({ category }));
  };

  return (
    <div className={s.header}>
      <div className={s.header__container}>
        <div className={s.logo}>
          <img src={logo} />
        </div>
        <ul className={s.nav}>
          <Link to="/" onClick={onClickHome} className={s.nav__item}>
            Home
          </Link>
        </ul>
        <Link to="/newRecipe" className={s.button}>
          Add Recipe
        </Link>
      </div>
    </div>
  );
};

export default Header;
