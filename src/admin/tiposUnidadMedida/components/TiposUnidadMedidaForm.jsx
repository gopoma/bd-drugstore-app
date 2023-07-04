import { useId } from 'react';
import { useTiposUnidadMedidaStore } from '../../../hooks';
import classes from '../../../styles/Form.module.css';

export const TiposUnidadMedidaForm = () => {
  const descripcionInputId = useId();
  const estadoRegistroInputId = useId();

  const { activeTipoUnidadMedida, setActiveTipoUnidadMedida } = useTiposUnidadMedidaStore();
  const onInputChange = ({ target }) => {
    setActiveTipoUnidadMedida({
      ...activeTipoUnidadMedida,
      [target.name]: target.value,
    });
  };

  return (
    <section className={classes['container']}>
      <h2>Registro de TipoUnidadMedida</h2>
      <section className={classes['container-form']}>
        <form className={classes['form']}>
          <div className={classes['form-container-input']}>
            <label className={classes['label-input']} htmlFor={descripcionInputId}>Descripción:</label>
            <input
              type="text"
              id={descripcionInputId}
              name="TipUniMedDes"
              onChange={onInputChange}
              value={activeTipoUnidadMedida.TipUniMedDes}
              className={classes['input']}
            />
          </div>
          <div className={classes['form-container-input']}>
            <label className={classes['label-input']} htmlFor={estadoRegistroInputId}>Estado Registro</label>
            <select
              id={estadoRegistroInputId}
              name="TipUniMedEstReg"
              onChange={onInputChange}
              value={activeTipoUnidadMedida.TipUniMedEstReg}
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

export default TiposUnidadMedidaForm;
