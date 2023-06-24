import { useId } from 'react';
import { useCategoriasStore } from '../hooks';

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
    <section>
      <h2>Registro de Categoría</h2>
      <section>
        <form>
          <div>
            <label htmlFor={descripcionInputId}>Descripción:</label>
            <input
              type="text"
              id={descripcionInputId}
              name="CatDes"
              onChange={onInputChange}
              value={activeCategoria.CatDes}
            />
          </div>
          <div>
            <label htmlFor={estadoRegistroInputId}>Estado Registro</label>
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
