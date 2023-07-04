import { useId } from 'react';
import { useTiposEstadoPedidoStore } from '../../../hooks';
import classes from '../../../styles/Form.module.css';

export const TiposEstadoPedidoForm = () => {
  const descripcionInputId = useId();
  const estadoRegistroInputId = useId();

  const { activeTipoEstadoPedido, setActiveTipoEstadoPedido } = useTiposEstadoPedidoStore();
  const onInputChange = ({ target }) => {
    setActiveTipoEstadoPedido({
      ...activeTipoEstadoPedido,
      [target.name]: target.value,
    });
  };

  return (
    <section className={classes['container']}>
      <h2>Registro de TipoEstadoPedido</h2>
      <section className={classes['container-form']}>
        <form className={classes['form']}>
          <div className={classes['form-container-input']}>
            <label className={classes['label-input']} htmlFor={descripcionInputId}>Descripción:</label>
            <input
              type="text"
              id={descripcionInputId}
              name="TipEstPedDes"
              onChange={onInputChange}
              value={activeTipoEstadoPedido.TipEstPedDes}
              className={classes['input']}
            />
          </div>
          <div className={classes['form-container-input']}>
            <label className={classes['label-input']} htmlFor={estadoRegistroInputId}>Estado Registro</label>
            <select
              id={estadoRegistroInputId}
              name="TipEstPedEstReg"
              onChange={onInputChange}
              value={activeTipoEstadoPedido.TipEstPedEstReg}
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
