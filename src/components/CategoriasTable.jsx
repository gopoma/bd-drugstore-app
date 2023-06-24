import { useCategoriasStore } from '../hooks';

export const CategoriasTable = () => {
  const { categorias } = useCategoriasStore();

  return (
    <section>
      <h2>Tabla_Categoría</h2>
      <section>
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>Código</th>
              <th>Descripción</th>
              <th>Estado Registro</th>
            </tr>
          </thead>
          <tbody>
            {
              categorias.map((categoria) => (
                <tr key={categoria.CatCod}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{categoria.CatCod}</td>
                  <td>{categoria.CatDes}</td>
                  <td>{categoria.CatEstReg}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </section>
    </section>
  );
};

export default CategoriasTable;
