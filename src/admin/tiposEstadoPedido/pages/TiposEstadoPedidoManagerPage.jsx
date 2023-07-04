import { useEffect } from 'react';
import { useTiposEstadoPedidoStore } from '../../../hooks';
import { TiposEstadoPedidoButtons, TiposEstadoPedidoForm, TiposEstadoPedidoTable } from '../components';
import classes from '../../../styles/Container.module.css';

export const TiposEstadoPedidoManagerPage = () => {
  const { startLoadingTiposEstadoPedido } = useTiposEstadoPedidoStore();

  useEffect(() => {
    startLoadingTiposEstadoPedido();
  }, []);

  return (
    <div className={classes['main-container']}>
      <div className={classes['container']}>
        <h1>TiposEstadoPedido</h1>

        <TiposEstadoPedidoForm />

        <TiposEstadoPedidoTable />

        <TiposEstadoPedidoButtons />
      </div>
    </div>
  );
};

export default TiposEstadoPedidoManagerPage;
