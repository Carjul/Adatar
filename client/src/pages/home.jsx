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
      console.log(data )
         if (data.user.people_code_id) {
            console.log(data )
            dispatch(getnotasEst({ people_code_id: data.user.people_code_id })) 
        } 
    }, [ x,dispatch ]) 

    useEffect(() => {
        console.log(Notas_por_Est)
        if (Notas_por_Est) {
          dispatch(setNotaEstG(Notas_por_Est))
        }
    }, [Notas_por_Est,dispatch])

    useEffect(() => {
        console.log(DataGraficoEst)
    


   
        var chartDom = document.getElementById('main');
        var myChart = echarts.init(chartDom);
        var option;

        option = {
            legend: {
                top: 'bottom'
            },
            toolbox: {
                show: true,
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            series: [
                {
                    name: 'Nightingale Chart',
                    type: 'pie',
                    radius: [50, 250],
                    center: ['50%', '50%'],
                    roseType: 'area',
                    itemStyle: {
                        borderRadius: 8
                    },
                    data:DataGraficoEst? DataGraficoEst: [
                        { value: 4.0, name: 'rose 1' },
                        { value: 3.8, name: 'rose 2' },
                        { value: 3.2, name: 'rose 3' },
                        { value: 3.0, name: 'rose 4' },
                        { value: 2.8, name: 'rose 5' },
                        { value: 2.6, name: 'rose 6' },
                        { value: 2.2, name: 'rose 7' },
                        { value: 1.8, name: 'rose 8' }
                    ]
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
