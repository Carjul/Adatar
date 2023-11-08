import Nav from '../components/Nav';
import Sidebar from '../components/sidebar';
import Footer from '../components/footer';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMaterias, getData, getdataEst, EstMateria, getEstudiante, getMateriaDocente } from '../app/Actions/action'
import * as echarts from 'echarts';


const data = {
  semestre: '0',
  periodo_academico: 0,
  programa_id: 0,
}

const Home = () => {
  const token = localStorage.getItem('token');
  const { notasperma, notas_estudiantes, periodoAcademico, EstMaterias, docentesMateria, estudiante } = useSelector(state => state.data);
  var x = localStorage.getItem('userdecode')
  var u = JSON.parse(x)

  const [obj, setobj] = useState({})
  var dispatch = useDispatch()
  useEffect(() => {
    dispatch(getData(token));
    const datau = JSON.parse(x);
    if (datau.user) {
      let obju = JSON.parse(datau.user.Datos)
      /*  if(obju.Programa){
        dispatch(getPrograma(obju?.Programa,token))
       } */
      setobj(obju)
    }
  }, [x, dispatch, token])

  useEffect(() => {
    if (u.user.RolId === 3) {
      let dato1 = notasperma;
      let dato2 = notas_estudiantes;
      ChageChart3(dato1)
      ChageChart4(dato2)
    }
  }, [notasperma, notas_estudiantes])

  const ChageChart3 = (e) => {
    let myChart = echarts.init(document.getElementById('main3'));
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
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
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



    option && myChart.setOption(option);
  }
  const ChageChart4 = (e) => {

    let myChart = echarts.init(document.getElementById('main4'));
    window.addEventListener("resize", function () {
      myChart.resize();
    })
    let option = {
      title: {
        show: true,
        text: `Numero de materias perididas estudiante`,
        left: 'center',
      },
      dataset: {
        source: [
          ['estudiantes', 'score', 'numero'],
          ...e
        ]
      },

      toolbox: {
        show: true,
        feature: {
          dataView: { show: true, readOnly: false, title: 'Datos' },
          restore: { show: false },
          saveAsImage: { show: true }
        }
      },
      grid: { containLabel: true },
      xAxis: {
        name: 'Cantidad',
        type: 'value',
        interval: 1,
      },
      yAxis: { type: 'category' },
      visualMap: {
        orient: 'horizontal',
        left: 'center',
        min: 10,
        max: 100,

        // Map the score column to color
        dimension: 0,
        inRange: {
          color: ['#65B581', '#FFCE34', '#FD665F']
        }
      },
      series: [
        {
          type: 'bar',
          encode: {
            // Map the "amount" column to X axis.
            x: 'numero',
            // Map the "product" column to Y axis
            y: 'estudiantes'
          }
        }
      ],
      dataZoom: [
        {
          type: 'slider',
          yAxisIndex: 0,  // Indica que afecta al eje Y
        }
      ]

    }
    myChart.setOption(option);
  }


  return (
    <>
      <Nav />
      <div className='flex flex-row justify-content-around'>
        <Sidebar props={1} />

        {u.user?.RolId === 3 ? (
          <div className="flex flex-col items-center w-full h-1/2 z-0">
            <div className="card card-compact w-4/5 bg-base-100 shadow-xl mt-6">
              <h2 className="card-title mx-auto mt-5">Filtros</h2>
              <div className="card-body flex flex-row">
                <div className="flex flex-row flex-wrap p-1 mx-auto">
                  <div className="px-0 py-2">
                    <select className="select select-secondary select-sm max-w-xs"
                      onChange={(e) => {
                        data.periodo_academico = parseInt(e.target.value)
                        dispatch(getMaterias({ "programa_id": parseInt(obj?.Programa), "semestre": obj?.Semestres, "periodo_academico": parseInt(e.target.value) }))
                        data.semestre = obj?.Semestres
                        data.periodo_academico = parseInt(e.target.value)
                        data.programa_id = parseInt(obj?.Programa)
                        dispatch(getdataEst(data));
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
                  </div>
                </div>
              </div>
            </div>
            <div className="w-4/5 bg-base-100 shadow-xl mt-6"></div>
            <div className="card card-compact w-4/5 bg-base-100 shadow-xl">
              <div className="card-body">
                <div id="main3" style={{ width: '100%', height: '600px' }}></div>
              </div>
            </div>
            <br />
            <div className="card card-compact w-4/5 bg-base-100 shadow-xl">
              <div className="card-body">
                <div id="main4" style={{ width: '100%', height: '800px' }}></div>
              </div>
            </div>
            <br />
            <div className="card card-compact w-4/5 bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex flex-col">
                  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                      <div className="overflow-hidden">
                        <table className="min-w-full text-center text-sm font-light">
                          <thead className="border-b font-medium dark:border-neutral-500">
                            <tr>
                              <th scope="col" className="px-6 py-4">
                                Estudiante
                              </th>
                              <th scope="col" className="px-6 py-4">
                                Materias
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {Array.isArray(EstMaterias) && EstMaterias.map((item) => (
                              <tr className="border-b dark:border-neutral-500" key={item.identificacion}>
                                <label htmlFor="my_modal_6" ><td className="whitespace-nowrap px-6 py-4 font-medium" onClick={() => dispatch(getEstudiante(item.identificacion))}>{item.nombres}</td></label>

                                <td className="whitespace-nowrap px-6 py-4">
                                  {Array.isArray(item.materias) && item.materias.map((materia) => (
                                   <label htmlFor="my_modal_7"><p onClick={() => dispatch(getMateriaDocente(materia.cod_materia))} key={materia.cod_materia}>{materia.materia}</p></label> 

                                  ))}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>


                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
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

        <input type="checkbox" id="my_modal_6" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Datos Estudiante</h3>
            <p className="py-4"><h4>Codigo:</h4> {estudiante?.people_code_id}</p>
            <p className="py-4"> <h4>Identificacion:</h4>{estudiante?.Identificacion}</p>
            <p className="py-4"><h4>Nombres:</h4>{estudiante?.Nombres}</p>
            <p className="py-4"><h4>Correo:</h4>{estudiante?.Email}</p>
            <p className="py-4"><h4>Telefono:</h4>Telefono:{estudiante?.TelFijo}</p>
            <p className="py-4"><h4>Celular:</h4>{estudiante?.TelMovil}</p>
            <p className="py-4"><h4>Direccion:</h4>{estudiante?.Direccion}</p>
            <div className="modal-action">
              <label htmlFor="my_modal_6" className="btn">Close</label>
            </div>
          </div>
        </div>
        <input type="checkbox" id="my_modal_7" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Datos Materia</h3>
            <p className="py-4"><h4>Codigo:</h4> {docentesMateria?.CodigoMateria}</p>
            <p className="py-4"> <h4>Nombre:</h4>{docentesMateria?.NombreMateria}</p>
            <p className="py-4"><h4>Tipo:</h4>{docentesMateria?.TipoMateria}</p>
            <p className="py-4"><h4>Docente:</h4>{docentesMateria?.Nom_Docente}</p>
            <p className="py-4"><h4>Codigo Docente:</h4>Telefono:{docentesMateria?.Cog_Docente}</p>

            <div className="modal-action">
              <label htmlFor="my_modal_7" className="btn">Close!</label>
            </div>
          </div>
        </div>

        
      </div>
      <Footer />
    </>
  );
};

export default Home;
