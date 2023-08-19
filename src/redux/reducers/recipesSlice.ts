import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import recipes from '../../../src/assets/recipes.json';
import { RootState } from '../store';

export interface RecipeSliceState {
  categoryValue: string;
  isLiked: boolean;
}

export type IsLiked = {
  id: string;
  isLiked: boolean;
};

export type setFilter = {
  id: number;
};

const initialState: RecipeSliceState = {
  //   recipes,
  //   newRecipe,
  //   filteredCategoryRecipe: [],
  categoryValue: 'All',
  isLiked: false,
};

const recipesSlice = createSlice({
  name: 'recipesSlice',
  initialState,
  reducers: {
    // addRecipe(state, action: PayloadAction<RecipeItem>) {
    //   state.recipes = [...state.recipes, action.payload];
    //   //console.log(state.recipes);
    // },
    // changeName(state, action: PayloadAction<string>) {
    //   state.newRecipe.name = action.payload;
    // },
    // addImg(state, action: PayloadAction<string>) {
    //   state.newRecipe.imageUrl = action.payload;
    // },
    // addDescription(state, action: PayloadAction<string>) {
    //   state.newRecipe.description = action.payload;
    // },
    // addInstruction(state, action: PayloadAction<string>) {
    //   state.newRecipe.instruction = action.payload;
    // },
    // setCategory(state, action: PayloadAction<number>) {
    //   state.newRecipe.category = action.payload;
    // },
    // addIngredient(state, action: PayloadAction<string>) {
    //   state.newRecipe.ingredients = [...state.newRecipe.ingredients, action.payload];
    // },
    // removeIngredient(state, action: PayloadAction<string>) {
    //   state.newRecipe.ingredients = state.newRecipe.ingredients.filter(
    //     (item) => item != action.payload,
    //   );
    // },
    changeIsLiked(state, action: PayloadAction<boolean>) {
      state.isLiked = action.payload;
    },
    // deleteRecipe(state, action: PayloadAction<RecipeItem[]>) {
    //   state.recipes = action.payload;
    // },
    // chooseCategory(state, action: PayloadAction<RecipeItem[]>) {
    //   state.recipes = action.payload;
    // },
    setCategoryId(state, action: PayloadAction<string>) {
      state.categoryValue = action.payload;
    },
  },
});

export const selectRecipesSliceItems = (state: RootState) => state.recipesSlice;

export const {
  //   addRecipe,
  //   changeName,
  //   addImg,
  //   addDescription,
  //   addInstruction,
  //   setCategory,
  //   addIngredient,
  //   removeIngredient,
  changeIsLiked,
  //   deleteRecipe,
  setCategoryId,
} = recipesSlice.actions;

export default recipesSlice.reducer;
