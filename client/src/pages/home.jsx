import Nav from '../components/Nav';
import Sidebar from '../components/sidebar';
import Footer from '../components/footer';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMaterias, getData, getdataEstSem, EstMateria, get_Nota_Sem, getdocx } from '../app/Actions/action';
import { setLoadDownload } from "../app/FeatureSlices/interuptor/suiche"
import * as echarts from 'echarts';
import { SiMicrosoftword } from "react-icons/si";
import gif from "../../src/assets/Loading_2.gif"

const data = {
  semestre: '0',
  periodo_academico: 0,
  programa_id: 0,
}

const Documento = {
  periodo_academico: '',
  ImagenPie: '',
  ImagenBar: '',
  Estudiantes: [],
}



const Home = () => {
  
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const clickDown = async () => {
    dispatch(setLoadDownload(true));

    if (Documento.ImagenPie === '' || Documento.ImagenBar === '' || Documento.Estudiantes.length === 0) {
      setPagina({ pagina0: true, pagina1: false, pagina2: false, pagina3: false });
      await delay(1000);
      setPagina({ pagina0: false, pagina1: true, pagina2: false, pagina3: false });
      await delay(1000);
      setPagina({ pagina0: false, pagina1: false, pagina2: true, pagina3: false });
      dispatch(setLoadDownload(true));
      await delay(1000);
      dispatch(getdocx(Documento));
    } else {
      dispatch(getdocx(Documento));
    }
  };

  const [Pagina, setPagina] = useState({
    pagina0: true,
    pagina1: false,
    pagina2: false,
    pagina3: false,
  })

  const [colapse, setPColapse] = useState(true)

  const [EstSortMaterias, setEstSortMaterias] = useState([]);

  const handleCheckboxChange = () => {
    setPColapse(!colapse);
  };

  const token = localStorage.getItem('token');
  const { navState } = useSelector(state => state.tema);
  const { notasperma, EstSemestre, EstMaterias, periodoAcademico, notasperproSem } = useSelector(state => state.data);
  const { loadDowloadDoc } = useSelector(state => state.interuptor);

  var x = localStorage.getItem('userdecode')
  var u = JSON.parse(x)



  useEffect(() => {

    if (Array.isArray(EstMaterias) && Array.isArray(EstSemestre)) {
      Documento.Estudiantes = EstSemestre;
      let sortMaterias = []
      EstSemestre.forEach((e, i) => {
        let objtemp = EstMaterias.find(el => e.nombres === el.nombres);
        sortMaterias[i] = objtemp;

      })
      setEstSortMaterias(sortMaterias)
    }
  }, [EstSemestre, EstMaterias])

  const [obj, setobj] = useState({})
  var dispatch = useDispatch()
  useEffect(() => {
    dispatch(getData(token));

    const datau = JSON.parse(x);
    if (datau.user) {
      let obju = JSON.parse(datau.user.Datos)
      setobj(obju)
    }
  }, [x, dispatch, token])

  //




  //tabla de estudiantes por semestre
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * 10;
  const indexOfFirstItem = indexOfLastItem - 10;
  const currentItems = EstSemestre?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(EstSemestre?.length / 10);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  //busqueda 
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };


  useEffect(() => {

    const filteredItems = EstMaterias?.filter((item) => {
      return (
        item.nombres.toLowerCase().includes(searchTerm.toLowerCase()) && searchTerm !== ''

      )
    })
    setEstudianteMat(filteredItems);
  }, [EstMaterias, searchTerm]);



  //buscar y colocar a la otra tabla
  const [estudianteMat, setEstudianteMat] = useState([])

  const [paginaActual, setPaginaActual] = useState(1);
  const objetosPorPagina = 1; // Número de objetos por página

  useEffect(() => {
    const mostrarObjetosDePagina = () => {
      const indiceInicio = (paginaActual - 1) * objetosPorPagina;
      const indiceFin = indiceInicio + objetosPorPagina;
      return EstSortMaterias?.slice(indiceInicio, indiceFin);
    };
    setEstudianteMat(mostrarObjetosDePagina)
  }, [EstSortMaterias, paginaActual])
  // Función para mostrar los objetos de la página actual


  // Función para ir a la página anterior
  const irAPaginaAnterior = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  };

  // Función para ir a la página siguiente
  const irAPaginaSiguiente = () => {
    const ultimaPagina = Math.ceil(EstMaterias?.length / objetosPorPagina);
    if (paginaActual < ultimaPagina) {
      setPaginaActual(paginaActual + 1);
    }
  };

  const findEstInMaterias = (Nombre) => {
    let obj = EstSortMaterias?.find((item) => item.nombres === Nombre)

    let indice = EstSortMaterias?.indexOf(obj);


    if (indice !== -1) {
      setPaginaActual(indice + 1)
    }

  }


  useEffect(() => {
    if (u.user.RolId === 3 || u.user.RolId === 2) {
      let dato0 = notasperproSem;
      let dato1 = notasperma;

      if (Pagina.pagina0 === true && Pagina.pagina1 === false && Pagina.pagina2 === false && Pagina.pagina3 === false) {
        ChageChart1(dato0)
      }
      if (Pagina.pagina0 === false && Pagina.pagina1 === true && Pagina.pagina2 === false && Pagina.pagina3 === false) {
        ChageChart3(dato1)
      }

    }

  }, [notasperproSem, notasperma, Pagina.pagina1, Pagina.pagina0, Pagina.pagina3])

  const ChageChart1 = (e) => {

    let myChar = echarts.init(document.getElementById('main1'));

    window.addEventListener("resize", function () {
      myChar.resize();
    });


    var option = {
      title: {
        show: true,
        text: `Notas por rango ${obj?.ProgramaName} `,
        left: 'center',

      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)'
      },
      toolbox: {
        show: true,
        feature: {
          dataView: { show: false, readOnly: false },
          restore: { show: false },
          saveAsImage: { show: false }
        }
      },
      legend: {
        orient: 'horizontal',
        top: '90%',

      },
      series: [
        {
          type: 'pie',
          radius: '50%',
          data: e,
          label: {
            formatter: '{d}%',
            fontSize: 15
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };


    option && myChar.setOption(option);

    setTimeout(() => {
      Documento.ImagenPie = myChar.getConnectedDataURL({
        backgroundColor: '#fff',
        pixelRatio: 1,
        excludeComponents: ['toolbox'],
        type: 'png',
        quality: 80
      });

    }, 1000)



  }
  const ChageChart3 = (e) => {
    let myChart = echarts.init(document.getElementById('main3'));

    window.addEventListener("resize", function () {
      myChart.resize();
    });

    let option = {
      title: {
        show: true,
        text: `Materias ${obj?.Semestres} Semestre Académico`,
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          crossStyle: {
            color: '#999'
          }
        }
      },
      toolbox: {
        feature: {
          dataView: { show: false, readOnly: false },
          restore: { show: false },
          saveAsImage: { show: false }
        }
      },
      legend: {
        data: ['Ganaron', 'Perdieron'],
        orient: 'horizontal',
        top: '97%'
      },
      grid: {
        left: '50%',
        right: '2%',
        top: '8%',
        bottom: '10%'
      },
      yAxis: [
        {
          type: 'category',
          data: e?.Materia,
          axisLabel: {
            interval: 0,
            rotate: 0,
            margin: 10,
            fontSize: 12, // Ajusta el tamaño de la fuente

          },
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      xAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Perdieron',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
          },
          tooltip: {
            valueFormatter: function (value) {
              return value;
            }
          },
          emphasis: {
            focus: 'series'
          },
          data: e?.Perdio
        },
        {
          name: 'Ganaron',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
          },
          tooltip: {
            valueFormatter: function (value) {
              return value;

            }
          },
          emphasis: {
            focus: 'series'
          },
          data: e.Gano
        }
      ]
    };



    option && myChart.setOption(option);

    setTimeout(() => {
      Documento.ImagenBar = myChart.getConnectedDataURL({
        backgroundColor: '#fff',
        pixelRatio: 1,
        excludeComponents: ['toolbox'],
        type: 'png',
        quality: 80
      });

    }, 1000);
  }


  useEffect(() => {
    if (periodoAcademico && periodoAcademico.length > 0) {
      const maxIdObject = periodoAcademico.reduce((max, obj) => (obj.id > max.id ? obj : max), periodoAcademico[0]);

      if (maxIdObject) {
        Documento.periodo_academico = `${maxIdObject.NomNotaPeriodo} - Semestre ${obj?.Semestres}`;
      }

      data.periodo_academico = parseInt(maxIdObject?.id);
      data.semestre = obj?.Semestres;
      data.programa_id = parseInt(obj?.Programa);

      dispatch(get_Nota_Sem({
        "programa_id": data.programa_id.toString(),
        "semestre": obj?.Semestres,
        "periodo_academico": data.periodo_academico
      }));
      dispatch(getMaterias({
        "programa_id": data.programa_id,
        "semestre": obj?.Semestres,
        "periodo_academico": data.periodo_academico
      }));
      dispatch(getdataEstSem(data));
      dispatch(EstMateria(data));
    }
  }, [periodoAcademico]);

  return (
    <>
      <Nav />
      <div className='flex flex-row justify-content-around'>
    {navState === 'menu' && <Sidebar props={1} /> }
    
        {u.user?.RolId === 3 || u.user?.RolId === 2 ? (
          <div className="flex flex-col items-center w-full h-1/2 z-0">

            <div className="card card-compact w-4/5 bg-base-100 shadow-xl mt-6">
              <div className="card-body flex-row">
                <div className="flex flex-col flex-wrap items-center p-1 mx-auto ">
                  <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded  ">
                    <li className={` ${Pagina.pagina0 ? 'bg-primary rounded-lg' : ''}`}><a onClick={() => setPagina({ pagina0: true, pagina1: false, pagina2: false, pagina3: false, })}>G. Notas</a></li>
                    <li className={` ${Pagina.pagina1 ? 'bg-primary rounded-lg' : ''}`}><a onClick={() => setPagina({ pagina0: false, pagina1: true, pagina2: false, pagina3: false, })}>G. Materias</a></li>
                    <li className={` ${Pagina.pagina2 ? 'bg-primary rounded-lg' : ''}`}><a onClick={() => setPagina({ pagina0: false, pagina1: false, pagina2: true, pagina3: false, })}>Estudiantes</a></li>
                    <li className={` ${Pagina.pagina3 ? 'bg-primary rounded-lg' : ''}`}><a onClick={() => setPagina({ pagina0: false, pagina1: false, pagina2: false, pagina3: true, })}>Detalle estudiante</a></li>
                  </ul>
                  <br />
                  {Pagina.pagina3 === false && <div className='px-auto'>
                    <select className="select select-ghost w-4/6 max-w-xs"
                      id="SelectData"
                      onChange={(e) => {
                        const selectedOptionText = e.target.options[e.target.selectedIndex].text;
                        Documento.periodo_academico = `${selectedOptionText} - Semestre ${obj?.Semestres}`;
                        data.semestre = obj?.Semestres
                        data.periodo_academico = parseInt(e.target.value)
                        data.programa_id = parseInt(obj?.Programa)
                        dispatch(get_Nota_Sem({ "programa_id": data.programa_id.toString(), "semestre": obj?.Semestres, "periodo_academico": data.periodo_academico }))
                        dispatch(getMaterias({ "programa_id": data.programa_id, "semestre": data.semestre, "periodo_academico": data.periodo_academico }))
                        dispatch(getdataEstSem(data));
                        dispatch(EstMateria(data));
                      }}


                    >
                      <option defaultValue={0}>Periodo academico</option>
                      {periodoAcademico?.map((e) => (
                        <option key={e.id} value={e.id}>
                          {e.NomNotaPeriodo}
                        </option>
                      ))}
                    </select>
                  </div>}
                  <br />
                  {Pagina.pagina2 && (
                    loadDowloadDoc === true ? (
                      <span><img src={gif} alt="loading .." width={'40px'} height={'30px'} /></span>
                    ) : (
                      <button className='btn btn-info' onClick={clickDown}>
                        <SiMicrosoftword />
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>

            <br />

            {Pagina.pagina0 === true && Pagina.pagina1 === false && Pagina.pagina2 === false && Pagina.pagina3 === false ?
              <div className="card card-compact w-4/5 h-auto bg-base-100 shadow-xl">
                <div className="card-body">
                  <div id="main1" style={{ width: '100%', height: '600px' }}></div>
                </div>
              </div>

              : null}

            {Pagina.pagina0 === false && Pagina.pagina1 === true && Pagina.pagina2 === false && Pagina.pagina3 === false ?
              <div className="card card-compact w-4/5 bg-base-100 shadow-xl">
                <div className="card-body">
                  <div id="main3" style={{ width: '100%', height: '600px' }}></div>
                </div>
              </div>

              : null}
            {Pagina.pagina0 === false && Pagina.pagina1 === false && Pagina.pagina2 === true && Pagina.pagina3 === false ?
              <div className="card card-compact w-4/5 bg-base-100 shadow-xl ">
                <div className="card-body">
                  <div className="flex flex-col">

                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">

                          <table className="min-w-full text-center text-sm font-light p-10">
                            <thead className="border font-medium dark:border-neutral-500">
                              <tr className='bg-accent'>
                                <th scope="col" className="px-6 py-4">Nombres</th>
                                <th scope="col" className="px-6 py-4">Perdió</th>
                                <th scope="col" className="px-6 py-4">Ganó</th>
                                <th scope="col" className="px-6 py-4">Cantidad Materias</th>
                                <th scope="col" className="px-6 py-4">Porcentaje Perdida</th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentItems?.map((item) => (
                                <tr className="border dark:border-neutral-500 bg-green-100" onClick={() => { findEstInMaterias(item?.nombres), setPagina({ pagina0: false, pagina1: false, pagina2: false, pagina3: true, }) }} key={item.identificacion}>
                                  <td className="px-auto py-4 font-medium link link-hover" >{item?.nombres} </td>
                                  <td className="px-6 py-4 font-medium text-red-500"> {item?.perdio} </td>
                                  <td className="px-6 py-4 font-medium">{item?.gano}</td>
                                  <td className="px-6 py-4 font-medium">{item?.cantidad_materias}</td>
                                  <td className="px-6 py-4 font-medium">{item?.porcentaje_perdida}%</td>

                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <div className="flex justify-center mt-4">
                            <nav className="flex items-center space-x-3">
                              {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                  key={index + 1}
                                  onClick={() => handleChangePage(index + 1)}
                                  className={`px-3 py-1 focus:outline-none ${currentPage === index + 1
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-gray-800'
                                    }`}
                                >
                                  {index + 1}
                                </button>
                              ))}
                            </nav>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              : null}

            {Pagina.pagina0 === false && Pagina.pagina1 === false && Pagina.pagina2 === false && Pagina.pagina3 === true ?
              <div className="card card-compact w-4/5 bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="flex flex-col">

                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                          <div className="flex mb-5 justify-center ">

                            <input
                              type="text"
                              id="search2"
                              name="search"
                              value={searchTerm}
                              onChange={handleSearch}
                              placeholder="Buscar" className="input input-bordered input-sm w-full max-w-xs"
                            />

                          </div>

                          <div className="flex mb-5 justify-center">
                            <label className="cursor-pointer label w-auto">
                              <span className="label-text px-3">Ocultar Detalle</span>
                              <input type="checkbox" checked={colapse} onChange={handleCheckboxChange} className="checkbox checkbox-success" />
                            </label>
                          </div>

                          {Array.isArray(estudianteMat) && estudianteMat.map((item) => (
                            <table className="min-w-full text-center text-sm font-light">
                              <thead className="border font-medium dark:border-neutral-500">
                                <tr key={item.identificacion} className='bg-accent'>
                                  <th>Estudiante:</th>
                                  <th scope="col" className="px-6 py-4">
                                    <div className="collapse collapse-arrow bg-accent">
                                      <input type="checkbox" />
                                      <div className="collapse-title font-medium">
                                        {item.nombres}
                                      </div>
                                      <div className={`${colapse ? 'collapse-content' : null}`}>
                                        <p>Código: {item?.people_code_id}</p>
                                        <p>Correo: {item?.email}</p>
                                        <p>Telefono: {item?.tel_fijo}</p>
                                        <p>Celular: {item?.tel_movil}</p>
                                        <p>Dirección: {item?.direccion}</p>
                                      </div>
                                    </div>
                                  </th>
                                  <th></th>
                                </tr>
                              </thead>
                              <thead className="border font-medium dark:border-neutral-500">
                                <tr className='bg-accent'>
                                  <th scope="col" className="px-6 py-4">
                                    Materias
                                  </th>
                                  <th scope="col" className="px-6 py-4">
                                    SemMatNum
                                  </th>
                                  <th scope="col" className="px-6 py-4">
                                    Nota
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {Array.isArray(item.materias) && item.materias.map((materia) => (
                                  <tr className="border dark:border-neutral-500 bg-green-100" key={materia.cod_materia}>
                                    <td className="px-6 py-4">
                                      <div className="collapse collapse-arrow bg-green-100">
                                        <input type="checkbox" />
                                        <div className="collapse-title font-medium">
                                          {materia?.materia}
                                        </div>
                                        <div className={`${colapse ? 'collapse-content' : null}`}>
                                          <p>Codigo: {materia?.cod_materia}</p>
                                          <p>Tipo: {materia?.tipo_materia}</p>
                                          <p>Docente: {materia?.nom_docente}</p>
                                          <p>Codigo Docente: {materia?.cog_docente}</p>
                                        </div>
                                      </div>
                                      <p></p>
                                    </td>
                                    <td className="px-6 py-4 font-medium">
                                      {materia.semestre}
                                    </td>

                                    <td className={`px-6 py-4 font-medium ${materia.nota < 3 ? 'text-red-500' : 'text-blue-500'}`}>
                                      {materia.nota}
                                    </td>
                                  </tr>
                                ))}

                              </tbody>
                            </table>
                          ))}
                          <div className='flex my-5 justify-center'>
                            <div className="join flex-row">
                              <button className="join-item btn btn-info" onClick={irAPaginaAnterior}>«</button>
                              <button className="join-item px-2">Página {paginaActual} de {EstSortMaterias?.length}</button>
                              <button className="join-item btn btn-info" onClick={irAPaginaSiguiente}>»</button>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
              : null}
            <br />
          </div>
        ) : null}
        {u.user?.RolId === 1 ? (
          <div className="flex flex-col items-center w-full h-1/2 z-0">
            <div className="card card-compact w-4/5 bg-base-100 shadow-xl mt-6">
              <div id="bginv">
                Bienvendo a la vista de administrador
              </div>
            </div>
          </div>
        ) : null}
        {u.user?.RolId === 6 ? (
          <div className="card card-compact w-4/5  bg-base-100 shadow-xl mx-auto">
            <div className="card-body">
              <div id="bginv">
                Bienvendo a la vista visitante, Favor comunicarse con los <a href='https://t.me/Carlos_ramls' target='_blank' className='link'>administradores</a> para acceder al sistema.
              </div>
            </div>
          </div>

        ) : null}

      </div>
      <Footer />
    </>
  );
};

export default Home;
