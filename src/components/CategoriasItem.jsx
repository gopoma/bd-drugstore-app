import { useCategoriasStore } from '../hooks';
import classes from './CategoriasTable.module.css';

export const CategoriasItem = ({ categoria }) => {
  const { selectedCategorias, toggleSelectCategoria } = useCategoriasStore();

  return (
    <tr>
      <td className={` ${classes['table-header-checkbox']}`}>
        <input
          type="checkbox"
          checked={selectedCategorias.includes(categoria.CatCod)}
          onChange={() => toggleSelectCategoria(categoria.CatCod)}
      /></td>
      <td className={` ${classes['table-header-codigo']}`}>{categoria.CatCod}</td>
      <td className={` ${classes['table-header-description']}`}>{categoria.CatDes}</td>
      <td className={` ${classes['table-header-estado-registro']}`}>{categoria.CatEstReg}</td>
    </tr>
  );
};
