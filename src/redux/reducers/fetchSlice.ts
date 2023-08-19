import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RecipeItem } from './newRecipeSlice';
import axios from 'axios';
import { RootState } from '../store';

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface FetchSliceState {
  items: RecipeItem[];
  status: Status;
}

const initialState: FetchSliceState = {
  items: [],
  status: Status.LOADING, // loading | success | error
};

export type SearchRecipeParams = {
  category: string;
};

export const fetchRecipes = createAsyncThunk<RecipeItem[], SearchRecipeParams>(
  'fetch/fetchRecipesStatus',
  async (params) => {
    const { category } = params;
    const { data } = await axios.get<RecipeItem[]>(
      `https://641f346cf228f1a83eb2a028.mockapi.io/items?${category}`,
    );
    return data;
  },
);

export const fetchSlice = createSlice({
  name: 'fetch',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<RecipeItem[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRecipes.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchRecipes.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.items = action.payload;
    });
    builder.addCase(fetchRecipes.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const selectRecipeData = (state: RootState) => state.fetchSlice;

export const { setItems } = fetchSlice.actions;

export default fetchSlice.reducer;
