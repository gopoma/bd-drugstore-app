import { useEffect } from 'react';
import { useTiposUnidadMedidaStore } from '../../../hooks';
import { TiposUnidadMedidaButtons, TiposUnidadMedidaForm, TiposUnidadMedidaTable } from '../components';
import classes from '../../../styles/Container.module.css';

export const TiposUnidadMedidaManagerPage = () => {
  const { startLoadingTiposUnidadMedida } = useTiposUnidadMedidaStore();

  useEffect(() => {
    startLoadingTiposUnidadMedida();
  }, []);

  return (
    <div className={classes['main-container']}>
      <div className={classes['container']}>
        <h1>TiposUnidadMedida</h1>

        <TiposUnidadMedidaForm />

        <TiposUnidadMedidaTable />

        <TiposUnidadMedidaButtons />
      </div>
    </div>
  );
};

export default TiposUnidadMedidaManagerPage;
