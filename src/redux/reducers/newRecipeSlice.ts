import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type RecipeItem = {
  id: string;
  // imageUrl: string;
  name: string;
  categoryName: string;
  weight: number;
  description: string;
  instruction: string;
  ingredients: string[];
  isLiked: boolean;
};

const initialState: RecipeItem = {
  id: String((Math.random() * 100000).toFixed(0)),
  // imageUrl: '',
  name: '',
  categoryName: 'Choose one',
  weight: 0,
  description: '',
  instruction: '',
  ingredients: [],
  isLiked: false,
};

const newRecipeSlice = createSlice({
  name: 'newRecipe',
  initialState,
  reducers: {
    //addRecipe(state, action: PayloadAction<RecipeItem>) {
    //  state.recipes = [...state.recipes, action.payload];
    //  //console.log(state.recipes);
    //},
    setCategory(state, action: PayloadAction<string>) {
      state.categoryName = action.payload;
    },
    addIngredient(state, action: PayloadAction<string>) {
      state.ingredients = [...state.ingredients, action.payload];
    },
    removeIngredient(state, action: PayloadAction<string>) {
      state.ingredients = state.ingredients.filter((item) => item != action.payload);
    },
  },
});

export const selectNewRecipeParameters = (state: RootState) => state.newRecipeSlice;

export const { setCategory, addIngredient, removeIngredient } = newRecipeSlice.actions;

export default newRecipeSlice.reducer;
