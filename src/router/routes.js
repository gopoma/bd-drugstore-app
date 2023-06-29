import { lazy } from 'react';
import { HomePage, NotFoundPage } from '../pages';

const AdminPanelPage = lazy(() => import('../pages/AdminPanelPage'));
const CategoriasManagerPageimport = lazy(() => import('../categorias/pages/CategoriasManagerPage'));

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
    Component: CategoriasManagerPageimport,
  },
  {
    path: '404',
    Component: NotFoundPage,
  },
];
