import { useDispatch, useSelector } from 'react-redux';
import { productsApi } from '../api';
import {
  onSetActiveRol,
  onAddNewRol,
  onLoadRoles,
  onToggleAllRoles,
  onCancelRoles,
  onEditRol,
  onCleanSelectedRoles,
  onToggleSelectRol,
} from '../store';

export const useRolesStore = () => {
  const dispatch = useDispatch();
  const {
    roles,
    activeRol,
    selectedRoles,
  } = useSelector((state) => state.roles);

  const startLoadingRoles = async () => {
    try {
      const { data } = await productsApi.get('/roles');
      dispatch(onLoadRoles(data.roles));
    } catch (error) {
      console.log('Error cargando Roles');
      console.error(error);
    }
  };

  const startSavingRol = async () => {
    try {
      if (activeRol.RolCod) {
        const { data } = await productsApi.patch(`/roles/${activeRol.RolCod}`, activeRol);
        dispatch(onEditRol({ ...data.roles }));
        return;
      }

      // Creando
      const { data } = await productsApi.post('/roles', activeRol);
      dispatch(onAddNewRol({ ...data.rol }));
    } catch (error) {
      console.log('Error guardando Rol');
      console.error(error);
    }
  };

  const setActiveRol = (rol) => {
    dispatch(onSetActiveRol(rol));
  };

  const toggleSelectRol = (idRol) => {
    dispatch(onToggleSelectRol(idRol));
  };

  const cancelRoles = () => {
    dispatch(onCancelRoles());
  };

  const deactivate = async () => {
    const promises = selectedRoles.map(async (idRol) => {
      const { data } = await productsApi.patch(`/roles/${idRol}`, { RolEstReg: 'I' });
      return data.rol;
    });

    const results = await Promise.allSettled(promises);
    results.forEach(({ value: rol }) => {
      dispatch(onEditRol(rol));
    });
    dispatch(onCleanSelectedRoles());
  };

  const activate = async () => {
    const promises = selectedRoles.map(async (idRol) => {
      const { data } = await productsApi.patch(`/roles/${idRol}`, { RolEstReg: 'A' });
      return data.rol;
    });

    const results = await Promise.allSettled(promises);
    results.forEach(({ value: rol }) => {
      dispatch(onEditRol(rol));
    });
    dispatch(onCleanSelectedRoles());
  };

  const deleteMany = async () => {
    const promises = selectedRoles.map(async (idRol) => {
      const { data } = await productsApi.patch(`/roles/${idRol}`, { RolEstReg: '*' });
      return data.roles;
    });

    const results = await Promise.allSettled(promises);
    results.forEach(({ value: rol }) => {
      dispatch(onEditRol(rol));
    });
    dispatch(onCleanSelectedRoles());
  };

  const toggleAllRoles = () => {
    dispatch(onToggleAllRoles());
  };

  return {
    //* Propiedades
    roles,
    activeRol,
    isValidActiveRol: activeRol.RolDes.trim() !== '',
    selectedRoles,
    selectedRolesCount: selectedRoles.length,

    //* Métodos
    startLoadingRoles,
    startSavingRol,
    setActiveRol,
    toggleSelectRol,
    cancelRoles,
    toggleAllRoles,
    deactivate,
    activate,
    deleteMany,
  };
};
