import { useCategoriasStore } from '../hooks';

export const CategoriasButtons = () => {
  const { isValidActiveCategoria, startSavingCategoria } = useCategoriasStore();

  return (
    <section>
      <button
        type="button"
        disabled={!isValidActiveCategoria}
        onClick={() => startSavingCategoria()}
      >
        Adicionar
      </button>
      <button type="button">Modificar</button>
      <button type="button">Eliminar</button>
      <button type="button">Cancelar</button>
      <button type="button">Inactivar</button>
      <button type="button">Reactivar</button>
      <button type="button">Actualizar</button>
      <button type="button">Salir</button>
    </section>
  );
};
