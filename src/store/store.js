import { configureStore } from '@reduxjs/toolkit';
import { categoriasSlice } from './categorias/categoriasSlice';
import { laboratoriosSlice } from './laboratorios/laboratoriosSlice';
import { rolesSlice } from './roles/rolesSlice';
import { tiposEstadoPedidoSlice } from './tiposEstadoPedido/tiposEstadoPedidoSlice';
import { tiposUnidadMedidaSlice } from './tiposUnidadMedida/tiposUnidadMedidaSlice';

export const store = configureStore({
  reducer: {
    categorias: categoriasSlice.reducer,
    laboratorios: laboratoriosSlice.reducer,
    roles: rolesSlice.reducer,
    tiposEstadoPedido: tiposEstadoPedidoSlice.reducer,
    tiposUnidadMedida: tiposUnidadMedidaSlice.reducer,
  },
});
