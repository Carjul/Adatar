import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getNotasRango, getData, getProgramas, get_Nota_Año, getdataEst, getMaterias, get_Nota_facultades } from '../app/Actions/action';

import Nav from '../components/Nav';
import Sidebar from '../components/sidebar';
import Footer from '../components/footer';
import * as echarts from 'echarts';

const data = {
  semestre: "",
  periodo_academico: null,
  programa_id: null,
};


const Dashboard = () => {

  const { programa, periodoAcademico, sede, notasperpro, notasmateria, notasperma, notasperpro2, semestres, notas_estudiantes } = useSelector(state => state.data);
  const { graficos } = useSelector(state => state.interuptor);
  const { navState } = useSelector(state => state.tema);

  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  React.useEffect(() => {
    dispatch(getData(token));
  }, [dispatch, token]);

  const [NombrePro, setNombrePro] = React.useState("")
  const HandleChageP = (e) => {
    data.periodo_academico = parseInt(e.target.value)
    dispatch(get_Nota_facultades(e.target.selectedOptions[0].text))
  }
  const HandleChageS = (e) => {
    dispatch(getProgramas(e.target.value, token))
  }
  const HandleChageC = (e) => {

    data.programa_id = parseInt(e.target.value)
    dispatch(getNotasRango({ "programa_id": e.target.value, "periodo_academico": data.periodo_academico }))
    dispatch(get_Nota_Año({ "programa_id": e.target.value, "periodo_academico": data.periodo_academico }))
    setNombrePro(e.target.selectedOptions[0].text)
  }
  const HandleChageE = (e) => {
    data.semestre = e.target.selectedOptions[0].text
    dispatch(getMaterias({ "programa_id": data.programa_id, "semestre": data.semestre, "periodo_academico": data.periodo_academico }))
    dispatch(getdataEst(data))
  }




  React.useEffect(() => {
    let dato0 = notasperpro2;
    let dato1 = notasperpro;
    let dato2 = notasmateria;
    let dato3 = notasperma;
    let dato4 = notas_estudiantes;


    if (graficos === 1) {
      ChageChart0(dato0)
    }
    if (graficos === 2) {
      ChageChart1(dato1)
    }
    if (graficos === 3) {
      ChageChart2(dato2)
    }
    if (graficos === 4) {
      ChageChart3(dato3)
    }
    if (graficos === 5) {
      ChageChart4(dato4)
    }
  })

  const ChageChart0 = (e) => {

    let myChar = echarts.init(document.getElementById('main0'), null, { renderer: 'svg' });
    window.addEventListener("resize", function () {
      myChar.resize();
    })

    var option = {
      title: {
        show: true,
        text: `Porcentaje General de Notas por Rango`,
        left: 'center',
      },
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
        top: '90%',
      },
      series: [
        {
          type: 'pie',
          radius: '50%',
          data: e,
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

  }
  const ChageChart1 = (e) => {

    let myChar = echarts.init(document.getElementById('main1'), null, { renderer: 'svg' });
    window.addEventListener("resize", function () {
      myChar.resize();
    })

    var option = {
      title: {
        show: true,
        text: `Notas Por Rango ${NombrePro} `,
        left: 'center',
      },
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
        top: '90%',
      },
      series: [
        {
          type: 'pie',
          radius: '50%',
          data: e,
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



  }
  const ChageChart2 = (e) => {
    let myChart = echarts.init(document.getElementById('main2'), null, { renderer: 'svg' });
    window.addEventListener("resize", function () {
      myChart.resize();
    })
    var option = {
      title: {
        show: true,
        text: `Notas Por Semestre ${NombrePro}`,
        left: 'center',
      },
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
          restore: { show: true },
          saveAsImage: { show: true }
        },
      },
      legend: {
        orient: 'horizontal',
        top: '97%'
      },
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
          data: e[0]
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
          data: e[1]
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
          data: e[2]
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
          data: e[3]
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
          data: e[4]
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
          data: e[5]
        }
      ]
    };

    option && myChart.setOption(option);
  }
  const ChageChart3 = (e) => {
    let myChart = echarts.init(document.getElementById('main3'), null, { renderer: 'svg' });
    window.addEventListener("resize", function () {
      myChart.resize();
    })
    let option = {
      title: {
        show: true,
        text: `Notas Por Materia ${NombrePro}`,
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

    let myChart = echarts.init(document.getElementById('main4'), null, { renderer: 'svg' });
    window.addEventListener("resize", function () {
      myChart.resize();
    })
    let option = {
      title: {
        show: true,
        text: `Numero de materias perididas estudiante - ${NombrePro}`,
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
        {navState === 'menu' && <Sidebar props={4} />}

        <div className="flex flex-col items-center w-full h-auto z-0" >

          <div className="card card-compact w-4/5 bg-base-100 shadow-xl mt-6 items-center"  >
            {/* <h2 className="card-title mx-auto mt-5">Filtros</h2> */}
            <div className="card-body">
              <div className='flex flex-row flex-wrap  w-full'>

                <select name="Periodo academico" onChange={HandleChageP} className="select select-info w-4/6 select-sm max-w-xs">
                  <option defaultValue="0">Periodo Academico</option>
                  {periodoAcademico?.map(e =>
                    <option key={e.id} value={e.id}>{e.NomNotaPeriodo}</option>
                  )}
                </select>


                <select name="Sede" onChange={HandleChageS} className="select select-info w-4/6  select-sm max-w-xs">
                  <option defaultValue="0">Sede</option>
                  {sede?.map((e, i) =>
                    <option key={i} value={e}>{e}</option>
                  )}
                </select>




                <select name="Programa" onChange={HandleChageC} className="select select-info w-4/6 select-sm w-a max-w-xs">
                  <option defaultValue="0">Carrera</option>
                  {programa?.map(e =>
                    <option key={e.id} value={e.id}>{e.NombrePrograma}</option>
                  )}
                </select>

                <select name="Estado de notas" onChange={HandleChageE} className="select select-info w-4/6 select-sm max-w-xs">
                  <option defaultValue="1">Semestre</option>
                  {semestres?.map(e =>
                    <option key={e} value={e}>{e}</option>)
                  }

                </select>


              </div>

            </div>

          </div>

          <br />

          <div className="card card-compact w-4/5 bg-base-100 shadow-xl">
            <div className="card-body">
              {graficos === 1 ? <div id="main0" style={{ width: '100%', height: '700px' }} ></div> : <></>}
              {graficos === 2 ? <div id="main1" style={{ width: '100%', height: '700px' }} ></div> : <></>}
              {graficos === 3 ? <div id="main2" style={{ width: '100%', height: '1000px' }} ></div> : <></>}
              {graficos === 4 ? <div id="main3" style={{ width: '100%', height: '1000px' }} ></div> : <></>}
              {graficos === 5 ? <div id="main4" style={{ width: '100%', height: '700px' }} ></div> : <></>}

            </div>
          </div>

          <br />

        </div>
      </div>
      <Footer />
    </>
  )
}

export default Dashboard