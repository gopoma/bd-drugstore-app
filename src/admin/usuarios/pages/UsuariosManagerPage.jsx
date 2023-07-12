import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

import { productsApi } from '../../../api';

const namedUserFields = [
  'Código', 'Nombres', 'Apellidos', 'Rol', 'Dirección', 'Email', 'Teléfono',
  'Fecha Inscripción Año', 'Fecha Incripción Mes', 'Fecha Inscripción Día',
  'Estado Registro',
];

const initialUserFields = {
  UsuNom: '',
  UsuApe: '',
  RolCod: -1,
  UsuDir: '',
  UsuEma: '',
  UsuTel: '',
  UsuEstReg: 'A',
};

export const UsuariosManagerPage = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [activeUser, setActiveUser] = useState(initialUserFields);
  const [roles, setRoles] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    productsApi.get('/usuarios/')
      .then(({ data: { usuarios: _usuarios } }) => setUsuarios(_usuarios))
      .catch(console.error);

    productsApi.get('/roles/')
      .then(({ data: { roles: _roles } }) => {
        const activeRoles = _roles.filter((rol) => rol.RolEstReg === 'A');

        setRoles([...activeRoles]);

        setActiveUser((prevActiveUser) => ({
          ...prevActiveUser,
          RolCod: activeRoles?.[0]?.RolCod ?? -1,
        }));
      });
  }, []);

  const onUserInputChange = ({ target }) => {
    setActiveUser((prevActiveUser) => ({
      ...prevActiveUser,
      [target.name]: target.value,
    }));
  };

  const reset = () => {
    setActiveUser({
      ...initialUserFields,
      RolCod: roles?.[0]?.RolCod ?? -1,
    });
    setSelectedUsers([]);
  };

  const onSaving = async () => {
    if (!Object.keys(activeUser).includes('UsuCod')) {
      // CREATE
      const { data: { usuario } } = await productsApi.post('/usuarios/', activeUser);
      setUsuarios((prevUsuarios) => [usuario, ...prevUsuarios]);
    } else {
      // EDIT
      console.log(activeUser);
      const { data: { usuario: _usuario } } = await productsApi.patch(`/usuarios/${activeUser.UsuCod}`, activeUser);
      setUsuarios((prevUsuarios) => prevUsuarios
        .map((usuario) => {
          if (usuario.UsuCod === _usuario.UsuCod) {
            return { ..._usuario };
          }
          return { ...usuario };
        }))
    }
    reset();
  };

  return (
    // eslint-disable-next-line
    <>
      <main>
        <h1>Usuarios</h1>
        <section>
          <h2>Registro de Usuario</h2>
          <div>
            <div>
              <label htmlFor="UsuNom">Nombres:</label>
              <input
                type="text"
                name="UsuNom"
                value={activeUser.UsuNom}
                onChange={onUserInputChange}
                placeholder="Nombres..."
                id="UsuNom"
              />
            </div>
            <div>
              <label htmlFor="UsuApe">Apellidos:</label>
              <input
                type="text"
                name="UsuApe"
                value={activeUser.UsuApe}
                onChange={onUserInputChange}
                placeholder="Apellidos..."
                id="UsuApe"
              />
            </div>
            <div>
              <label htmlFor="RolCod">Rol:</label>
              <select
                name="RolCod"
                value={activeUser.RolCod}
                onChange={onUserInputChange}
              >
                {
                  roles.map((rol) => (
                    <option
                      key={rol.RolCod}
                      value={rol.RolCod}
                    >
                      {rol.RolDes}
                    </option>
                  ))
                }
              </select>
            </div>
            <div>
              <label htmlFor="UsuDir">Dirección:</label>
              <input
                type="text"
                name="UsuDir"
                value={activeUser.UsuDir}
                onChange={onUserInputChange}
                placeholder="Dirección..."
                id="UsuDir"
              />
            </div>
            <div>
              <label htmlFor="UsuEma">Email:</label>
              <input
                type="email"
                name="UsuEma"
                value={activeUser.UsuEma}
                onChange={onUserInputChange}
                placeholder="Email..."
                id="UsuEma"
              />
            </div>
            <div>
              <label htmlFor="UsuTel">Teléfono:</label>
              <input
                type="text"
                name="UsuTel"
                value={activeUser.UsuTel}
                onChange={onUserInputChange}
                placeholder="Teléfono..."
                id="UsuTel"
              />
            </div>
            <div>
              <label htmlFor="UsuEstReg">Estado Registro:</label>
              <select
                name="UsuEstReg"
                value={activeUser.UsuEstReg}
                onChange={onUserInputChange}
                id="UsuEstReg"
              >
                {
                  ['A', 'I', '*'].map((e) => (
                    <option key={e} value={e}>{e}</option>
                  ))
                }
              </select>
            </div>
          </div>
        </section>
        <section>
          <h2>Tabla_Usuario</h2>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Electivo</th>
                  {
                    namedUserFields.map((namedField) => (
                      <th key={namedField}>{namedField}</th>
                    ))
                  }
                </tr>
              </thead>
              <tbody>
                {
                  usuarios.map((usuario) => (
                    <tr
                      key={usuario.UsuCod}
                      onClick={() => {
                        if (!selectedUsers.includes(usuario.UsuCod)) {
                          // eslint-disable-next-line
                          setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, usuario.UsuCod]);
                        } else {
                          setSelectedUsers((prevSelectedUsers) => prevSelectedUsers
                            .filter((selectedUser) => selectedUser !== usuario.UsuCod));
                        }
                      }}
                    >
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(usuario.UsuCod)}
                          onChange={() => {}}
                        />
                      </td>
                      {
                        Object.values(usuario).map((val) => (
                          <td key={uuidv4()}>{ val }</td>
                        ))
                      }
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </section>
        <section>
          <button
            type="button"
            onClick={onSaving}
          >
            Adicionar
          </button>
          <button
            type="button"
            disabled={selectedUsers.length !== 1
              || (selectedUsers.length === 1
              && usuarios.find((usuario) => usuario.UsuCod === selectedUsers[0]).UsuEstReg !== 'A')}
            onClick={() => {
              const selected = usuarios.find((usuario) => usuario.UsuCod === selectedUsers[0]);

              const RolCod = roles.find((rol) => rol.RolDes === selected.UsuRol).RolCod;
              const { UsuRol, ...data } = selected;

              setActiveUser({
                ...data,
                RolCod
              });
            }}
          >
            Modificar
          </button>
          <button
            type="button"
            disabled={selectedUsers.length === 0}
            onClick={async () => {
              const promises = selectedUsers.map(async (cod) => {
                const { data: { usuario } } = await productsApi.patch(`/usuarios/${cod}`, {
                  UsuEstReg: '*',
                });

                return usuario;
              });

              const results = await Promise.allSettled(promises);
              results.forEach((result) => {
                const _usuario = result.value;
                setUsuarios((prevUsuarios) => prevUsuarios
                  .map((usuario) => {
                    if (usuario.UsuCod === _usuario.UsuCod) {
                      return { ..._usuario };
                    }
                    return { ...usuario };
                  }));
              });
              reset();
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
            disabled={selectedUsers.length === 0}
            onClick={async () => {
              const promises = selectedUsers.map(async (cod) => {
                const { data: { usuario } } = await productsApi.patch(`/usuarios/${cod}`, {
                  UsuEstReg: 'I',
                });

                return usuario;
              });

              const results = await Promise.allSettled(promises);
              results.forEach((result) => {
                const _usuario = result.value;
                setUsuarios((prevUsuarios) => prevUsuarios
                  .map((usuario) => {
                    if (usuario.UsuCod === _usuario.UsuCod) {
                      return { ..._usuario };
                    }
                    return { ...usuario };
                  }));
              });
              reset();
            }}
          >
            Inactivar
          </button>
          <button
            type="button"
            disabled={selectedUsers.length === 0}
            onClick={async () => {
              const promises = selectedUsers.map(async (cod) => {
                const { data: { usuario } } = await productsApi.patch(`/usuarios/${cod}`, {
                  UsuEstReg: 'A',
                });

                return usuario;
              });

              const results = await Promise.allSettled(promises);
              results.forEach((result) => {
                const _usuario = result.value;
                setUsuarios((prevUsuarios) => prevUsuarios
                  .map((usuario) => {
                    if (usuario.UsuCod === _usuario.UsuCod) {
                      return { ..._usuario };
                    }
                    return { ...usuario };
                  }));
              });
              reset();
            }}
          >
            Reactivar
          </button>
          <button
            type="button"
            disabled={!Object.keys(activeUser).includes('UsuCod')}
            onClick={onSaving}
          >
            Actualizar
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin')}
          >
            Salir
          </button>
        </section>
      </main>
    </>
  );
};

export default UsuariosManagerPage;
