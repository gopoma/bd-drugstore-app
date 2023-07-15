import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { productsApi } from '../../../api';

export const PedidosManagerPage = () => {
  const [pedidos, setPedidos] = useState([]);
  const [selectedPedidos, setSelectedPedidos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    productsApi.get('/pedidos')
      .then(({ data: { pedidos: _pedidos } }) => setPedidos(_pedidos))
      .catch(console.error);
  }, []);

  return (
    // eslint-disable-next-line
    <>
      <main>
        <header>
          <h1>Pedidos</h1>
        </header>

        <section>
          <h2>Registro de Pedido</h2>
          <section></section>
        </section>

        <section>
          <h2>Tabla_Pedido</h2>
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
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
          >
            Eliminar
          </button>
          <button
            type="button"
          >
            Cancelar
          </button>

          <button
            type="button"
            disabled={selectedPedidos.length === 0}
          >
            Inactivar
          </button>
          <button
            type="button"
            disabled={selectedPedidos.length === 0}
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
