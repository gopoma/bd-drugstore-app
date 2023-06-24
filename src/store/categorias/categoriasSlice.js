import { createSlice } from '@reduxjs/toolkit';

const activeCategoria = {
  CatDes: '',
  CatEstReg: 'A',
};

export const categoriasSlice = createSlice({
  name: 'categorias',
  initialState: {
    categorias: [],
    activeCategoria,
  },
  reducers: {
    onLoadCategorias: (state, { payload = [] }) => {
      state.categorias = payload;
    },
    onAddNewCategoria: (state, { payload }) => {
      state.categorias.push(payload);
      state.activeCategoria = { ...activeCategoria };
    },
    onSetActiveCategoria: (state, { payload }) => {
      state.activeCategoria = payload;
    },
  },
});

export const {
  onSetActiveCategoria,
  onAddNewCategoria,
  onLoadCategorias,
} = categoriasSlice.actions;
