import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { productsApi } from '../../../api';

const articuloNamedFields = [
  'Código', 'Nombre', 'Laboratorio', 'Categoría', 'Tipo Unidad Medida',
  'Fecha Vencimiento Año', 'Fecha Vencimiento Mes', 'Fecha Vencimiento Día',
  'Precio Unitario', 'Stock', 'Estado Registro',
];

const activeArticuloTemplate = {
  ArtNom: '',
  ArtLab: -1,
  ArtCat: -1,
  ArtTipUniMed: -1,
  ArtFecVenAño: 0,
  ArtFecVenDia: 0,
  ArtFecVenMes: 0,
  ArtPreUni: 0,
  ArtSto: 0,
  ArtEstReg: 'A',
};

export const ArticulosManagerPage = () => {
  const [articulos, setArticulos] = useState([]);
  const [laboratorios, setLaboratorios] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [tiposUnidadMedida, setTiposUnidadMedida] = useState([]);
  const [activeArticulo, setActiveArticulo] = useState(activeArticuloTemplate);
  const formSubmitButton = useRef();
  const [selectedArticulos, setSelectedArticulos] = useState([]);
  const navigate = useNavigate();

  const onInputChange = ({ target }) => {
    setActiveArticulo({
      ...activeArticulo,
      [target.name]: target.value,
    });
  };

  useEffect(() => {
    productsApi.get('/articulos/')
      .then(({ data: { articulos: _articulos } }) => setArticulos(_articulos))
      .catch(console.error);

    productsApi.get('/laboratorios/')
      .then(({ data: { laboratorios: _laboratorios } }) => {
        const activeLaboratorios = _laboratorios.filter((laboratorio) => laboratorio.LabEstReg === 'A');
        setLaboratorios(activeLaboratorios);
        setActiveArticulo((prevActiveArticulo) => {
          return {
            ...prevActiveArticulo,
            ArtLab: activeLaboratorios?.[0]?.LabCod ?? -1,
          };
        });
      })
      .catch(console.error);

    productsApi.get('/categorias/')
      .then(({ data: { categorias: _categorias } }) => {
        const activeCategorias = _categorias.filter((categoria) => categoria.CatEstReg === 'A');
        setCategorias(activeCategorias);
        setActiveArticulo((prevActiveArticulo) => {
          return {
            ...prevActiveArticulo,
            ArtCat: activeCategorias?.[0]?.CatCod,
          };
        });
      })
      .catch(console.error);

    productsApi.get('/tipos-unidad-medida/')
      .then(({ data: { tiposUnidadMedida: _tiposUnidadMedida } }) => {
        const activeTiposUnidadMedida = _tiposUnidadMedida.filter((tipoUnidadMedida) => tipoUnidadMedida.TipUniMedEstReg === 'A');
        setTiposUnidadMedida(activeTiposUnidadMedida);
        setActiveArticulo((prevActiveArticulo) => {
          return {
            ...prevActiveArticulo,
            ArtTipUniMed: activeTiposUnidadMedida?.[0]?.TipUniMedCod ?? -1,
          };
        });
      })
      .catch(console.error);
  }, []);

  const onSaveArticulo = (e) => {
    e.preventDefault();
    if (!Object.keys(activeArticulo).includes('ArtCod')) {
      productsApi.post('/articulos/', activeArticulo)
        .then(({ data: { articulo } }) => {
          setArticulos([articulo, ...articulos]);
        })
        .catch(console.error);
    } else {
      productsApi.patch(`/articulos/${activeArticulo.ArtCod}`, activeArticulo)
        .then(({ data: { articulo: _articulo } }) => {
          setArticulos(articulos.map((articulo) => {
            if (articulo.ArtCod === _articulo.ArtCod) {
              return { ..._articulo };
            }
            return { ...articulo };
          }));
        })
        .catch(console.error);
    }

    setActiveArticulo({
      ...activeArticuloTemplate,
      ArtLab: laboratorios?.[0]?.LabCod ?? -1,
      ArtCat: categorias?.[0]?.CatCod ?? -1,
      ArtTipUniMed: tiposUnidadMedida?.[0]?.CatCod ?? -1,
    });
  };

  return (
    <>
      <main>
        <h1>Artículos</h1>
        <section>
          <form onSubmit={onSaveArticulo}>
            <div>
              <label htmlFor="ArtNom">Nombre:</label>
              <input
                type="text"
                name="ArtNom"
                value={activeArticulo.ArtNom}
                onChange={onInputChange}
                id="ArtNom"
                required
              />
            </div>

            <div>
              <label htmlFor="ArtLab">Laboratorio:</label>
              <select
                name="ArtLab"
                onChange={onInputChange}
                value={activeArticulo.ArtLab}
                id="ArtLab"
              >
                {
                  laboratorios.map((laboratorio) => (
                    <option
                      key={laboratorio.LabCod}
                      value={laboratorio.LabCod}
                    >
                      {laboratorio.LabDes}
                    </option>
                  ))
                }
              </select>
            </div>

            <div>
              <label htmlFor="ArtCat">Categoría:</label>
              <select
                name="ArtCat"
                onChange={onInputChange}
                value={activeArticulo.ArtCat}
                id="ArtCat"
              >
                {
                  categorias.map((categoria) => (
                    <option
                      key={categoria.CatCod}
                      value={categoria.CatCod}
                    >
                      {categoria.CatDes}
                    </option>
                  ))
                }
              </select>
            </div>

            <div>
              <label htmlFor="ArtTipUniMed">Tipo Unidad Medida:</label>
              <select
                name="ArtTipUniMed"
                onChange={onInputChange}
                value={activeArticulo.ArtTipUniMed}
                id="ArtTipUniMed"
              >
                {
                  tiposUnidadMedida.map((tipoUnidadMedida) => (
                    <option
                      key={tipoUnidadMedida.TipUniMedCod}
                      value={tipoUnidadMedida.TipUniMedCod}
                    >
                      {tipoUnidadMedida.TipUniMedDes}
                    </option>
                  ))
                }
              </select>

            </div>
            <div>
              <label htmlFor="ArtFecVenAño">Fecha Vencimiento Año:</label>
              <input
                type="text"
                min="1"
                name="ArtFecVenAño"
                value={activeArticulo.ArtFecVenAño}
                onChange={onInputChange}
                id="ArtFecVenAño"
                required
              />
            </div>
            <div>
              <label htmlFor="ArtFecVenMes">Fecha Vencimiento Mes:</label>
              <input
                type="text"
                min="1"
                name="ArtFecVenMes"
                value={activeArticulo.ArtFecVenMes}
                onChange={onInputChange}
                id="ArtFecVenMes"
                required
              />
            </div>
            <div>
              <label htmlFor="ArtFecVenDia">Fecha Vencimiento Día:</label>
              <input
                type="text"
                min="1"
                name="ArtFecVenDia"
                value={activeArticulo.ArtFecVenDia}
                onChange={onInputChange}
                id="ArtFecVenDia"
                required
              />
            </div>
            <div>
              <label htmlFor="ArtPreUni">Precio Unitario:</label>
              <input
                type="text"
                name="ArtPreUni"
                value={activeArticulo.ArtPreUni}
                onChange={onInputChange}
                id="ArtPreUni"
                required
              />
            </div>
            <div>
              <label htmlFor="ArtSto">Stock:</label>
              <input
                type="text"
                min="1"
                name="ArtSto"
                value={activeArticulo.ArtSto}
                onChange={onInputChange}
                id="ArtSto"
                required
              />
            </div>
            <div>
              <label htmlFor="ArtSto">Estado Registro:</label>
              <select
                name="ArtEstReg"
                value={activeArticulo.ArtEstReg}
                onChange={onInputChange}
                id="ArtEstReg"
                required
              >
                {['A', 'I', '*'].map((estadoRegistro) => (
                  <option key={estadoRegistro} value={estadoRegistro}>{estadoRegistro}</option>
                ))}
              </select>
            </div>
            {/* eslint-disable-next-line */}
            <button
              type="submit"
              style={{ display: 'hidden' }}
              ref={formSubmitButton}
            />
          </form>
        </section>
        <section>
          <h2>Tabla_Artículo</h2>
          <table>
            <thead>
              <tr>
                <th>Electivos</th>
                {
                  articuloNamedFields.map((field) => (
                    <th key={field}>{field}</th>
                  ))
                }
              </tr>
            </thead>
            <tbody>
              {
                articulos.map((articulo) => (
                  <tr key={articulo.ArtCod}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedArticulos.includes(articulo.ArtCod)}
                        onChange={() => {
                          if (selectedArticulos.includes(articulo.ArtCod)) {
                            // eslint-disable-next-line
                            setSelectedArticulos(selectedArticulos.filter((selectedArticulo) => selectedArticulo !== articulo.ArtCod));
                          } else {
                            setSelectedArticulos([...selectedArticulos, articulo.ArtCod]);
                          }
                        }}
                      />
                    </td>
                    {
                      Object.values(articulo).map((value) => (
                        <td key={uuidv4()}>{ value }</td>
                      ))
                    }
                  </tr>
                ))
              }
            </tbody>
          </table>
        </section>
        <section>
          <button
            type="button"
            onClick={() => formSubmitButton.current.click()}
          >
            Adicionar
          </button>
          <button
            type="button"
            disabled={selectedArticulos.length !== 1
              || (selectedArticulos.length === 1
              && articulos.find((e) => e.ArtCod === selectedArticulos[0])).ArtEstReg !== 'A'}
            onClick={() => {
              const target = articulos.find((articulo) => articulo.ArtCod === selectedArticulos[0]);
              const r = {
                ...target,
                ArtLab: laboratorios.find((e) => e.LabDes === target.ArtLab).LabCod,
                ArtCat: categorias.find((e) => e.CatDes === target.ArtCat).CatCod,
                // eslint-disable-next-line
                ArtTipUniMed: tiposUnidadMedida.find((e) => e.TipUniMedDes === target.ArtTipUniMed).TipUniMedCod,
              };
              setActiveArticulo({ ...r });
            }}
          >
            Modificar
          </button>
          <button
            type="button"
            disabled={selectedArticulos.length === 0}
            onClick={async () => {
              const promises = selectedArticulos.map((cod) => {
                return productsApi.patch(`/articulos/${cod}`, { ArtEstReg: '*' });
              });

              const results = await Promise.allSettled(promises);
              results.forEach((result) => {
                const { data: { articulo: _articulo } } = result.value;
                setArticulos((prevArticulos) => prevArticulos.map((articulo) => {
                  if (articulo.ArtCod === _articulo.ArtCod) {
                    return { ..._articulo };
                  }
                  return { ...articulo };
                }));
              });
              setSelectedArticulos([]);
            }}
          >
            Eliminar
          </button>
          <button
            type="button"
            onClick={() => setActiveArticulo({
              ...activeArticuloTemplate,
              ArtLab: laboratorios?.[0]?.LabCod ?? -1,
              ArtCat: categorias?.[0]?.CatCod ?? -1,
              ArtTipUniMed: tiposUnidadMedida?.[0]?.CatCod ?? -1,
            })}
          >
            Cancelar
          </button>
          <button
            type="button"
            disabled={selectedArticulos.length === 0}
            onClick={async () => {
              const promises = selectedArticulos.map((cod) => {
                return productsApi.patch(`/articulos/${cod}`, { ArtEstReg: 'I' });
              });

              const results = await Promise.allSettled(promises);
              results.forEach((result) => {
                const { data: { articulo: _articulo } } = result.value;
                setArticulos((prevArticulos) => prevArticulos.map((articulo) => {
                  if (articulo.ArtCod === _articulo.ArtCod) {
                    return { ..._articulo };
                  }
                  return { ...articulo };
                }));
              });
              setSelectedArticulos([]);
            }}
          >
            Inactivar
          </button>
          <button
            type="button"
            disabled={selectedArticulos.length === 0}
            onClick={async () => {
              const promises = selectedArticulos.map((cod) => {
                return productsApi.patch(`/articulos/${cod}`, { ArtEstReg: 'A' });
              });

              const results = await Promise.allSettled(promises);
              results.forEach((result) => {
                const { data: { articulo: _articulo } } = result.value;
                setArticulos((prevArticulos) => prevArticulos.map((articulo) => {
                  if (articulo.ArtCod === _articulo.ArtCod) {
                    return { ..._articulo };
                  }
                  return { ...articulo };
                }));
              });
              setSelectedArticulos([]);
            }}
          >
            Reactivar
          </button>
          <button
            type="button"
            disabled={!Object.keys(activeArticulo).includes('ArtCod')}
            onClick={onSaveArticulo}
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
      <span>...</span>
    </>
  );
};

export default ArticulosManagerPage;
