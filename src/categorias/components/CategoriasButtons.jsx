import { useNavigate } from 'react-router-dom';
import { useCategoriasStore } from '../../hooks';
import classes from './CategoriasButtons.module.css';

export const CategoriasButtons = () => {
  const navigate = useNavigate();
  const {
    isValidActiveCategoria,
    selectedCategoriasCount,
    categorias,
    selectedCategorias,
    activeCategoria,
    startSavingCategoria,
    setActiveCategoria,
    cancelCategorias,
    deactivate,
    activate,
    deleteMany,
  } = useCategoriasStore();

  const onEdit = () => {
    const [idSelectedCategoria] = selectedCategorias;
    // eslint-disable-next-line
    const selectedCategoria = categorias.find((categoria) => categoria.CatCod === idSelectedCategoria);
    setActiveCategoria(selectedCategoria);
  };

  const onExit = () => {
    cancelCategorias();
    navigate('/admin');
  };

  return (
    <section className={classes['container-buttons']}>
      <button
        type="button"
        disabled={Object.keys(activeCategoria).includes('CatCod') || !isValidActiveCategoria}
        onClick={startSavingCategoria}
      >
        Adicionar
      </button>
      <button
        type="button"
        disabled={selectedCategoriasCount !== 1}
        onClick={onEdit}
      >
        Modificar
      </button>
      <button
        type="button"
        disabled={selectedCategoriasCount === 0}
        onClick={deleteMany}
      >
        Eliminar
      </button>
      <button
        type="button"
        onClick={cancelCategorias}
      >
        Cancelar
      </button>
      <button
        type="button"
        disabled={selectedCategoriasCount === 0}
        onClick={deactivate}
      >
        Inactivar
      </button>
      <button
        type="button"
        disabled={selectedCategoriasCount === 0}
        onClick={activate}
      >
        Reactivar
      </button>
      <button
        type="button"
        disabled={!Object.keys(activeCategoria).includes('CatCod') || !isValidActiveCategoria}
        onClick={startSavingCategoria}
      >
        Actualizar
      </button>
      <button
        type="button"
        onClick={onExit}
      >
        Salir
      </button>
    </section>
  );
};
