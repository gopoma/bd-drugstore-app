import { lazy } from 'react';
import { HomePage, NotFoundPage } from '../pages';

const AdminPanelPage = lazy(() => import('../pages/AdminPanelPage'));
const CategoriasManagerPage = lazy(() => import('../admin/categorias/pages/CategoriasManagerPage'));
const LaboratoriosManagerPage = lazy(() => import('../admin/laboratorios/pages/LaboratoriosManagerPage'));

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
    path: '404',
    Component: NotFoundPage,
  },
];
