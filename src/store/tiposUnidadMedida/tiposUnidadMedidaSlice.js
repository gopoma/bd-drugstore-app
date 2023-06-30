import { createSlice } from '@reduxjs/toolkit';

const activeTipoUnidadMedida = {
  TipUniMedDes: '',
  TipUniMedEstReg: 'A',
};

export const tiposUnidadMedidaSlice = createSlice({
  name: 'tiposUnidadMedida',
  initialState: {
    tiposUnidadMedida: [],
    activeTipoUnidadMedida,
    selectedTiposUnidadMedida: [],
  },
  reducers: {
    onLoadTiposUnidadMedida: (state, { payload = [] }) => {
      state.tiposUnidadMedida = payload;
    },
    onAddNewTipoUnidadMedida: (state, { payload }) => {
      state.tiposUnidadMedida.push(payload);
      state.activeTipoUnidadMedida = { ...activeTipoUnidadMedida };
    },
    onSetActiveTipoUnidadMedida: (state, { payload }) => {
      state.activeTipoUnidadMedida = payload;
    },
    onToggleSelectTipoUnidadMedida: (state, { payload }) => {
      if (state.selectedTiposUnidadMedida.includes(payload)) {
        // eslint-disable-next-line
        state.selectedTiposUnidadMedida = state.selectedTiposUnidadMedida.filter((idTipoUnidadMedida) => idTipoUnidadMedida !== payload);
      } else {
        state.selectedTiposUnidadMedida.push(payload);
      }
    },
    onToggleAllTiposUnidadMedida: (state) => {
      if (state.selectedTiposUnidadMedida.length === state.tiposUnidadMedida.length) {
        state.selectedTiposUnidadMedida = [];
      } else {
        // eslint-disable-next-line
        state.selectedTiposUnidadMedida = state.tiposUnidadMedida.map((tipoUnidadMedida) => tipoUnidadMedida.TipUniMedCod);
      }
    },
    onCancelTiposUnidadMedida: (state) => {
      state.activeTipoUnidadMedida = { ...activeTipoUnidadMedida };
      state.selectedTiposUnidadMedida = [];
    },
    onCleanSelectedTiposUnidadMedida: (state) => {
      state.selectedTiposUnidadMedida = [];
    },
    onEditTipoUnidadMedida: (state, { payload }) => {
      state.tiposUnidadMedida = state.tiposUnidadMedida.map((tipoUnidadMedida) => {
        if (tipoUnidadMedida.TipUniMedCod === payload.TipUniMedCod) {
          return payload;
        }

        return tipoUnidadMedida;
      });

      state.activeTipoUnidadMedida = { ...activeTipoUnidadMedida };
    },
  },
});

export const {
  onLoadTiposUnidadMedida,
  onAddNewTipoUnidadMedida,
  onToggleSelectTipoUnidadMedida,
  onSetActiveTipoUnidadMedida,
  onCancelTiposUnidadMedida,
  onEditTipoUnidadMedida,
  onCleanSelectedTiposUnidadMedida,
  onToggleAllTiposUnidadMedida,
} = tiposUnidadMedidaSlice.actions;
