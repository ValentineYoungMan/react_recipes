import React, { useEffect, useState } from 'react';
import s from './FullRecipe.module.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IsLiked, changeIsLiked } from '../../redux/reducers/recipesSlice';
import { categories } from '../../components/Categories/Categories';
import { RecipeItem } from '../../redux/reducers/newRecipeSlice';
import axios from 'axios';
import { fetchRecipes } from '../../redux/reducers/fetchSlice';
import like_icon from './../../assets/img/like.png';
import like_active from './../../assets/img/like_active.png';

const FullRecipe: React.FC = () => {
  const { id } = useParams();

  const [currentRecipe, setCurrentRecipe] = useState<RecipeItem>();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [like, setLike] = useState(currentRecipe?.isLiked);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const { data } = await axios.get('https://641f346cf228f1a83eb2a028.mockapi.io/items/' + id);
        
        setCurrentRecipe(data);
      } catch (error) {
        alert('error');
        navigate('/react_recipes');
      }
    }

    fetchRecipe();
  }, [like]);

  console.log(currentRecipe);

  const onChangeIsLiked = () => {
   
    const changedLike = !currentRecipe?.isLiked;

    axios
      .put(`https://641f346cf228f1a83eb2a028.mockapi.io/items/${id}`, {
        isLiked: changedLike,
      })
      .then((res) => {
        console.log(res.data);

        dispatch(changeIsLiked(changedLike));
        setLike(changedLike);
      })
      .catch((err) => console.log(err));

  };

  const onDeleteRecipe = () => {
    
    if (window.confirm('Are you sure you want to remove?')) {
      axios
        .delete(`https://641f346cf228f1a83eb2a028.mockapi.io/items/${id}`)
        .then((res) => {
          console.log(res);
          console.log('yeho');
          window.location.reload();
          window.location.pathname = '/react_recipes';
        })
        .catch((err) => console.log(err));
    }
  };

  if (currentRecipe) {
    return (
      <div className={s.container}>
        <div className={s.categories}>
          {' '}
          <span>{currentRecipe.categoryName}</span>
        </div>
        <div className={s.name}>{currentRecipe.name}</div>
        <div className={s.options}>
          <div className={s.weight}>{currentRecipe.weight} g</div>
          <div className={s.like} onClick={onChangeIsLiked}>
            <img className={s.img__like} src={currentRecipe.isLiked ? like_active : like_icon} />
          </div>
        </div>
       
        <div className={s.description}>{currentRecipe.description}</div>
        <div className={s.ingredients__title}>Ingrerdients</div>
        <ul className={s.ingredients}>
          {currentRecipe.ingredients.map((item, index) => {
            return (
              <li className={s.ingredient__item} key={index}>
                {item}
              </li>
            );
          })}
        </ul>
        <div className={s.description}>{currentRecipe.instruction}</div>
        <button className={s.delete} onClick={onDeleteRecipe}>
          Delete recipe
        </button>
      </div>
    );
  } else {
    return <>'loading'</>;
  }
};

export default FullRecipe;
