import Nav from '../components/Nav';
import Sidebar from '../components/sidebar';
import Footer from '../components/footer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getnotasEst } from '../app/Actions/action'
import {setNotaEstG} from '../app/FeatureSlices/data' 
import * as echarts from 'echarts';


const Home = () => {

    var { Notas_por_Est, DataGraficoEst } = useSelector(state => state.data)
    var x = localStorage.getItem('userdecode') 
    
      
    var dispatch = useDispatch()

    useEffect(() => {
      const data = JSON.parse(x);
         if (data.user?.people_code_id) {
            console.log(data )
            dispatch(getnotasEst({ people_code_id: data.user.people_code_id })) 
        } 
    }, [ x,dispatch ]) 

    useEffect(() => {
        if (Notas_por_Est) {
          dispatch(setNotaEstG(Notas_por_Est))
        }
    }, [Notas_por_Est,dispatch])

    useEffect(() => {

        var chartDom = document.getElementById('main');
        var myChart = echarts.init(chartDom);
        var option;
        
        option = {
          dataset: {
            source:DataGraficoEst? DataGraficoEst : [
              ['score', 'Nota', 'Nombre'],
              [89.3, 58212, 'Matcha Latte'],
              [57.1, 78254, 'Milk Tea'],
              [74.4, 41032, 'Cheese Cocoa'],
              [50.1, 12755, 'Cheese Brownie'],
              [89.7, 20145, 'Matcha Cocoa'],
              [68.1, 79146, 'Tea'],
              [19.6, 91852, 'Orange Juice'],
              [10.6, 101852, 'Lemon Juice'],
              [32.7, 20112, 'Walnut Brownie']
            ]
          },
          grid: { containLabel: true },
          xAxis: { name: 'amount' },
          yAxis: { type: 'category' },
          visualMap: {
            orient: 'horizontal',
            left: 'center',
            min: 10,
            max: 100,
            text: ['Nota Alta', 'Nota Baja'],
            // Map the score column to color
            dimension: 0,
            inRange: {
              color: ['#FD665F', '#FFCE34','#65B581' ]
            }
          },
          series: [
            {
              type: 'bar',
              encode: {
                // Map the "amount" column to X axis.
                x: 'Nota',
                // Map the "product" column to Y axis
                y: 'Nombre'
              }
            }
          ]
        };
        
        option && myChart.setOption(option);
      }, [DataGraficoEst])

    return (
        <>
            <Nav />
            <div className='flex flex-row justify-content-around'>
                <Sidebar props={1} />

                <div className='flex flex-col items-center w-full h-1/2 z-0'>
                    <div className="card card-compact w-4/5 bg-base-100 shadow-xl mt-6">
                        <h2 className="card-title mx-auto mt-5">Filtros</h2>
                        <div className="card-body flex flex-row">
                            <div className='flex flex-row flex-wrap p-1 mx-auto '>
                                <div className="px-0 py-2">
                                    {/* <select name="Periodo academico" onChange={HandleChageP} className="select select-secondary select-sm max-w-xs">
                    <option defaultValue="0">Periodo Academico</option>
                    {periodoAcademico?.map(e =>
                      <option key={e.id} value={e.id}>{e.Year} {e.Periodo} {e.NomNotaPeriodo}</option>
                    )}
                  </select>
                </div>
                <div className="px-0 py-2">
                  <select name="Sede" onChange={HandleChageS} className="select select-secondary select-sm max-w-xs">
                    <option defaultValue="0">Sede</option>
                    {sede?.map((e, i) =>
                      <option key={i} value={e}>{e}</option>
                    )}
                  </select>

                </div>

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
                    <option defaultValue="1">Estudiantes por semestre</option>
                    {semestres?.map(e =>
                      <option key={e} value={e}>{e}</option>)
                    }

                  </select> */}
                                </div>

                            </div>

                        </div>

                    </div>
                    <div className=" w-4/5 bg-base-100 shadow-xl mt-6">

                    </div>
                    <div className="card card-compact w-4/5 bg-base-100 shadow-xl">
                        <div className="card-body">
                            <div id="main" style={{ width: '100%', height: '600px' }} ></div>

                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
};

export default Home;
