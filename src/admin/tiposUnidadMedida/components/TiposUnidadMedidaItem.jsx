import { useState } from 'react';
import { useTiposUnidadMedidaStore } from '../../../hooks';
import classes from '../../../styles/Table.module.css';

export const TiposUnidadMedidaItem = ({ tipoUnidadMedida }) => {
  const [selected, setSelected] = useState(false);
  const { selectedTiposUnidadMedida, toggleSelectTipoUnidadMedida } = useTiposUnidadMedidaStore();

  const onSelected = (event) => {
    event.stopPropagation();
    setSelected(!selected);
    toggleSelectTipoUnidadMedida(tipoUnidadMedida.TipUniMedCod);
  };

  return (
    <tr onClick={onSelected}>
      <td className={` ${classes['table-header-checkbox']}`}>
        <input
          type="checkbox"
          checked={selectedTiposUnidadMedida.includes(tipoUnidadMedida.TipUniMedCod)}
          onChange={() => {}}
          value={selected}
        />
      </td>
      <td className={` ${classes['table-header-codigo']}`}>{tipoUnidadMedida.TipUniMedCod}</td>
      <td className={` ${classes['table-header-description']}`}>{tipoUnidadMedida.TipUniMedDes}</td>
      <td className={` ${classes['table-header-estado-registro']}`}>{tipoUnidadMedida.TipUniMedEstReg}</td>
    </tr>
  );
};
