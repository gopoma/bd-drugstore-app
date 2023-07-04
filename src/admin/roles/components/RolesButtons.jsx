import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useRolesStore } from '../../../hooks';
import classes from '../../../styles/Buttons.module.css';

export const RolesButtons = () => {
  const navigate = useNavigate();
  const {
    isValidActiveRol,
    selectedRolesCount,
    roles,
    selectedRoles,
    activeRol,
    startSavingRol,
    setActiveRol,
    cancelRoles,
    deactivate,
    activate,
    deleteMany,
  } = useRolesStore();

  const onEdit = () => {
    const [idSelectedRol] = selectedRoles;
    // eslint-disable-next-line
    const selectedRol = roles.find((rol) => rol.RolCod === idSelectedRol);
    setActiveRol(selectedRol);
  };

  const onExit = () => {
    cancelRoles();
    navigate('/admin');
  };

  return (
    <section className={classes['container-buttons']}>
      <button
        type="button"
        disabled={Object.keys(activeRol).includes('RolCod') || !isValidActiveRol}
        onClick={startSavingRol}
      >
        Adicionar
      </button>
      <button
        type="button"
        disabled={selectedRolesCount !== 1}
        onClick={onEdit}
      >
        Modificar
      </button>
      <button
        type="button"
        disabled={selectedRolesCount === 0}
        onClick={async () => {
          const { isConfirmed } = await Swal.fire({
            title: 'Are you sure?',
            text: 'Are you sure that you want to delete these records?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085D6',
            cancelButtonColor: '#D33',
            confirmButtonText: 'Yes, delete it!',
          });

          if (isConfirmed) {
            deleteMany();
          }
        }}
      >
        Eliminar
      </button>
      <button
        type="button"
        onClick={cancelRoles}
      >
        Cancelar
      </button>
      <button
        type="button"
        disabled={selectedRolesCount === 0}
        onClick={deactivate}
      >
        Inactivar
      </button>
      <button
        type="button"
        disabled={selectedRolesCount === 0}
        onClick={activate}
      >
        Reactivar
      </button>
      <button
        type="button"
        disabled={!Object.keys(activeRol).includes('RolCod') || !isValidActiveRol}
        onClick={async () => {
          const { isConfirmed } = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085D6',
            cancelButtonColor: '#D33',
            confirmButtonText: 'Yes, edit it!',
          });

          if (isConfirmed) {
            startSavingRol();
          }
        }}
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
