import { createSlice } from '@reduxjs/toolkit';

const activeRol = {
  RolDes: '',
  RolEstReg: 'A',
};

export const rolesSlice = createSlice({
  name: 'roles',
  initialState: {
    roles: [],
    activeRol,
    selectedRoles: [],
  },
  reducers: {
    onLoadRoles: (state, { payload = [] }) => {
      state.roles = payload;
    },
    onAddNewRol: (state, { payload }) => {
      state.roles.push(payload);
      state.activeRol = { ...activeRol };
    },
    onSetActiveRol: (state, { payload }) => {
      state.activeRol = payload;
    },
    onToggleSelectRol: (state, { payload }) => {
      if (state.selectedRoles.includes(payload)) {
        // eslint-disable-next-line
        state.selectedRoles = state.selectedRoles.filter((idRol) => idRol !== payload);
      } else {
        state.selectedRoles.push(payload);
      }
    },
    onToggleAllRoles: (state) => {
      if (state.selectedRoles.length === state.roles.length) {
        state.selectedRoles = [];
      } else {
        state.selectedRoles = state.roles.map((rol) => rol.RolCod);
      }
    },
    onCancelRoles: (state) => {
      state.activeRol = { ...activeRol };
      state.selectedRoles = [];
    },
    onCleanSelectedRoles: (state) => {
      state.selectedRoles = [];
    },
    onEditRol: (state, { payload }) => {
      state.roles = state.roles.map((rol) => {
        if (rol.RolCod === payload.RolCod) {
          return payload;
        }

        return rol;
      });

      state.activeRol = { ...activeRol };
    },
  },
});

export const {
  onLoadRoles,
  onAddNewRol,
  onToggleSelectRol,
  onSetActiveRol,
  onCancelRoles,
  onEditRol,
  onCleanSelectedRoles,
  onToggleAllRoles,
} = rolesSlice.actions;
