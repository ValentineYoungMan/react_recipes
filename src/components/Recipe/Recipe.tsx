import React from 'react';
import s from './Recipe.module.scss';
import img from './../../assets/img/recipe1.webp';
import { RecipeItem } from '../../redux/reducers/newRecipeSlice';
import { Link } from 'react-router-dom';
import { categories } from '../Categories/Categories';

const Recipe: React.FC<RecipeItem> = ({
  id,
  //imageUrl,
  name,
  categoryName,
  weight,
  description,
  instruction,
  ingredients,
}) => {
  return (
    <Link to={`/recipe/${id}`} className={s.recipe}>
      <div className={s.info}>
        <div className={s.category}>
          <span>{categoryName}</span>
        </div>
        <div className={s.name}>{name}</div>
        <div className={s.text}>{description}</div>
        <div className={s.view}>VIEW</div>
      </div>
    </Link>
  );
};

export default Recipe;
