import { createSlice } from '@reduxjs/toolkit';

const activeLaboratorio = {
  LabDes: '',
  LabEstReg: 'A',
};

export const laboratoriosSlice = createSlice({
  name: 'laboratorios',
  initialState: {
    laboratorios: [],
    activeLaboratorio,
    selectedLaboratorios: [],
  },
  reducers: {
    onLoadLaboratorios: (state, { payload = [] }) => {
      state.laboratorios = payload;
    },
    onAddNewLaboratorio: (state, { payload }) => {
      state.laboratorios.push(payload);
      state.activeLaboratorio = { ...activeLaboratorio };
    },
    onSetActiveLaboratorio: (state, { payload }) => {
      state.activeLaboratorio = payload;
    },
    onToggleSelectLaboratorio: (state, { payload }) => {
      if (state.selectedLaboratorios.includes(payload)) {
        // eslint-disable-next-line
        state.selectedLaboratorios = state.selectedLaboratorios.filter((idLaboratorio) => idLaboratorio !== payload);
      } else {
        state.selectedLaboratorios.push(payload);
      }
    },
    onToggleAllLaboratorios: (state) => {
      if (state.selectedLaboratorios.length === state.laboratorios.length) {
        state.selectedLaboratorios = [];
      } else {
        state.selectedLaboratorios = state.laboratorios.map((laboratorio) => laboratorio.LabCod);
      }
    },
    onCancelLaboratorios: (state) => {
      state.activeLaboratorio = activeLaboratorio;
      state.selectedLaboratorios = [];
    },
    onCleanSelectedLaboratorios: (state) => {
      state.selectedLaboratorios = [];
    },
    onEditLaboratorio: (state, { payload }) => {
      state.laboratorios = state.laboratorios.map((laboratorio) => {
        if (laboratorio.LabCod === payload.LabCod) {
          return payload;
        }

        return laboratorio;
      });

      state.activeLaboratorio = activeLaboratorio;
    },
  },
});

export const {
  onLoadLaboratorios,
  onAddNewLaboratorio,
  onToggleAllLaboratorios,
  onSetActiveLaboratorio,
  onCancelLaboratorios,
  onEditLaboratorio,
  onCleanSelectedLaboratorios,
  onToggleSelectLaboratorio,
} = laboratoriosSlice.actions;
