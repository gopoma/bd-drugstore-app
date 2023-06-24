import { useDispatch, useSelector } from 'react-redux';
import { productsApi } from '../api';
import {
  onSetActiveCategoria,
  onAddNewCategoria,
  onLoadCategorias,
} from '../store';

export const useCategoriasStore = () => {
  const dispatch = useDispatch();
  const { categorias, activeCategoria } = useSelector((state) => state.categorias);

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

  return {
    //* Propiedades
    categorias,
    activeCategoria,
    isValidActiveCategoria: activeCategoria.CatDes.trim() !== '',

    //* Métodos
    startLoadingCategorias,
    startSavingCategoria,
    setActiveCategoria,
  };
};
