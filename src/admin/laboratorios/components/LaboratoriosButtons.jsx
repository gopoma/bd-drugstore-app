import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useLaboratoriosStore } from '../../../hooks';
import classes from '../../../styles/Buttons.module.css';

export const LaboratoriosButtons = () => {
  const navigate = useNavigate();
  const {
    isValidActiveLaboratorio,
    selectedLaboratoriosCount,
    laboratorios,
    selectedLaboratorios,
    activeLaboratorio,
    startSavingLaboratorio,
    setActiveLaboratorio,
    cancelLaboratorios,
    deactivate,
    activate,
    deleteMany,
  } = useLaboratoriosStore();

  const onEdit = () => {
    const [idSelectedLaboratorio] = selectedLaboratorios;
    // eslint-disable-next-line
    const selectedLaboratorio = laboratorios.find((laboratorio) => laboratorio.LabCod === idSelectedLaboratorio);
    setActiveLaboratorio(selectedLaboratorio);
  };

  const onExit = () => {
    cancelLaboratorios();
    navigate('/admin');
  };

  return (
    <section className={classes['container-buttons']}>
      <button
        type="button"
        disabled={Object.keys(activeLaboratorio).includes('LabCod') || !isValidActiveLaboratorio}
        onClick={startSavingLaboratorio}
      >
        Adicionar
      </button>
      <button
        type="button"
        disabled={selectedLaboratoriosCount !== 1}
        onClick={onEdit}
      >
        Modificar
      </button>
      <button
        type="button"
        disabled={selectedLaboratoriosCount === 0}
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
        onClick={cancelLaboratorios}
      >
        Cancelar
      </button>
      <button
        type="button"
        disabled={selectedLaboratoriosCount === 0}
        onClick={deactivate}
      >
        Inactivar
      </button>
      <button
        type="button"
        disabled={selectedLaboratoriosCount === 0}
        onClick={activate}
      >
        Reactivar
      </button>
      <button
        type="button"
        disabled={!Object.keys(activeLaboratorio).includes('LabCod') || !isValidActiveLaboratorio}
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
            startSavingLaboratorio();
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
