import { useState } from 'react';
import { useRolesStore } from '../../../hooks';
import classes from '../../../styles/Table.module.css';

export const RolesItem = ({ rol }) => {
  const [selected, setSelected] = useState(false);
  const { selectedRoles, toggleSelectRol } = useRolesStore();

  const onSelected = (event) => {
    event.stopPropagation();
    setSelected(!selected);
    toggleSelectRol(rol.RolCod);
  };

  return (
    <tr onClick={onSelected}>
      <td className={` ${classes['table-header-checkbox']}`}>
        <input
          type="checkbox"
          checked={selectedRoles.includes(rol.RolCod)}
          onChange={() => {}}
          value={selected}
        />
      </td>
      <td className={` ${classes['table-header-codigo']}`}>{rol.RolCod}</td>
      <td className={` ${classes['table-header-description']}`}>{rol.RolDes}</td>
      <td className={` ${classes['table-header-estado-registro']}`}>{rol.RolEstReg}</td>
    </tr>
  );
};
