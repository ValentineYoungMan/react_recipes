import fetchSlice from './reducers/fetchSlice';
import { configureStore } from '@reduxjs/toolkit';
import recipesSlice from './reducers/recipesSlice';
import newRecipeSlice from './reducers/newRecipeSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    recipesSlice,
    fetchSlice,
    newRecipeSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
