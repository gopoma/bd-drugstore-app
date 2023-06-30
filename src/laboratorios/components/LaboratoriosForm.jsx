import { useId } from 'react';
import { useLaboratoriosStore } from '../../hooks';
import classes from '../../styles/Form.module.css';

export const LaboratoriosForm = () => {
  const descripcionInputId = useId();
  const estadoRegistroInputId = useId();

  const { activeLaboratorio, setActiveLaboratorio } = useLaboratoriosStore();
  const onInputChange = ({ target }) => {
    setActiveLaboratorio({
      ...activeLaboratorio,
      [target.name]: target.value,
    });
  };

  return (
    <section className={classes['container']}>
      <h2>Registro de Laboratorio</h2>
      <section className={classes['container-form']}>
        <form className={classes['form']}>
          <div className={classes['form-container-input']}>
            <label className={classes['label-input']} htmlFor={descripcionInputId}>Descripción:</label>
            <input
              type="text"
              id={descripcionInputId}
              name="LabDes"
              onChange={onInputChange}
              value={activeLaboratorio.LabDes}
              className={classes['input']}
            />
          </div>
          <div className={classes['form-container-input']}>
            <label className={classes['label-input']} htmlFor={estadoRegistroInputId}>Estado Registro</label>
            <select
              id={estadoRegistroInputId}
              name="LabEstReg"
              onChange={onInputChange}
              value={activeLaboratorio.LabEstReg}
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

export default LaboratoriosForm;
