import { useId } from 'react';
import { useCategoriasStore } from '../../hooks';
import classes from '../../styles/Form.module.css';

export const CategoriasForm = () => {
  const descripcionInputId = useId();
  const estadoRegistroInputId = useId();

  const { activeCategoria, setActiveCategoria } = useCategoriasStore();
  const onInputChange = ({ target }) => {
    setActiveCategoria({
      ...activeCategoria,
      [target.name]: target.value,
    });
  };

  return (
    <section className={classes['container']}>
      <h2>Registro de Categoría</h2>
      <section className={classes['container-form']}>
        <form className={classes['form']}>
          <div className={classes['form-container-input']}>
            <label className={classes['label-input']} htmlFor={descripcionInputId}>Descripción:</label>
            <input
              type="text"
              id={descripcionInputId}
              name="CatDes"
              onChange={onInputChange}
              value={activeCategoria.CatDes}
              className={classes['input']}
            />
          </div>
          <div className={classes['form-container-input']}>
            <label className={classes['label-input']} htmlFor={estadoRegistroInputId}>Estado Registro</label>
            <select
              id={estadoRegistroInputId}
              name="CatEstReg"
              onChange={onInputChange}
              value={activeCategoria.CatEstReg}
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

export default CategoriasForm;
