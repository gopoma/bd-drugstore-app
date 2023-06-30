import { useLaboratoriosStore } from '../../../hooks';
import { LaboratoriosItem } from './LaboratoriosItem';
import classes from '../../../styles/Table.module.css';

export const LaboratoriosTable = () => {
  const { laboratorios, toggleAllLaboratorios, selectedLaboratorios } = useLaboratoriosStore();

  return (
    <section className={classes['container']}>
      <h2>Tabla_Laboratorio</h2>
      <section className={classes['container-table']}>
        <table className={classes['table']}>
          <thead>
            <tr>
              <th className={`${classes['table-header']} ${classes['table-header-checkbox']}`}>
                <input
                  type="checkbox"
                  checked={selectedLaboratorios.length === laboratorios.length}
                  onChange={() => {}}
                  onClick={toggleAllLaboratorios}
                />
              </th>
              <th className={`${classes['table-header']} ${classes['table-header-codigo']}`}>Código</th>
              <th className={`${classes['table-header']} ${classes['table-header-description']}`}>Descripción</th>
              <th className={`${classes['table-header']} ${classes['table-header-estado-registro']}`}>Estado Registro</th>
            </tr>
          </thead>
          <tbody>
            {
              laboratorios.map((laboratorio) => (
                <LaboratoriosItem
                  key={laboratorio.LabCod}
                  laboratorio={laboratorio}
                />
              ))
            }
          </tbody>
        </table>
      </section>
    </section>
  );
};

export default LaboratoriosTable;
