import { configureStore } from '@reduxjs/toolkit';
import { categoriasSlice } from './categorias/categoriasSlice';
import { laboratoriosSlice } from './laboratorios/laboratoriosSlice';

export const store = configureStore({
  reducer: {
    categorias: categoriasSlice.reducer,
    laboratorios: laboratoriosSlice.reducer,
  },
});
