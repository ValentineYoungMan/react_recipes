import React, { useState, useRef, useEffect } from 'react';
import s from './CreatingRecipe.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { categories } from '../../components/Categories/Categories';
import {
  RecipeItem,
  addIngredient,
  removeIngredient,
  selectNewRecipeParameters,
  setCategory,
} from '../../redux/reducers/newRecipeSlice';
import axios from 'axios';

const categoriesForNewRecipe = [...categories];
categoriesForNewRecipe.shift();
categoriesForNewRecipe.unshift('Choose one');

const CreatingRecipe: React.FC = () => {
  const dispatch = useDispatch();
  const { id, categoryName, ingredients } = useSelector(selectNewRecipeParameters);


  const [categoryActive, setCategoryActive] = useState(categoriesForNewRecipe[0]);
  const [open, setOpen] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const weightRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const instructionRef = useRef<HTMLTextAreaElement>(null);
  const ingredientRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<object>();

  const reqiure = 'This field must be filled';

  const [nameValue, setNameValue] = useState('');
  const [weightValue, setWeightValue] = useState('');
  const [descValue, setDescValue] = useState('');
  const [newIngValue, setNewIngValue] = useState('');
  const [instValue, setInstValue] = useState('');
  const [addIngItemValue, setAddIngItemValue] = useState('');

  const [nameDirty, setNameDirty] = useState(false);
  const [weightDirty, setWeightDirty] = useState(false);
  const [descDirty, setDescDirty] = useState(false);
  const [newIngDirty, setNewIngDirty] = useState('');
  const [instDirty, setInstDirty] = useState(false);
  const [addIngDirty, setAddIngDirty] = useState(false);
  const [categoryDirty, setCategoryDirty] = useState(false);

  const [nameError, setNameError] = useState(reqiure);
  const [weightError, setWeightError] = useState(reqiure);
  const [descError, setDescError] = useState(reqiure);
  const [newIngError, setNewIngError] = useState(reqiure);
  const [instError, setInstError] = useState(reqiure);

  const [categoryError, setCategoryError] = useState(true);
  const [ingredientsEror, setIngredientsError] = useState(reqiure);

  const [formValid, setFormValid] = useState(false);
  const [submitState, setSubmitState] = useState(true);

  useEffect(() => {
    if (nameError || weightError || descError || instError || categoryError || ingredientsEror) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [nameError, weightError, descError, instError, categoryError, ingredientsEror]);

  const blurHandler = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    switch (e.target.name) {
      case 'name':
        setNameDirty(true);
        break;
      case 'weight':
        setWeightDirty(true);
        break;
      case 'description':
        setDescDirty(true);
        break;
      case 'instruction':
        setInstDirty(true);
        break;
    }
  };

  const onClickListCategory = (i: number) => {
    setOpen(false);
    setCategoryActive(categoriesForNewRecipe[i]);
    dispatch(setCategory(categoriesForNewRecipe[i]));

    if (categoriesForNewRecipe[i] == 'Choose one') {
      setCategoryError(true);
    } else {
      setCategoryError(false);
    }

  };
  const onChangeInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
    if (e.target.value && e.target.value.trim() != '') {
      setNameError('');
    } else {
      setNameError(reqiure);
    }
  };
  const onChangeInputWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/\D+/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    setWeightValue(value);
    if (value && value.trim() != '') {
      setWeightError('');
    } else {
      setWeightError(reqiure);
    }
  };

  const createDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescValue(e.target.value);
    if (e.target.value && e.target.value.trim() != '') {
      setDescError('');
    } else {
      setDescError(reqiure);
    }
  };
  const createInstruction = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInstValue(e.target.value);
    if (e.target.value && e.target.value.trim() != '') {
      setInstError('');
    } else {
      setInstError(reqiure);
    }
  };

  const onChangeIngItemValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddIngItemValue(e.target.value);
  };

  const addNewIngredient = () => {
    if (ingredientRef && ingredientRef.current) {
      if (ingredientsEror) {
        setIngredientsError('');
      }
      dispatch(addIngredient(addIngItemValue));

      ingredientRef.current.value = '';
      setAddIngItemValue('');
    }
  };

  const removeNewIngredient = (item: string) => {
    if (!ingredientsEror && ingredients.length == 1) {
      setIngredientsError(reqiure);
      setAddIngDirty(true);
    }
    dispatch(removeIngredient(item));
  };

  const onClickAdd = () => {
    if (submitState) {
      const item: RecipeItem = {
        id: String((Math.random() * 100000).toFixed(0)),
        name: String(nameRef.current?.value),
        categoryName,
        weight: Number(weightValue),
        description: String(descriptionRef.current?.value),
        instruction: String(instructionRef.current?.value),
        ingredients: ingredients,
        isLiked: false,
      };
      setSubmitState(false);

      axios
        .post('https://641f346cf228f1a83eb2a028.mockapi.io/items/', item)
        .then((res) => {
          console.log(res);
          console.log('yeeeeaaaaa');

          window.location.reload();
          window.location.pathname = '/react_recipes';
        })
        .catch((err) => console.log(err));
      console.log('clickkk');
    }
  };

  return (
    <div className={s.mainBlock}>
      <div className="container">
        <form className={s.form}>
          <div className={s.inputName}>
            <div className={s.name}>Name</div>
            {nameDirty && nameError && <div className={s.error}>{nameError}</div>}
            <input
              ref={nameRef}
              type="text"
              name="name"
              value={nameValue}
              className={s.input}
              onChange={(e) => onChangeInputName(e)}
              onBlur={(e) => blurHandler(e)}
            />
          </div>
          <div className={s.inputName}>
            <div className={s.name}>Weight (g)</div>
            {weightDirty && weightError && <div className={s.error}>{weightError}</div>}
            <input
              ref={weightRef}
              type="number"
              name="weight"
              //maxLength={3}
              value={weightValue}
              className={`${s.input} ${s.input__number}`}
              onChange={(e) => onChangeInputWeight(e)}
              onBlur={(e) => blurHandler(e)}
            />
          </div>
          <div className={s.descpiption}>
            <div className={s.descpiption__title}>Description</div>
            {descDirty && descError && <div className={s.error}>{descError}</div>}
            <textarea
              ref={descriptionRef}
              onChange={(e) => createDescription(e)}
              name="description"
              value={descValue}
              onBlur={(e) => blurHandler(e)}
              className={s.textarea}></textarea>
          </div>
          <div className={s.descpiption__title}>Category</div>
          <div className={s.select}>
            <div className={s.select__header} onClick={() => setOpen(!open)}>
              <div
                className={
                  categoryActive == 'Choose one'
                    ? `${s.select__current} ${s.select__current__disabled}`
                    : s.select__current
                }>
                {categoryActive}
              </div>
              <div className={s.triangle}>&#9662;</div>
            </div>
            {open && (
              <div className={s.select__body}>
                {categoriesForNewRecipe.map((item, i) => {
                  return (
                    <div
                      key={i}
                      className={
                        i == 0 ? `${s.select__item__disabled} ${s.select__item}` : s.select__item
                      }
                      onClick={() => onClickListCategory(i)}>
                      {item}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className={s.inputName}>
            <div className={s.name}>Ingredients</div>
            <input
              ref={ingredientRef}
              type="text"
              value={addIngItemValue}
              onChange={(e) => onChangeIngItemValue(e)}
              className={s.input}
            />

            <input
              type="button"
              className={`${s.button} ${s.adding}`}
              value="Add item"
              onClick={addNewIngredient}
              disabled={!addIngItemValue || addIngItemValue.trim() == ''}
            />

            <div className={s.ingredients__container}>
              {addIngDirty && ingredientsEror && <div className={s.error}>{ingredientsEror}</div>}
              {ingredients.map((item, i) => {
                return (
                  <div key={i} className={s.ingredients__item}>
                    <div className={s.ingredients__name}>{item}</div>
                    <input
                      type="button"
                      className={s.ingredients__delete}
                      value="x"
                      onClick={() => removeNewIngredient(item)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className={s.descpiption}>
            <div className={s.descpiption__title}>Instruction</div>
            {instDirty && instError && <div className={s.error}>{instError}</div>}
            <textarea
              ref={instructionRef}
              onChange={(e) => createInstruction(e)}
              name="instruction"
              value={instValue}
              onBlur={(e) => blurHandler(e)}
              className={s.textarea}></textarea>
          </div>
        </form>
        <button disabled={!formValid} className={`${s.button} ${s.submit}`} onClick={onClickAdd}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreatingRecipe;
