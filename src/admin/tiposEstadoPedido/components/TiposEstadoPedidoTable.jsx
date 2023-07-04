import { useTiposEstadoPedidoStore } from '../../../hooks';
import { TiposEstadoPedidoItem } from './TiposEstadoPedidoItem';
import classes from '../../../styles/Table.module.css';

export const TiposEstadoPedidoTable = () => {
  const { tiposEstadoPedido, toggleAllTiposEstadoPedido, selectedTiposEstadoPedido } = useTiposEstadoPedidoStore();

  return (
    <section className={classes['container']}>
      <h2>Tabla_Tipo_Estado_Pedido</h2>
      <section className={classes['container-table']}>
        <table className={classes['table']}>
          <thead>
            <tr>
              <th className={`${classes['table-header']} ${classes['table-header-checkbox']}`}>
                <input
                  type="checkbox"
                  checked={selectedTiposEstadoPedido.length === tiposEstadoPedido.length}
                  onChange={() => {}}
                  onClick={toggleAllTiposEstadoPedido}
                />
              </th>
              <th className={`${classes['table-header']} ${classes['table-header-codigo']}`}>Código</th>
              <th className={`${classes['table-header']} ${classes['table-header-description']}`}>Descripción</th>
              <th className={`${classes['table-header']} ${classes['table-header-estado-registro']}`}>Estado Registro</th>
            </tr>
          </thead>
          <tbody>
            {
              tiposEstadoPedido.map((tipoEstadoPedido) => (
                <TiposEstadoPedidoItem
                  key={tipoEstadoPedido.TipEstPedCod}
                  TipoEstadoPedido={tipoEstadoPedido}
                />
              ))
            }
          </tbody>
        </table>
      </section>
    </section>
  );
};
