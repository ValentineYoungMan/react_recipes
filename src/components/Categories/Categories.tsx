import React, { useRef } from 'react';
import s from './Categories.module.scss';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectRecipesSliceItems,
  setCategoryId,
  setFilter,
  //  setFilteredCategoryRecipe,
} from '../../redux/reducers/recipesSlice';
import { selectNewRecipeParameters } from '../../redux/reducers/newRecipeSlice';

export const categories = [
  'All',
  'soup', //1
  'salad', //2
  'desert', //3
  'meat', //4
  'fish', //5
  'vegetarian', //6
  'bread', //7
  'bake', //8
  'rice', //9
  'coctail', //10
  'noodles', //11
];

const Categories: React.FC = () => {
  const dispatch = useDispatch();

  const { categoryValue } = useSelector(selectRecipesSliceItems);
  //console.log(categoryId);
  console.log(categoryValue);

  const onChooseCategory = (item: string) => {
    dispatch(setCategoryId(item));
  };
  //console.log('qs');
  return (
    <div className={s.categories}>
      <ul className={s.categories__container}>
        {categories.map((item, index) => {
          return (
            <li
              className={
                item == categoryValue
                  ? `${s.categories__item} ${s.categories__item__active}`
                  : s.categories__item
              }
              key={index}
              onClick={() => onChooseCategory(item)}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
