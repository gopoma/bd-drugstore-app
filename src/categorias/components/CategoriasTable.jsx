import { useCategoriasStore } from '../../hooks';
import { CategoriasItem } from './CategoriasItem';
import classes from '../../styles/Table.module.css';

export const CategoriasTable = () => {
  const { categorias, toggleAllCategorias, selectedCategorias } = useCategoriasStore();

  return (
    <section className={classes['container']}>
      <h2>Tabla_Categoría</h2>
      <section className={classes['container-table']}>
        <table className={classes['table']}>
          <thead>
            <tr>
              <th className={`${classes['table-header']} ${classes['table-header-checkbox']}`}>
                <input
                  type="checkbox"
                  checked={selectedCategorias.length === categorias.length}
                  onChange={() => {}}
                  onClick={toggleAllCategorias}
                />
              </th>
              <th className={`${classes['table-header']} ${classes['table-header-codigo']}`}>Código</th>
              <th className={`${classes['table-header']} ${classes['table-header-description']}`}>Descripción</th>
              <th className={`${classes['table-header']} ${classes['table-header-estado-registro']}`}>Estado Registro</th>
            </tr>
          </thead>
          <tbody>
            {
              categorias.map((categoria) => (
                <CategoriasItem
                  key={categoria.CatCod}
                  categoria={categoria}
                />
              ))
            }
          </tbody>
        </table>
      </section>
    </section>
  );
};

export default CategoriasTable;
