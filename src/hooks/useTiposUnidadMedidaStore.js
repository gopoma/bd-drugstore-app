import { useDispatch, useSelector } from 'react-redux';
import { productsApi } from '../api';
import {
  onLoadTiposUnidadMedida,
  onAddNewTipoUnidadMedida,
  onToggleSelectTipoUnidadMedida,
  onSetActiveTipoUnidadMedida,
  onCancelTiposUnidadMedida,
  onEditTipoUnidadMedida,
  onCleanSelectedTiposUnidadMedida,
  onToggleAllTiposUnidadMedida,
} from '../store';

export const useTiposUnidadMedidaStore = () => {
  const dispatch = useDispatch();
  const {
    tiposUnidadMedida,
    activeTipoUnidadMedida,
    selectedTiposUnidadMedida,
  } = useSelector((state) => state.tiposUnidadMedida);

  const startLoadingTiposUnidadMedida = async () => {
    try {
      const { data } = await productsApi.get('/tipos-unidad-medida');
      dispatch(onLoadTiposUnidadMedida(data.tiposUnidadMedida));
    } catch (error) {
      console.log('Error cargando TiposUnidadMedida');
      console.error(error);
    }
  };

  const startSavingTipoUnidadMedida = async () => {
    try {
      if (activeTipoUnidadMedida.TipUniMedCod) {
        const { data } = await productsApi.patch(`/tipos-unidad-medida/${activeTipoUnidadMedida.TipUniMedCod}`, activeTipoUnidadMedida);
        dispatch(onEditTipoUnidadMedida({ ...data.tipoUnidadMedida }));
        return;
      }

      // Creando
      const { data } = await productsApi.post('/tipos-unidad-medida', activeTipoUnidadMedida);
      dispatch(onAddNewTipoUnidadMedida({ ...data.tipoUnidadMedida }));
    } catch (error) {
      console.log('Error guardando Tipo Unidad de Medida');
      console.error(error);
    }
  };

  const setActiveTipoUnidadMedida = (tipoUnidadMedida) => {
    dispatch(onSetActiveTipoUnidadMedida(tipoUnidadMedida));
  };

  const toggleSelectTipoUnidadMedida = (idTipoUnidadMedida) => {
    dispatch(onToggleSelectTipoUnidadMedida(idTipoUnidadMedida));
  };

  const cancelTiposUnidadMedida = () => {
    dispatch(onCancelTiposUnidadMedida());
  };

  const deactivate = async () => {
    const promises = selectedTiposUnidadMedida.map(async (idTipoUnidadMedida) => {
      const { data } = await productsApi.patch(`/tipos-unidad-medida/${idTipoUnidadMedida}`, { TipUniMedEstReg: 'I' });
      return data.tipoUnidadMedida;
    });

    const results = await Promise.allSettled(promises);
    results.forEach(({ value: tipoUnidadMedida }) => {
      dispatch(onEditTipoUnidadMedida(tipoUnidadMedida));
    });
    dispatch(onCleanSelectedTiposUnidadMedida());
  };

  const activate = async () => {
    const promises = selectedTiposUnidadMedida.map(async (idTipoUnidadMedida) => {
      const { data } = await productsApi.patch(`/tipos-unidad-medida/${idTipoUnidadMedida}`, { TipUniMedEstReg: 'A' });
      return data.tipoUnidadMedida;
    });

    const results = await Promise.allSettled(promises);
    results.forEach(({ value: tipoUnidadMedida }) => {
      dispatch(onEditTipoUnidadMedida(tipoUnidadMedida));
    });
    dispatch(onCleanSelectedTiposUnidadMedida());
  };

  const deleteMany = async () => {
    const promises = selectedTiposUnidadMedida.map(async (idTipoUnidadMedida) => {
      const { data } = await productsApi.patch(`/tipos-unidad-medida/${idTipoUnidadMedida}`, { TipUniMedEstReg: '*' });
      return data.tipoUnidadMedida;
    });

    const results = await Promise.allSettled(promises);
    results.forEach(({ value: tipoUnidadMedida }) => {
      dispatch(onEditTipoUnidadMedida(tipoUnidadMedida));
    });
    dispatch(onCleanSelectedTiposUnidadMedida());
  };

  const toggleAllTiposUnidadMedida = () => {
    dispatch(onToggleAllTiposUnidadMedida());
  };

  return {
    //* Propiedades
    tiposUnidadMedida,
    activeTipoUnidadMedida,
    isValidActiveTipoUnidadMedida: activeTipoUnidadMedida.TipUniMedDes.trim() !== '',
    selectedTiposUnidadMedida,
    selectedTiposUnidadMedidaCount: selectedTiposUnidadMedida.length,

    //* Métodos
    startLoadingTiposUnidadMedida,
    startSavingTipoUnidadMedida,
    setActiveTipoUnidadMedida,
    toggleSelectTipoUnidadMedida,
    cancelTiposUnidadMedida,
    toggleAllTiposUnidadMedida,
    deactivate,
    activate,
    deleteMany,
  };
};
