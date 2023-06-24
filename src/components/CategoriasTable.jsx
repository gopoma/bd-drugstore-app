import { useCategoriasStore } from '../hooks';
import { CategoriasItem } from './CategoriasItem';

export const CategoriasTable = () => {
  const { categorias, toggleAllCategorias, selectedCategorias } = useCategoriasStore();

  return (
    <section>
      <h2>Tabla_Categoría</h2>
      <section>
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedCategorias.length === categorias.length}
                  onChange={() => {}}
                  onClick={toggleAllCategorias}
                />
              </th>
              <th>Código</th>
              <th>Descripción</th>
              <th>Estado Registro</th>
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
