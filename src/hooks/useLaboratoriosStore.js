import { useDispatch, useSelector } from 'react-redux';
import { productsApi } from '../api';
import {
  onSetActiveLaboratorio,
  onAddNewLaboratorio,
  onLoadLaboratorios,
  onToggleAllLaboratorios,
  onCancelLaboratorios,
  onEditLaboratorio,
  onCleanSelectedLaboratorios,
  onToggleSelectLaboratorio,
} from '../store';

export const useLaboratoriosStore = () => {
  const dispatch = useDispatch();
  const {
    laboratorios,
    activeLaboratorio,
    selectedLaboratorios,
  } = useSelector((state) => state.laboratorios);

  const startLoadingLaboratorios = async () => {
    try {
      const { data } = await productsApi.get('/laboratorios');
      dispatch(onLoadLaboratorios(data.laboratorios));
    } catch (error) {
      console.log('Error cargando laboratorios');
      console.error(error);
    }
  };

  const startSavingLaboratorio = async () => {
    try {
      if (activeLaboratorio.LabCod) {
        const { data } = await productsApi.patch(`/laboratorios/${activeLaboratorio.LabCod}`, activeLaboratorio);
        dispatch(onEditLaboratorio({ ...data.laboratorio }));
        return;
      }

      // Creando
      const { data } = await productsApi.post('/laboratorios', activeLaboratorio);
      dispatch(onAddNewLaboratorio({ ...data.laboratorio }));
    } catch (error) {
      console.log('Error guardando laboratorio');
      console.error(error);
    }
  };

  const setActiveLaboratorio = (laboratorio) => {
    dispatch(onSetActiveLaboratorio(laboratorio));
  };

  const toggleSelectLaboratorio = (idLaboratorio) => {
    dispatch(onToggleSelectLaboratorio(idLaboratorio));
  };

  const cancelLaboratorios = () => {
    dispatch(onCancelLaboratorios());
  };

  const deactivate = async () => {
    const promises = selectedLaboratorios.map(async (idLaboratorio) => {
      const { data } = await productsApi.patch(`/laboratorios/${idLaboratorio}`, { LabEstReg: 'I' });
      return data.laboratorio;
    });

    const results = await Promise.allSettled(promises);
    results.forEach(({ value: laboratorio }) => {
      dispatch(onEditLaboratorio(laboratorio));
    });
    dispatch(onCleanSelectedLaboratorios());
  };

  const activate = async () => {
    const promises = selectedLaboratorios.map(async (idLaboratorio) => {
      const { data } = await productsApi.patch(`/laboratorios/${idLaboratorio}`, { LabEstReg: 'A' });
      return data.laboratorio;
    });

    const results = await Promise.allSettled(promises);
    results.forEach(({ value: laboratorio }) => {
      dispatch(onEditLaboratorio(laboratorio));
    });
    dispatch(onCleanSelectedLaboratorios());
  };

  const deleteMany = async () => {
    const promises = selectedLaboratorios.map(async (idLaboratorio) => {
      const { data } = await productsApi.patch(`/laboratorios/${idLaboratorio}`, { LabEstReg: '*' });
      return data.laboratorio;
    });

    const results = await Promise.allSettled(promises);
    results.forEach(({ value: laboratorio }) => {
      dispatch(onEditLaboratorio(laboratorio));
    });
    dispatch(onCleanSelectedLaboratorios());
  };

  const toggleAllLaboratorios = () => {
    dispatch(onToggleAllLaboratorios());
  };

  return {
    //* Propiedades
    laboratorios,
    activeLaboratorio,
    isValidActiveLaboratorio: activeLaboratorio.LabDes.trim() !== '',
    selectedLaboratorios,
    selectedLaboratoriosCount: selectedLaboratorios.length,

    //* Métodos
    startLoadingLaboratorios,
    startSavingLaboratorio,
    setActiveLaboratorio,
    toggleSelectLaboratorio,
    cancelLaboratorios,
    toggleAllLaboratorios,
    deactivate,
    activate,
    deleteMany,
  };
};
