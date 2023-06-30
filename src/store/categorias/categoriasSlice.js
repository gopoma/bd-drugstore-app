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
    selectedCategorias: [],
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
    onToggleSelectCategoria: (state, { payload }) => {
      if (state.selectedCategorias.includes(payload)) {
        // eslint-disable-next-line
        state.selectedCategorias = state.selectedCategorias.filter((idCategoria) => idCategoria !== payload);
      } else {
        state.selectedCategorias.push(payload);
      }
    },
    onToggleAllCategorias: (state) => {
      if (state.selectedCategorias.length === state.categorias.length) {
        state.selectedCategorias = [];
      } else {
        state.selectedCategorias = state.categorias.map((categoria) => categoria.CatCod);
      }
    },
    onCancelCategorias: (state) => {
      state.activeCategoria = { ...activeCategoria };
      state.selectedCategorias = [];
    },
    onCleanSelectedCategorias: (state) => {
      state.selectedCategorias = [];
    },
    onEditCategoria: (state, { payload }) => {
      state.categorias = state.categorias.map((categoria) => {
        if (categoria.CatCod === payload.CatCod) {
          return payload;
        }

        return categoria;
      });

      state.activeCategoria = { ...activeCategoria };
    },
  },
});

export const {
  onLoadCategorias,
  onAddNewCategoria,
  onToggleSelectCategoria,
  onSetActiveCategoria,
  onCancelCategorias,
  onEditCategoria,
  onCleanSelectedCategorias,
  onToggleAllCategorias,
} = categoriasSlice.actions;
