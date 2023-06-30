import { useState } from 'react';
import { useLaboratoriosStore } from '../../../hooks';
import classes from '../../../styles/Table.module.css';

export const LaboratoriosItem = ({ laboratorio }) => {
  const [selected, setSelected] = useState(false);
  const { selectedLaboratorios, toggleSelectLaboratorio } = useLaboratoriosStore();

  const onSelected = (event) => {
    event.stopPropagation();
    setSelected(!selected);
    toggleSelectLaboratorio(laboratorio.LabCod);
  };

  return (
    <tr onClick={onSelected}>
      <td className={` ${classes['table-header-checkbox']}`}>
        <input
          type="checkbox"
          checked={selectedLaboratorios.includes(laboratorio.LabCod)}
          onChange={() => {}}
          value={selected}
        />
      </td>
      <td className={` ${classes['table-header-codigo']}`}>{laboratorio.LabCod}</td>
      <td className={` ${classes['table-header-description']}`}>{laboratorio.LabDes}</td>
      <td className={` ${classes['table-header-estado-registro']}`}>{laboratorio.LabEstReg}</td>
    </tr>
  );
};
