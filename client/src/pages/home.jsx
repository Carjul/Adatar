import Nav from '../components/Nav';
import Sidebar from '../components/sidebar';
import Footer from '../components/footer';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMaterias, getData, getdataEstSem, EstMateria, get_Nota_Año } from '../app/Actions/action'
import * as echarts from 'echarts';


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


  

  const [Pagina, setPagina] = useState({
    pagina0: true,
    pagina1: false,
    pagina2: false,
    pagina3: false,
  })

  const token = localStorage.getItem('token');
  const { notasperma, EstSemestre, periodoAcademico, EstMaterias, notasperpro } = useSelector(state => state.data);
  var x = localStorage.getItem('userdecode')
  var u = JSON.parse(x)

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

  //tabla de estudiantes por semestre
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * 10;
  const indexOfFirstItem = indexOfLastItem - 10;
  const currentItems = EstSemestre?.slice(indexOfFirstItem, indexOfLastItem);
 Documento.Estudiantes = currentItems

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
  const findEstInMaterias = (Nombre) => {
    let obj = EstMaterias?.find((item) => item.nombres === Nombre)
    setEstudianteMat([obj])
  }


  useEffect(() => {
    if (u.user.RolId === 3) {
      let dato0 = notasperpro;
      let dato1 = notasperma;
      if(Pagina.pagina0 === false && Pagina.pagina1 === false && Pagina.pagina2 === false && Pagina.pagina3 === true) console.log(Documento)
      if (Pagina.pagina0 === true && Pagina.pagina1 === false && Pagina.pagina2 === false && Pagina.pagina3 === false) ChageChart1(dato0)
      if (Pagina.pagina0 === false && Pagina.pagina1 === true && Pagina.pagina2 === false && Pagina.pagina3 === false) ChageChart3(dato1)

    }
  }, [notasperpro, notasperma, Pagina.pagina1,Pagina.pagina0,Pagina.pagina3])
  const ChageChart1 = (e) => {

    let myChar = echarts.init(document.getElementById('main1'), null, { renderer: 'svg' });
    window.addEventListener("resize", function () {
      myChar.resize();
    })

    var option = {
      title: {
        show: true,
        text: `Notas Por Rango `,
        /*  ${NombrePro}  */
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)'
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: false },
          saveAsImage: { show: true }
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
    var options = {
      type: 'svg',
      width: 500,
      height: 400,
   };
   

   const svgDataUrl = myChar.getSvgDataURL(options);
  Documento.ImagenPie = svgDataUrl

    option && myChar.setOption(option);



  }
  const ChageChart3 = (e) => {
    let myChart = echarts.init(document.getElementById('main3'), null, { renderer: 'svg' });
    window.addEventListener("resize", function () {
      myChart.resize();
    })
    let option = {
      title: {
        show: true,
        text: `Materias Por Semestre Académico`,
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
          magicType: { show: true, type: ['line', 'bar'] },
          dataView: { show: true, readOnly: false },
          restore: { show: false },
          saveAsImage: { show: true }
        }
      },
      legend: {
        data: ['Ganaron', 'Perdieron'],
        orient: 'horizontal',
        top: '97%'
      },
      grid: {
        left: '40%', // Ajusta el espacio izquierdo para los nombres de las materias
        right: '2%', // Ajusta el espacio derecho para los valores
        top: '8%', // Ajusta el espacio superior para el título
        bottom: '10%' // Ajusta el espacio inferior para la leyenda
      },
      yAxis: [
        {
          type: 'category',
          data: e?.Materia, // materias
          axisLabel: {
            interval: 0, // Mostrar todas las etiquetas de las materias
            rotate: 0, // No rotar las etiquetas
            margin: 17 // Ajusta el margen entre las etiquetas y el eje vertical
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
    var options = {
      type: 'svg',
      width: 500,
      height: 400,
   };
    const svgDataUrl = myChart.getSvgDataURL(options);
   /*  console.log("-__-",svgDataUrl) */
      Documento.ImagenBar = svgDataUrl

    option && myChart.setOption(option);
  }

  useEffect(() => {

    data.periodo_academico = parseInt("25")
    data.semestre = obj?.Semestres
    data.programa_id = parseInt(obj?.Programa)


    dispatch(get_Nota_Año({ "programa_id": data.programa_id, "periodo_academico":data.periodo_academico }))
    dispatch(getMaterias({ "programa_id": parseInt(obj?.Programa), "semestre": obj?.Semestres, "periodo_academico": parseInt("25") }))
    dispatch(getdataEstSem(data));
    /*  dispatch(EstMateria(data))  */
  }, [periodoAcademico])
  return (
    <>
      <Nav />
      <div className='flex flex-row justify-content-around'>
        <Sidebar props={1} />
        {u.user?.RolId === 3 ? (
          <div className="flex flex-col items-center w-full h-1/2 z-0">
            <div className="card card-compact w-4/5 bg-base-100 shadow-xl mt-6">
              <div className="card-body flex flex-row">
                <div className="flex flex-col flex-wrap items-center p-1 mx-auto">
                  <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box ">
                    <li className={` ${Pagina.pagina0 ? 'bg-primary' : ''}`}><a onClick={() => setPagina({ pagina0: true, pagina1: false, pagina2: false, pagina3: false, })}>Notas Rango</a></li>
                    <li className={` ${Pagina.pagina1 ? 'bg-primary' : ''}`}><a onClick={() => setPagina({ pagina0: false, pagina1: true, pagina2: false, pagina3: false, })}>Graf Materias</a></li>
                    <li className={` ${Pagina.pagina2 ? 'bg-primary' : ''}`}><a onClick={() => setPagina({ pagina0: false, pagina1: false, pagina2: true, pagina3: false, })}>Estudiantes Sem</a></li>
                    <li className={` ${Pagina.pagina3 ? 'bg-primary' : ''}`}><a onClick={() => setPagina({ pagina0: false, pagina1: false, pagina2: false, pagina3: true, })}>Reporte Estudiante</a></li>
                  </ul>
                  {Pagina.pagina3 === false ? <div className="px-0 py-2">

                    <select className="select select-secondary select-sm max-w-xs"
                      id="SelectData"
                      onChange={(e) => {
                        data.semestre = obj?.Semestres
                        data.periodo_academico = parseInt(e.target.value)
                        data.programa_id = parseInt(obj?.Programa)
                        dispatch(get_Nota_Año({ "programa_id": data.programa_id.toString(), "periodo_academico":data.periodo_academico }))
                        dispatch(getMaterias({ "programa_id": data.programa_id, "semestre": data.semestre, "periodo_academico": data.periodo_academico }))
                        dispatch(getdataEstSem(data));
                        dispatch(EstMateria(data))
                      }}
                    >
                      <option defaultValue="0">Periodo Academico</option>
                      {periodoAcademico?.map((e) => (
                        <option key={e.id} value={e.id}>
                          {e.Year} {e.Periodo} {e.NomNotaPeriodo}
                        </option>
                      ))}
                    </select>
                  </div> : null}
                </div>
              </div>
            </div>

            <br />

            {Pagina.pagina0 === true && Pagina.pagina1 === false && Pagina.pagina2 === false && Pagina.pagina3 === false ?
              <div className="card card-compact w-4/5 bg-base-100 shadow-xl">
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
                              <tr className='bg-accent-focus'>
                                <th scope="col" className="px-6 py-4">Nombres</th>
                                <th scope="col" className="px-6 py-4">Perdio</th>
                                <th scope="col" className="px-6 py-4">Gano</th>
                                <th scope="col" className="px-6 py-4">Cantidad Materias</th>
                                <th scope="col" className="px-6 py-4">Porcentaje Perdida</th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentItems?.map((item) => (
                                <tr className="border dark:border-neutral-500 bg-green-100" onClick={() => { findEstInMaterias(item?.nombres), setPagina({ pagina0:false, pagina1:false, pagina2:false, pagina3: true, }) }} key={item.identificacion}>
                                  <td className="px-6 py-4 font-medium">{item?.nombres} </td>
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
                          <div className="flex mb-5 justify-start">

                            <input
                              type="text"
                              id="search2"
                              name="search"
                              value={searchTerm}
                              onChange={handleSearch}
                              placeholder="Buscar" className="input input-bordered input-sm w-full max-w-xs"
                            />
                          </div>
                          {Array.isArray(estudianteMat) && estudianteMat.map((item) => (
                            <table className="min-w-full text-center text-sm font-light">
                              <thead className="border font-medium dark:border-neutral-500">
                                <tr key={item.identificacion} className='bg-accent-focus'>
                                  <th>Estudiante:</th>
                                  <th scope="col" className="px-6 py-4">
                                    <div className="collapse bg-accent-focus">
                                      <input type="checkbox" />
                                      <div className="collapse-title">
                                        {item.nombres}
                                      </div>
                                      <div className="collapse-content">
                                        <p>Codigo: {item?.people_code_id}</p>
                                        <p>Correo: {item?.email}</p>
                                        <p>Telefono: {item?.tel_fijo}</p>
                                        <p>Celular: {item?.tel_movil}</p>
                                        <p>Direccion: {item?.direccion}</p>
                                      </div>
                                    </div>
                                  </th>
                                  <th></th>
                                </tr>
                              </thead>
                              <thead className="border font-medium dark:border-neutral-500">
                                <tr className='bg-accent-focus'>
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
                                      <div className="collapse  bg-green-100">
                                        <input type="checkbox" />
                                        <div className="collapse-title">
                                          {materia?.materia}
                                        </div>
                                        <div className="collapse-content">
                                          <p>Codigo: {materia?.cod_materia}</p>
                                          <p>Tipo: {materia?.tipo_materia}</p>
                                          <p>Docente: {materia?.nom_docente}</p>
                                          <p>Codigo Docente: {materia?.cog_docente}</p>
                                        </div>
                                      </div>
                                      <p ></p>
                                    </td>
                                    <td className="px-6 py-4">
                                      {materia.semestre}
                                    </td>

                                    <td className={`px-6 py-4 ${materia.nota < 3 ? 'text-red-500' : ''}`}>
                                      {materia.nota}
                                    </td>
                                  </tr>
                                ))}

                              </tbody>
                            </table>
                          ))}

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
                Bienvendo a la vista visitante, Favor comunicarse con los administradores para acceder al sistema.
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
