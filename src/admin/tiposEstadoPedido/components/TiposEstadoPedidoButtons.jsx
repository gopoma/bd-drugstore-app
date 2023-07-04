import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useTiposEstadoPedidoStore } from '../../../hooks';
import classes from '../../../styles/Buttons.module.css';

export const TiposEstadoPedidoButtons = () => {
  const navigate = useNavigate();
  const {
    isValidActiveTipoEstadoPedido,
    selectedTiposEstadoPedidoCount,
    tiposEstadoPedido,
    selectedTiposEstadoPedido,
    activeTipoEstadoPedido,
    startSavingTipoEstadoPedido,
    setActiveTipoEstadoPedido,
    cancelTiposEstadoPedido,
    deactivate,
    activate,
    deleteMany,
  } = useTiposEstadoPedidoStore();

  const onEdit = () => {
    const [idSelectedTipoEstadoPedido] = selectedTiposEstadoPedido;
    // eslint-disable-next-line
    const selectedTipoEstadoPedido = tiposEstadoPedido.find((TipoEstadoPedido) => TipoEstadoPedido.TipEstPedCod === idSelectedTipoEstadoPedido);
    setActiveTipoEstadoPedido(selectedTipoEstadoPedido);
  };

  const onExit = () => {
    cancelTiposEstadoPedido();
    navigate('/admin');
  };

  return (
    <section className={classes['container-buttons']}>
      <button
        type="button"
        disabled={Object.keys(activeTipoEstadoPedido).includes('TipEstPedCod') || !isValidActiveTipoEstadoPedido}
        onClick={startSavingTipoEstadoPedido}
      >
        Adicionar
      </button>
      <button
        type="button"
        disabled={selectedTiposEstadoPedidoCount !== 1}
        onClick={onEdit}
      >
        Modificar
      </button>
      <button
        type="button"
        disabled={selectedTiposEstadoPedidoCount === 0}
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
        onClick={cancelTiposEstadoPedido}
      >
        Cancelar
      </button>
      <button
        type="button"
        disabled={selectedTiposEstadoPedidoCount === 0}
        onClick={deactivate}
      >
        Inactivar
      </button>
      <button
        type="button"
        disabled={selectedTiposEstadoPedidoCount === 0}
        onClick={activate}
      >
        Reactivar
      </button>
      <button
        type="button"
        disabled={!Object.keys(activeTipoEstadoPedido).includes('TipEstPedCod') || !isValidActiveTipoEstadoPedido}
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
            startSavingTipoEstadoPedido();
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
