import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useTiposUnidadMedidaStore } from '../../../hooks';
import classes from '../../../styles/Buttons.module.css';
import { isSelectedItemEditable } from '../../../helpers';

export const TiposUnidadMedidaButtons = () => {
  const navigate = useNavigate();
  const {
    isValidActiveTipoUnidadMedida,
    selectedTiposUnidadMedidaCount,
    tiposUnidadMedida,
    selectedTiposUnidadMedida,
    activeTipoUnidadMedida,
    startSavingTipoUnidadMedida,
    setActiveTipoUnidadMedida,
    cancelTiposUnidadMedida,
    deactivate,
    activate,
    deleteMany,
  } = useTiposUnidadMedidaStore();

  const onEdit = () => {
    const [idSelectedTipoUnidadMedida] = selectedTiposUnidadMedida;
    // eslint-disable-next-line
    const selectedTipoUnidadMedida = tiposUnidadMedida.find((tipoUnidadMedida) => tipoUnidadMedida.TipUniMedCod === idSelectedTipoUnidadMedida);
    setActiveTipoUnidadMedida(selectedTipoUnidadMedida);
  };

  const onExit = () => {
    cancelTiposUnidadMedida();
    navigate('/admin');
  };

  return (
    <section className={classes['container-buttons']}>
      <button
        type="button"
        disabled={Object.keys(activeTipoUnidadMedida).includes('TipUniMedCod') || !isValidActiveTipoUnidadMedida}
        onClick={startSavingTipoUnidadMedida}
      >
        Adicionar
      </button>
      <button
        type="button"
        disabled={!isSelectedItemEditable({
          selectedItems: selectedTiposUnidadMedida,
          items: tiposUnidadMedida,
          restrictTo: ['I', '*'],
        })}
        onClick={onEdit}
      >
        Modificar
      </button>
      <button
        type="button"
        disabled={selectedTiposUnidadMedidaCount === 0}
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
        onClick={cancelTiposUnidadMedida}
      >
        Cancelar
      </button>
      <button
        type="button"
        disabled={selectedTiposUnidadMedidaCount === 0}
        onClick={deactivate}
      >
        Inactivar
      </button>
      <button
        type="button"
        disabled={selectedTiposUnidadMedidaCount === 0}
        onClick={activate}
      >
        Reactivar
      </button>
      <button
        type="button"
        disabled={!Object.keys(activeTipoUnidadMedida).includes('TipUniMedCod') || !isValidActiveTipoUnidadMedida}
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
            startSavingTipoUnidadMedida();
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
