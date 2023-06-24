import { useEffect } from 'react';
import { useCategoriasStore } from '../hooks';
import { CategoriasButtons, CategoriasForm, CategoriasTable } from '../components';

export const CategoriasManagerPage = () => {
  const { startLoadingCategorias } = useCategoriasStore();

  useEffect(() => {
    startLoadingCategorias();
  }, []);

  return (
    <>
      <h1>Categorías</h1>

      <CategoriasForm />

      <CategoriasTable />

      <CategoriasButtons />
    </>
  );
};

export default CategoriasManagerPage;
