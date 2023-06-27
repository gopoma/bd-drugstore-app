import { useState } from 'react';
import { useCategoriasStore } from '../hooks';
import classes from './CategoriasTable.module.css';

export const CategoriasItem = ({ categoria }) => {
  const [selected, setSelected] = useState(false);
  const { selectedCategorias, toggleSelectCategoria } = useCategoriasStore();

  const onSelected = (event) => {
    event.stopPropagation();
    setSelected(!selected);
    toggleSelectCategoria(categoria.CatCod);
  };

  return (
    <tr onClick={onSelected}>
      <td className={` ${classes['table-header-checkbox']}`}>
        <input
          type="checkbox"
          checked={selectedCategorias.includes(categoria.CatCod)}
          onChange={()=>{}}
          value={selected}
      /></td>
      <td className={` ${classes['table-header-codigo']}`}>{categoria.CatCod}</td>
      <td className={` ${classes['table-header-description']}`}>{categoria.CatDes}</td>
      <td className={` ${classes['table-header-estado-registro']}`}>{categoria.CatEstReg}</td>
    </tr>
  );
};
