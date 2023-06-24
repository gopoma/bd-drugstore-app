import { useCategoriasStore } from '../hooks';

export const CategoriasItem = ({ categoria }) => {
  const { selectedCategorias, toggleSelectCategoria } = useCategoriasStore();

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={selectedCategorias.includes(categoria.CatCod)}
          onChange={() => toggleSelectCategoria(categoria.CatCod)}
        />
      </td>
      <td>{categoria.CatCod}</td>
      <td>{categoria.CatDes}</td>
      <td>{categoria.CatEstReg}</td>
    </tr>
  );
};
