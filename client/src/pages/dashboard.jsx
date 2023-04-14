import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getData, getProgramas, get_Nota_Año, getDataperson } from '../app/Actions/action';
import { setNotasmateria, setNotastate, setNotasperma } from '../app/FeatureSlices/data';
import Nav from '../components/Nav';
import Sidebar from '../components/sidebar';
import Footer from '../components/footer';
import * as echarts from 'echarts';


const Dashboard = () => {

  const { programa, periodoAcademico, sede, notasperpro, notasmateria, notasperma, notas, notasemestre } = useSelector(state => state.data);
  const x = useSelector(state => state.data);
  console.log(x)
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');


  React.useEffect(() => {
    dispatch(getData(token));
    dispatch(getDataperson(token))
  }, [dispatch, token]);


  const HandleChageP = (e) => {
    dispatch(get_Nota_Año(e.target.value, token))
  }
  const HandleChageS = (e) => {
    dispatch(getProgramas(e.target.value, token))
  }
  const HandleChageC = (e) => {
    dispatch(setNotasmateria(`${e.target.value}`))
    dispatch(setNotasperma(`${e.target.value}`))
  }
  const HandleChageE = (e) => {
    dispatch(setNotastate(e.target.value))
  }


  React.useEffect(() => {
    let datos = notasperpro
    let myChar = echarts.init(document.getElementById('main'));
    window.addEventListener("resize", function () {
      myChar.resize();
    })
    var option = {

      tooltip: {
        trigger: 'item'
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
        top: '82%',
      },
      series: [
        {
          type: 'pie',
          radius: '50%',
          data: datos,
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
  }, [notasperpro]);

  React.useEffect(() => {
    let dato = notasmateria
    let myChart = echarts.init(document.getElementById('mains'));
    window.addEventListener("resize", function () {
      myChart.resize();
    })
    var option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // Use axis to trigger tooltip
          type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
        }
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: false },
          saveAsImage: { show: true }
        },
      },
      legend: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value'
      },
      yAxis: {
        type: 'category',
        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
      },
      series: [
        {
          name: 'Cero',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: dato[0]
        },
        {
          name: 'Muy Baja',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: dato[1]
        },
        {
          name: 'Baja',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: dato[2]
        },
        {
          name: 'Media',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: dato[3]
        },
        {
          name: 'Alta',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: dato[4]
        },
        {
          name: 'Muy Alta',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: dato[5]
        }
      ]
    };

    option && myChart.setOption(option);

  }, [notasmateria])

  React.useEffect(() => {
    let datos = notasperma
    let myChart = echarts.init(document.getElementById('mainx'));
    window.addEventListener("resize", function () {
      myChart.resize();
    })
    let option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: false },
          saveAsImage: { show: true }
        }
      },
      legend: {
        data: ['Ganaron', 'Perdieron']
      },
      xAxis: [
        {
          type: 'category',
          data: datos?.Materia, //materias
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
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
            show: true
          },
          tooltip: {
            valueFormatter: function (value) {
              return value;
            }
          },
          emphasis: {
            focus: 'series'
          },
          data: datos?.Perdio
        },
        {
          name: 'Ganaron',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          tooltip: {
            valueFormatter: function (value) {
              return value;
            }
          },
          emphasis: {
            focus: 'series'
          },
          data: datos.Gano
        }
      ]
    };

    option && myChart.setOption(option);
  }, [notasperma])

  React.useEffect(() => {
    let arr = notasemestre
    let myChart = echarts.init(document.getElementById('main3'));
    window.addEventListener("resize", function () {
      myChart.resize();
    })
    let option = {
      dataset: {
        source: [
          ['score', 'numero', 'estudiantes'],
          ...arr

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
      xAxis: { name: 'amount' },
      yAxis: { type: 'category' },
      visualMap: {
        orient: 'horizontal',
        left: 'center',
        min: 0,
        max: 15,
        text: ['High Score', 'Low Score'],
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
      ]
    }
    myChart.setOption(option);
  }, [notasemestre])

  return (
    <>
      <Nav />
      <div className='flex flex-row justify-content-around'>
        <Sidebar props={4} />

        <div className="flex flex-col items-center w-full h-auto z-0" >

          <div className="card card-compact w-4/5 bg-base-100 shadow-xl mt-6">
            <h2 className="card-title mx-auto mt-5">Filtros</h2>
            <div className="card-body flex flex-row">
              <div className='flex flex-row flex-wrap p-1 mx-auto '>
                <div className="px-0 py-2">
                  <select name="Periodo academico" onChange={HandleChageP} className="select select-secondary select-sm max-w-xs">
                    <option defaultValue="0">Periodo Academico</option>
                    {periodoAcademico?.map(e =>
                      <option key={e.id} value={e.id}>{e.Year} {e.Periodo}</option>
                    )}
                  </select>
                </div>
                {notas.length > 0 ? <div className="px-0 py-2">
                  <select name="Sede" onChange={HandleChageS} className="select select-secondary select-sm max-w-xs">
                    <option defaultValue="0">Sede</option>
                    {sede?.map((e, i) =>
                      <option key={i} value={e}>{e}</option>
                    )}
                  </select>

                </div> : <div></div>}

                <div className="px-0 py-2">
                  <select name="Programa" onChange={HandleChageC} className="select select-secondary select-sm w-a max-w-xs">
                    <option defaultValue="0">Carrera</option>
                    {programa?.map(e =>
                      <option key={e.id} value={e.id}>{e.NombrePrograma}</option>
                    )}
                  </select>
                </div>

                <div className="px-0 py-2">
                  <select name="Estado de notas" onChange={HandleChageE} className="select select-secondary select-sm max-w-xs">
                    <option defaultValue="0">Estudiantes por semestre</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>

              </div>

            </div>

          </div>

          <br />

          <div className="card card-compact w-4/5 bg-base-100 shadow-xl">
            <h2 className="card-title mx-auto mt-10">Notas por rango</h2>
            <div className="card-body">
              <div id="main" style={{ width: '100%', height: '600px' }} ></div>
            </div>
          </div>

          <br />

          <div className="card card-compact w-4/5 bg-base-100 shadow-xl">
            <h2 className="card-title mx-auto mt-5">Notas perdidas por materia</h2>
            <div className="card-body">
              <div id="mains" style={{ width: '100%', height: '900px' }} ></div>
            </div>
          </div>

          <br />

          <div className="card card-compact w-4/5 bg-base-100 shadow-xl">
            <h2 className="card-title mx-auto mt-5">Materias del Semestre Académico</h2>
            <div className="card-body">
              <div id="mainx" style={{ width: '100%', height: '900px' }} ></div>
            </div>
          </div>

          <br />

          <div className="card card-compact w-4/5 bg-base-100 shadow-xl">
            <h2 className='card-title mx-auto mt-5'>Numero de materias peridas estudiante</h2>
            <div className="card-body">
              <div id="main3" style={{ width: '100%', height: '900px' }} ></div>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  )
}

export default Dashboard