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
  categoryValue: 'All',
  isLiked: false,
};

const recipesSlice = createSlice({
  name: 'recipesSlice',
  initialState,
  reducers: {
    changeIsLiked(state, action: PayloadAction<boolean>) {
      state.isLiked = action.payload;
    },
    setCategoryId(state, action: PayloadAction<string>) {
      state.categoryValue = action.payload;
    },
  },
});

export const selectRecipesSliceItems = (state: RootState) => state.recipesSlice;

export const {
  changeIsLiked,
  setCategoryId,
} = recipesSlice.actions;

export default recipesSlice.reducer;
