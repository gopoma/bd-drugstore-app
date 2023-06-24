import { useDispatch, useSelector } from 'react-redux';
import { productsApi } from '../api';
import {
  onSetActiveCategoria,
  onAddNewCategoria,
  onLoadCategorias,
  onToggleSelectCategoria,
  onCancelCategorias,
  onEditCategoria,
  onCleanSelectedCategorias,
  onToggleAllCategorias,
} from '../store';

export const useCategoriasStore = () => {
  const dispatch = useDispatch();
  const {
    categorias,
    activeCategoria,
    selectedCategorias,
  } = useSelector((state) => state.categorias);

  const startLoadingCategorias = async () => {
    try {
      const { data } = await productsApi.get('/categorias');
      dispatch(onLoadCategorias(data.categorias));
    } catch (error) {
      console.log('Error cargando categorías');
      console.error(error);
    }
  };

  const startSavingCategoria = async () => {
    try {
      if (activeCategoria.CatCod) {
        const { data } = await productsApi.patch(`/categorias/${activeCategoria.CatCod}`, activeCategoria);
        dispatch(onEditCategoria({ ...data.categoria }));
        return;
      }

      // Creando
      const { data } = await productsApi.post('/categorias', activeCategoria);
      dispatch(onAddNewCategoria({ ...data.categoria }));
    } catch (error) {
      console.log('Error guardando categoría');
      console.error(error);
    }
  };

  const setActiveCategoria = (categoria) => {
    dispatch(onSetActiveCategoria(categoria));
  };

  const toggleSelectCategoria = (idCategoria) => {
    dispatch(onToggleSelectCategoria(idCategoria));
  };

  const cancelCategorias = () => {
    dispatch(onCancelCategorias());
  };

  const deactivate = async () => {
    const promises = selectedCategorias.map(async (idCategoria) => {
      const { data } = await productsApi.patch(`/categorias/${idCategoria}`, { CatEstReg: 'I' });
      return data.categoria;
    });

    const results = await Promise.allSettled(promises);
    results.forEach(({ value: categoria }) => {
      dispatch(onEditCategoria(categoria));
    });
    dispatch(onCleanSelectedCategorias());
  };

  const activate = async () => {
    const promises = selectedCategorias.map(async (idCategoria) => {
      const { data } = await productsApi.patch(`/categorias/${idCategoria}`, { CatEstReg: 'A' });
      return data.categoria;
    });

    const results = await Promise.allSettled(promises);
    results.forEach(({ value: categoria }) => {
      dispatch(onEditCategoria(categoria));
    });
    dispatch(onCleanSelectedCategorias());
  };

  const deleteMany = async () => {
    const promises = selectedCategorias.map(async (idCategoria) => {
      const { data } = await productsApi.patch(`/categorias/${idCategoria}`, { CatEstReg: '*' });
      return data.categoria;
    });

    const results = await Promise.allSettled(promises);
    results.forEach(({ value: categoria }) => {
      dispatch(onEditCategoria(categoria));
    });
    dispatch(onCleanSelectedCategorias());
  };

  const toggleAllCategorias = () => {
    dispatch(onToggleAllCategorias());
  };

  return {
    //* Propiedades
    categorias,
    activeCategoria,
    isValidActiveCategoria: activeCategoria.CatDes.trim() !== '',
    selectedCategorias,
    selectedCategoriasCount: selectedCategorias.length,

    //* Métodos
    startLoadingCategorias,
    startSavingCategoria,
    setActiveCategoria,
    toggleSelectCategoria,
    cancelCategorias,
    toggleAllCategorias,
    deactivate,
    activate,
    deleteMany,
  };
};
