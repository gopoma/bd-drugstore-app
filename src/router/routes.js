import { lazy } from 'react';

const AdminPanelPage = lazy(() => import('../pages/AdminPanelPage'));
const CategoriasManagerPageimport = lazy(() => import('../pages/CategoriasManagerPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

export const routes = [
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
