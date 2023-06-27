import { useEffect } from 'react';
import { useCategoriasStore } from '../hooks';
import { CategoriasButtons, CategoriasForm, CategoriasTable } from '../components';
import classes from './CategoriasManagerPage.module.css';

export const CategoriasManagerPage = () => {
  const { startLoadingCategorias } = useCategoriasStore();

  useEffect(() => {
    startLoadingCategorias();
  }, []);

  return (
    <div className={classes['container']}>
      <div className={classes['container-category']}>
        <h1>Categorías</h1>

        <CategoriasForm />

        <CategoriasTable />

        <CategoriasButtons />
      </div>
    </div>
  );
};

export default CategoriasManagerPage;
