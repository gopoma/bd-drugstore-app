import { useNavigate } from 'react-router-dom';
import { useCategoriasStore } from '../hooks';

export const CategoriasButtons = () => {
  const navigate = useNavigate();
  const {
    isValidActiveCategoria,
    startSavingCategoria,
    selectedCategoriasCount,
    categorias,
    selectedCategorias,
    setActiveCategoria,
    activeCategoria,
    cancelCategorias,
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
    <section>
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
      >
        Inactivar
      </button>
      <button
        type="button"
        disabled={selectedCategoriasCount === 0}
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
