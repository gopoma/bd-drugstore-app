import { createSlice } from '@reduxjs/toolkit';

const activeTipoEstadoPedido = {
  TipEstPedDes: '',
  TipEstPedEstReg: 'A',
};

export const tiposEstadoPedidoSlice = createSlice({
  name: 'tiposEstadoPedido',
  initialState: {
    tiposEstadoPedido: [],
    activeTipoEstadoPedido,
    selectedTiposEstadoPedido: [],
  },
  reducers: {
    onLoadTiposEstadoPedido: (state, { payload = [] }) => {
      state.tiposEstadoPedido = payload;
    },
    onAddNewTipoEstadoPedido: (state, { payload }) => {
      state.tiposEstadoPedido.push(payload);
      state.activeTipoEstadoPedido = { ...activeTipoEstadoPedido };
    },
    onSetActiveTipoEstadoPedido: (state, { payload }) => {
      state.activeTipoEstadoPedido = payload;
    },
    onToggleSelectTipoEstadoPedido: (state, { payload }) => {
      if (state.selectedTiposEstadoPedido.includes(payload)) {
        // eslint-disable-next-line
        state.selectedTiposEstadoPedido = state.selectedTiposEstadoPedido.filter((idTipoEstadoPedido) => idTipoEstadoPedido !== payload);
      } else {
        state.selectedTiposEstadoPedido.push(payload);
      }
    },
    onToggleAllTiposEstadoPedido: (state) => {
      if (state.selectedTiposEstadoPedido.length === state.tiposEstadoPedido.length) {
        state.selectedTiposEstadoPedido = [];
      } else {
        // eslint-disable-next-line
        state.selectedTiposEstadoPedido = state.tiposEstadoPedido.map((tipoEstadoPedido) => tipoEstadoPedido.TipEstPedCod);
      }
    },
    onCancelTiposEstadoPedido: (state) => {
      state.activeTipoEstadoPedido = { ...activeTipoEstadoPedido };
      state.selectedTiposEstadoPedido = [];
    },
    onCleanSelectedTiposEstadoPedido: (state) => {
      state.selectedTiposEstadoPedido = [];
    },
    onEditTipoEstadoPedido: (state, { payload }) => {
      state.tiposEstadoPedido = state.tiposEstadoPedido.map((tipoEstadoPedido) => {
        if (tipoEstadoPedido.TipEstPedCod === payload.TipEstPedCod) {
          return payload;
        }

        return tipoEstadoPedido;
      });

      state.activeTipoEstadoPedido = { ...activeTipoEstadoPedido };
    },
  },
});

export const {
  onLoadTiposEstadoPedido,
  onAddNewTipoEstadoPedido,
  onToggleSelectTipoEstadoPedido,
  onSetActiveTipoEstadoPedido,
  onCancelTiposEstadoPedido,
  onEditTipoEstadoPedido,
  onCleanSelectedTiposEstadoPedido,
  onToggleAllTiposEstadoPedido,
} = tiposEstadoPedidoSlice.actions;
