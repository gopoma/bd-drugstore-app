import { useId } from 'react';
import { useRolesStore } from '../../../hooks';
import classes from '../../../styles/Form.module.css';

export const RolesForm = () => {
  const descripcionInputId = useId();
  const estadoRegistroInputId = useId();

  const { activeRol, setActiveRol } = useRolesStore();
  const onInputChange = ({ target }) => {
    setActiveRol({
      ...activeRol,
      [target.name]: target.value,
    });
  };

  return (
    <section className={classes['container']}>
      <h2>Registro de Rol</h2>
      <section className={classes['container-form']}>
        <form className={classes['form']}>
          <div className={classes['form-container-input']}>
            <label className={classes['label-input']} htmlFor={descripcionInputId}>Descripción:</label>
            <input
              type="text"
              id={descripcionInputId}
              name="LabDes"
              onChange={onInputChange}
              value={activeRol.LabDes}
              className={classes['input']}
            />
          </div>
          <div className={classes['form-container-input']}>
            <label className={classes['label-input']} htmlFor={estadoRegistroInputId}>Estado Registro</label>
            <select
              id={estadoRegistroInputId}
              name="LabEstReg"
              onChange={onInputChange}
              value={activeRol.LabEstReg}
            >
              <option>A</option>
              <option>I</option>
              <option>*</option>
            </select>
          </div>
        </form>
      </section>
    </section>
  );
};
