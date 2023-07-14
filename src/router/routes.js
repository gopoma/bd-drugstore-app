import { lazy } from 'react';
import { HomePage, NotFoundPage } from '../pages';

const AdminPanelPage = lazy(() => import('../pages/AdminPanelPage'));
const CategoriasManagerPage = lazy(() => import('../admin/categorias/pages/CategoriasManagerPage'));
const LaboratoriosManagerPage = lazy(() => import('../admin/laboratorios/pages/LaboratoriosManagerPage'));
const RolesManagerPage = lazy(() => import('../admin/roles/pages/RolesManagerPage'));
const TiposUnidadMedidaManagerPage = lazy(() => import('../admin/tiposUnidadMedida/pages/TiposUnidadMedidaManagerPage'));
const TiposEstadoPedidoManagerPage = lazy(() => import('../admin/tiposEstadoPedido/pages/TiposEstadoPedidoManagerPage'));
const ArticulosManagerPage = lazy(() => import('../admin/articulos/pages/ArticulosManagerPage'));
const UsuariosManagerPage = lazy(() => import('../admin/usuarios/pages/UsuariosManagerPage'));
const PedidosManagerPage = lazy(() => import('../admin/pedidos/pages/PedidosManagerPage'));

export const routes = [
  {
    path: '',
    Component: HomePage,
  },
  {
    path: 'admin',
    Component: AdminPanelPage,
  },
  {
    path: 'admin/categorias',
    Component: CategoriasManagerPage,
  },
  {
    path: 'admin/laboratorios',
    Component: LaboratoriosManagerPage,
  },
  {
    path: 'admin/roles',
    Component: RolesManagerPage,
  },
  {
    path: 'admin/tipos-estado-pedido',
    Component: TiposEstadoPedidoManagerPage,
  },
  {
    path: 'admin/tipos-unidad-medida',
    Component: TiposUnidadMedidaManagerPage,
  },
  {
    path: 'admin/articulos',
    Component: ArticulosManagerPage,
  },
  {
    path: 'admin/usuarios',
    Component: UsuariosManagerPage,
  },
  {
    path: 'admin/pedidos',
    Component: PedidosManagerPage,
  },
  {
    path: '404',
    Component: NotFoundPage,
  },
];
