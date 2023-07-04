import { useDispatch, useSelector } from 'react-redux';
import { productsApi } from '../api';
import {
  onSetActiveTipoEstadoPedido,
  onAddNewTipoEstadoPedido,
  onLoadTiposEstadoPedido,
  onToggleAllTiposEstadoPedido,
  onCancelTiposEstadoPedido,
  onEditTipoEstadoPedido,
  onCleanSelectedTiposEstadoPedido,
  onToggleSelectTipoEstadoPedido,
} from '../store';

export const useTiposEstadoPedidoStore = () => {
  const dispatch = useDispatch();
  const {
    tiposEstadoPedido,
    activeTipoEstadoPedido,
    selectedTiposEstadoPedido,
  } = useSelector((state) => state.tiposEstadoPedido);

  const startLoadingTiposEstadoPedido = async () => {
    try {
      const { data } = await productsApi.get('/tipos-estado-pedido');
      dispatch(onLoadTiposEstadoPedido(data.tiposEstadoPedido));
    } catch (error) {
      console.log('Error cargando TiposEstadoPedido');
      console.error(error);
    }
  };

  const startSavingTipoEstadoPedido = async () => {
    try {
      if (activeTipoEstadoPedido.TipEstPedCod) {
        const { data } = await productsApi.patch(`/tipos-estado-pedido/${activeTipoEstadoPedido.TipEstPedCod}`, activeTipoEstadoPedido);
        dispatch(onEditTipoEstadoPedido({ ...data.tipoEstadoPedido }));
        return;
      }

      // Creando
      const { data } = await productsApi.post('/tipos-estado-pedido', activeTipoEstadoPedido);
      dispatch(onAddNewTipoEstadoPedido({ ...data.tipoEstadoPedido }));
    } catch (error) {
      console.log('Error guardando TipoEstadoPedido');
      console.error(error);
    }
  };

  const setActiveTipoEstadoPedido = (TipoEstadoPedido) => {
    dispatch(onSetActiveTipoEstadoPedido(TipoEstadoPedido));
  };

  const toggleSelectTipoEstadoPedido = (idTipoEstadoPedido) => {
    dispatch(onToggleSelectTipoEstadoPedido(idTipoEstadoPedido));
  };

  const cancelTiposEstadoPedido = () => {
    dispatch(onCancelTiposEstadoPedido());
  };

  const deactivate = async () => {
    const promises = selectedTiposEstadoPedido.map(async (idTipoEstadoPedido) => {
      const { data } = await productsApi.patch(`/tipos-estado-pedido/${idTipoEstadoPedido}`, { TipEstPedEstReg: 'I' });
      return data.tipoEstadoPedido;
    });

    const results = await Promise.allSettled(promises);
    results.forEach(({ value: TipoEstadoPedido }) => {
      dispatch(onEditTipoEstadoPedido(TipoEstadoPedido));
    });
    dispatch(onCleanSelectedTiposEstadoPedido());
  };

  const activate = async () => {
    const promises = selectedTiposEstadoPedido.map(async (idTipoEstadoPedido) => {
      const { data } = await productsApi.patch(`/tipos-estado-pedido/${idTipoEstadoPedido}`, { TipEstPedEstReg: 'A' });
      return data.tipoEstadoPedido;
    });

    const results = await Promise.allSettled(promises);
    results.forEach(({ value: TipoEstadoPedido }) => {
      dispatch(onEditTipoEstadoPedido(TipoEstadoPedido));
    });
    dispatch(onCleanSelectedTiposEstadoPedido());
  };

  const deleteMany = async () => {
    const promises = selectedTiposEstadoPedido.map(async (idTipoEstadoPedido) => {
      const { data } = await productsApi.patch(`/tipos-estado-pedido/${idTipoEstadoPedido}`, { TipEstPedEstReg: '*' });
      return data.tipoEstadoPedido;
    });

    const results = await Promise.allSettled(promises);
    results.forEach(({ value: TipoEstadoPedido }) => {
      dispatch(onEditTipoEstadoPedido(TipoEstadoPedido));
    });
    dispatch(onCleanSelectedTiposEstadoPedido());
  };

  const toggleAllTiposEstadoPedido = () => {
    dispatch(onToggleAllTiposEstadoPedido());
  };

  return {
    //* Propiedades
    tiposEstadoPedido,
    activeTipoEstadoPedido,
    isValidActiveTipoEstadoPedido: activeTipoEstadoPedido.TipEstPedDes.trim() !== '',
    selectedTiposEstadoPedido,
    selectedTiposEstadoPedidoCount: selectedTiposEstadoPedido.length,

    //* Métodos
    startLoadingTiposEstadoPedido,
    startSavingTipoEstadoPedido,
    setActiveTipoEstadoPedido,
    toggleSelectTipoEstadoPedido,
    cancelTiposEstadoPedido,
    toggleAllTiposEstadoPedido,
    deactivate,
    activate,
    deleteMany,
  };
};
