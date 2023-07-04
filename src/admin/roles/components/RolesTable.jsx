import { useRolesStore } from '../../../hooks';
import { RolesItem } from './RolesItem';
import classes from '../../../styles/Table.module.css';

export const RolesTable = () => {
  const { roles, toggleAllRoles, selectedRoles } = useRolesStore();

  return (
    <section className={classes['container']}>
      <h2>Tabla_Roles</h2>
      <section className={classes['container-table']}>
        <table className={classes['table']}>
          <thead>
            <tr>
              <th className={`${classes['table-header']} ${classes['table-header-checkbox']}`}>
                <input
                  type="checkbox"
                  checked={selectedRoles.length === roles.length}
                  onChange={() => {}}
                  onClick={toggleAllRoles}
                />
              </th>
              <th className={`${classes['table-header']} ${classes['table-header-codigo']}`}>Código</th>
              <th className={`${classes['table-header']} ${classes['table-header-description']}`}>Descripción</th>
              <th className={`${classes['table-header']} ${classes['table-header-estado-registro']}`}>Estado Registro</th>
            </tr>
          </thead>
          <tbody>
            {
              roles.map((rol) => (
                <RolesItem
                  key={rol.RolCod}
                  rol={rol}
                />
              ))
            }
          </tbody>
        </table>
      </section>
    </section>
  );
};
