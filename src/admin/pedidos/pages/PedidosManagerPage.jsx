import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { productsApi } from '../../../api';
const REFERENTIAL_UNINITIALIAZED = -125;

const initialPedidoTemplate = {
  PedCli: REFERENTIAL_UNINITIALIAZED,
  PedFecAño: 0,
  PedFecMes: 0,
  PedFecDia: 0,
  TipEstPedCod: REFERENTIAL_UNINITIALIAZED,
  PedEstReg: 'A',
};

export const PedidosManagerPage = () => {
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [tiposEstadoPedido, setTiposEstadoPedido] = useState([]);
  const [selectedPedidos, setSelectedPedidos] = useState([]);
  // PEDIDOS' REACTIVE FORM
  const [activePedido, setActivePedido] = useState(initialPedidoTemplate);
  // END PEDIDOS' REACTIVE FORM
  const navigate = useNavigate();

  const onPedidoInputChange = ({ target }) => {
    setActivePedido((prevActivePedido) => ({
      ...prevActivePedido,
      [target.name]: target.value,
    }));
  };

  useEffect(() => {
    console.log(activePedido);
  }, [activePedido]);

  useEffect(() => {
    productsApi.get('/pedidos')
      .then(({ data: { pedidos: _pedidos } }) => setPedidos(_pedidos))
      .catch(console.error);

    productsApi.get('/usuarios')
      .then(({ data: { usuarios: _usuarios } }) => {
        const activeUsuarios = _usuarios.filter((_usuario) => _usuario.UsuEstReg === 'A');
        setClientes(activeUsuarios);
        setActivePedido((prevActivePedido) => ({
          ...prevActivePedido,
          PedCli: activeUsuarios?.[0]?.UsuCod ?? REFERENTIAL_UNINITIALIAZED,
        }));
      })
      .catch(console.error);

    productsApi.get('/tipos-estado-pedido')
      .then(({ data: { tiposEstadoPedido: _tiposEstadoPedido } }) => {
        const activeTiposEstadoPedido = _tiposEstadoPedido.filter((_tipoEstadoPedido) => _tipoEstadoPedido.TipEstPedEstReg === 'A');
        setTiposEstadoPedido(activeTiposEstadoPedido);
        setActivePedido((prevActivePedido) => ({
          ...prevActivePedido,
          TipEstPedCod: activeTiposEstadoPedido?.[0]?.TipEstPedCod ?? REFERENTIAL_UNINITIALIAZED,
        }));
      })
      .catch(console.error);
  }, []);

  const reset = () => {
    setSelectedPedidos([]);
  };

  const editarEstadosRegistro = (estadoRegistro) => async () => {
    const promises = selectedPedidos.map(async (pedNum) => {
      const { data: { pedido } } = await productsApi.patch(`/pedidos/${pedNum}`, {
        PedEstReg: estadoRegistro,
      });

      return pedido;
    });

    const results = await Promise.allSettled(promises);
    results.forEach((result) => {
      const pedido = result.value;

      setPedidos((prevPedidos) => prevPedidos.map((_pedido) => {
        if (_pedido.PedNum === pedido.PedNum) {
          return { ...pedido };
        }
        return { ..._pedido };
      }));
    });

    reset();
  };

  return (
    // eslint-disable-next-line
    <>
      <main>
        <header>
          <h1>Pedidos</h1>
        </header>

        <section>
          <h2>Registro de Pedido</h2>
          <section>
            <div>
              <label htmlFor="PedCli">Cliente:</label>
              <select
                name="PedCli"
                onChange={onPedidoInputChange}
                id="PedCli"
              >
                {
                  clientes.map((cliente) => (
                    <option
                      key={cliente.UsuCod}
                      value={cliente.UsuCod}
                    >
                      {/* eslint-disable-next-line */}
                      {cliente.UsuNom} {cliente.UsuApe}
                    </option>
                  ))
                }
              </select>
            </div>
            <div>
              <label htmlFor="PedFecAño">Fecha de Registro Año:</label>
              <input
                type="text"
                name="PedFecAño"
                onChange={onPedidoInputChange}
                placeholder="Fecha de Registro Año..."
                id="PedFecAño"
              />
            </div>
            <div>
              <label htmlFor="PedFecMes">Fecha de Registro Mes:</label>
              <input
                type="text"
                name="PedFecMes"
                onChange={onPedidoInputChange}
                placeholder="Fecha de Registro Mes..."
                id="PedFecMes"
              />
            </div>
            <div>
              <label htmlFor="PedFecDia">Fecha de Registro Dia:</label>
              <input
                type="text"
                name="PedFecDia"
                onChange={onPedidoInputChange}
                placeholder="Fecha de Registro Dia..."
                id="PedFecDia"
              />
            </div>
            <div>
              <label htmlFor="TipEstPedCod">Estado:</label>
              <select
                name="TipEstPedCod"
                onChange={onPedidoInputChange}
                id="TipEstPedCod"
              >
                {
                  tiposEstadoPedido.map((tipoEstadoPedido) => (
                    <option
                      key={tipoEstadoPedido.TipEstPedCod}
                      value={tipoEstadoPedido.TipEstPedCod}
                    >
                      {tipoEstadoPedido.TipEstPedDes}
                    </option>
                  ))
                }
              </select>
              {/* ARTICULOS */}
              <div>
                <label htmlFor="PedEstReg">Estado Registro:</label>
                <select
                  name="PedEstReg"
                  onChange={onPedidoInputChange}
                  id="PedEstReg"
                >
                  {
                    ['A', 'I', '*'].map((estadoRegistro) => (
                      <option
                        key={estadoRegistro}
                        value={estadoRegistro}
                      >
                        {estadoRegistro}
                      </option>
                    ))
                  }
                </select>
              </div>
            </div>
          </section>
        </section>

        <section>
          <h2>Tabla_Pedido</h2>
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectedPedidos.length === pedidos.length}
                    onChange={() => {
                      if (selectedPedidos.length === pedidos.length) {
                        setSelectedPedidos([]);
                      } else {
                        setSelectedPedidos(() => pedidos.map((pedido) => pedido.PedNum));
                      }
                    }}
                  />
                </th>
                <th>Número</th>
                <th>Cliente</th>
                <th>Fecha de Registro Año</th>
                <th>Fecha de Registro Mes</th>
                <th>Fecha de Registro Día</th>
                <th>Estado</th>
                <th>Artículos</th>
                <th>Estado Registro</th>
              </tr>
            </thead>
            <tbody>
              {
                pedidos.map((pedido) => (
                  <tr
                    key={pedido.PedNum}
                    onClick={() => {
                      if (!selectedPedidos.includes(pedido.PedNum)) {
                        // eslint-disable-next-line
                        setSelectedPedidos((prevSelectedPedidos) => [pedido.PedNum, ...prevSelectedPedidos]);
                      } else {
                        // eslint-disable-next-line
                        setSelectedPedidos((prevSelectedPedidos) => prevSelectedPedidos.filter((pedNum) => pedNum !== pedido.PedNum));
                      }
                    }}
                  >
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedPedidos.includes(pedido.PedNum)}
                        onChange={() => {}}
                      />
                    </td>
                    <td>{pedido.PedNum}</td>
                    <td>
                      <details>
                        <summary>Ver detalles...</summary>
                        <table>
                          <thead>
                            <tr>
                              <th>Código</th>
                              <th>Nombre Completo</th>
                              <th>Email</th>
                              <th>Teléfono</th>
                              <th>Dirección</th>
                              <th>Estado Registro</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{pedido.cliente.PedCliCod}</td>
                              {/* eslint-disable-next-line */}
                              <td>{pedido.cliente.PedCliNom} {pedido.cliente.PedCliApe}</td>
                              <td>{pedido.cliente.PedCliEma}</td>
                              <td>{pedido.cliente.PedCliTel}</td>
                              <td>{pedido.cliente.PedCliDir}</td>
                              <td>{pedido.cliente.PedCliEstReg}</td>
                            </tr>
                          </tbody>
                        </table>
                      </details>
                    </td>
                    <td>{pedido.PedFecAño}</td>
                    <td>{pedido.PedFecMes}</td>
                    <td>{pedido.PedFecDia}</td>
                    <td>{pedido.PedTipEstPed}</td>
                    <td>
                      <details>
                        <summary>Ver detalles...</summary>
                        <table>
                          <thead>
                            <tr>
                              <th>Código</th>
                              <th>Nombre</th>
                              <th>Precio Unitario</th>
                              <th>Cantidad Solicitada</th>
                              <th>Cantidad Despachada</th>
                              <th>Estado Registro</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              pedido.articulos.map((articulo) => (
                                <tr key={articulo.PedArtArtCod}>
                                  <td>{articulo.PedArtArtCod}</td>
                                  <td>{articulo.PedArtArtNom}</td>
                                  <td>{articulo.PedArtPreUni}</td>
                                  <td>{articulo.PedArtCanSol}</td>
                                  <td>{articulo.PedArtCanDes}</td>
                                  <td>{articulo.PedArtEstReg}</td>
                                </tr>
                              ))
                            }
                          </tbody>
                        </table>
                      </details>
                    </td>
                    <td>{pedido.PedEstReg}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </section>
        <menu>
          <button
            type="button"
          >
            Adicionar
          </button>
          <button
            type="button"
            disabled={selectedPedidos.length !== 1 || (
              // eslint-disable-next-line
              selectedPedidos.length === 1 && pedidos.find((pedido) => pedido.PedNum === selectedPedidos[0]).PedEstReg !== 'A'
            )}
          >
            Modificar
          </button>
          <button
            type="button"
            disabled={selectedPedidos.length === 0}
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
                editarEstadosRegistro('*')();
              }
            }}
          >
            Eliminar
          </button>
          <button
            type="button"
            onClick={reset}
          >
            Cancelar
          </button>

          <button
            type="button"
            disabled={selectedPedidos.length === 0}
            onClick={editarEstadosRegistro('I')}
          >
            Inactivar
          </button>
          <button
            type="button"
            disabled={selectedPedidos.length === 0}
            onClick={editarEstadosRegistro('A')}
          >
            Reactivar
          </button>
          <button
            type="button"
          >
            Actualizar
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin')}
          >
            Salir
          </button>
        </menu>
      </main>
    </>
  );
};

export default PedidosManagerPage;
