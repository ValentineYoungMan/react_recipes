import React from 'react';
import { useEffect } from 'react';
import s from './MainPage.module.scss';
import Recipe from '../../components/Recipe/Recipe';
import { useSelector } from 'react-redux';
import recipesSlice, {
  RecipeSliceState,
  selectRecipesSliceItems,
} from '../../redux/reducers/recipesSlice';
//import recipes from './../../assets/recipes.json';
import { RootState, useAppDispatch } from '../../redux/store';
import { fetchRecipes, selectRecipeData } from '../../redux/reducers/fetchSlice';
import { useNavigate } from 'react-router-dom';
import Categories from '../../components/Categories/Categories';

const MainPage: React.FC = () => {
  const { categoryValue } = useSelector(selectRecipesSliceItems);
  const navigate = useNavigate();
  const pathname = window.location.pathname;
  // console.log(categoryId);
  //console.log(navigate);
  //console.log(pathname);

  const dispatch = useAppDispatch();

  const { items, status } = useSelector(selectRecipeData);

  const getRecipes = async () => {
    const category = categoryValue != 'All' ? `categoryName=${categoryValue}` : '';

    dispatch(fetchRecipes({ category }));
  };

  useEffect(() => {
    getRecipes();
  }, [categoryValue]);

  return (
    <div className={s.recipes}>
      <Categories />
      <div className={s.container}>
        {items.map((item, index) => {
          return <Recipe key={index} {...item} />;
        })}
      </div>
    </div>
  );
};

export default MainPage;
