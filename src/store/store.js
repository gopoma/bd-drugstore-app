import { configureStore } from '@reduxjs/toolkit';
import { categoriasSlice } from './categorias/categoriasSlice';

export const store = configureStore({
  reducer: {
    categorias: categoriasSlice.reducer,
  },
});
