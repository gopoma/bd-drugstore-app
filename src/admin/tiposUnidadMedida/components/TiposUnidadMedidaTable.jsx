import { useTiposUnidadMedidaStore } from '../../../hooks';
import { TiposUnidadMedidaItem } from './TiposUnidadMedidaItem';
import classes from '../../../styles/Table.module.css';

export const TiposUnidadMedidaTable = () => {
  const { tiposUnidadMedida, toggleAllTiposUnidadMedida, selectedTiposUnidadMedida } = useTiposUnidadMedidaStore();

  return (
    <section className={classes['container']}>
      <h2>Tabla_Tipos_Unidad_Medida</h2>
      <section className={classes['container-table']}>
        <table className={classes['table']}>
          <thead>
            <tr>
              <th className={`${classes['table-header']} ${classes['table-header-checkbox']}`}>
                <input
                  type="checkbox"
                  checked={selectedTiposUnidadMedida.length === tiposUnidadMedida.length}
                  onChange={() => {}}
                  onClick={toggleAllTiposUnidadMedida}
                />
              </th>
              <th className={`${classes['table-header']} ${classes['table-header-codigo']}`}>Código</th>
              <th className={`${classes['table-header']} ${classes['table-header-description']}`}>Descripción</th>
              <th className={`${classes['table-header']} ${classes['table-header-estado-registro']}`}>Estado Registro</th>
            </tr>
          </thead>
          <tbody>
            {
              tiposUnidadMedida.map((tipoUnidadMedida) => (
                <TiposUnidadMedidaItem
                  key={tipoUnidadMedida.TipUniMedCod}
                  tipoUnidadMedida={tipoUnidadMedida}
                />
              ))
            }
          </tbody>
        </table>
      </section>
    </section>
  );
};

export default TiposUnidadMedidaTable;
