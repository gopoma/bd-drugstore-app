import { useState } from 'react';
import { useTiposEstadoPedidoStore } from '../../../hooks';
import classes from '../../../styles/Table.module.css';

export const TiposEstadoPedidoItem = ({ TipoEstadoPedido }) => {
  const [selected, setSelected] = useState(false);
  const { selectedTiposEstadoPedido, toggleSelectTipoEstadoPedido } = useTiposEstadoPedidoStore();

  const onSelected = (event) => {
    event.stopPropagation();
    setSelected(!selected);
    toggleSelectTipoEstadoPedido(TipoEstadoPedido.TipEstPedCod);
  };

  return (
    <tr onClick={onSelected}>
      <td className={` ${classes['table-header-checkbox']}`}>
        <input
          type="checkbox"
          checked={selectedTiposEstadoPedido.includes(TipoEstadoPedido.TipEstPedCod)}
          onChange={() => {}}
          value={selected}
        />
      </td>
      <td className={` ${classes['table-header-codigo']}`}>{TipoEstadoPedido.TipEstPedCod}</td>
      <td className={` ${classes['table-header-description']}`}>{TipoEstadoPedido.TipEstPedDes}</td>
      <td className={` ${classes['table-header-estado-registro']}`}>{TipoEstadoPedido.TipEstPedEstReg}</td>
    </tr>
  );
};
