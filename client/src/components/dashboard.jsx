import { Nav } from './Nav';

import { useSelector, useDispatch } from 'react-redux';
import { getData, getProgramas, get_Nota_Año } from '../app/Actions/action';
import Sidebar from './sidebar';
import Footer from './footer';
import React from 'react';
import { setNotasmateria, setNotastate, setNotasperpro, setCleand } from '../app/FeatureSlices/data';
import * as echarts from 'echarts';

export const Dashboard = () => {
  
    const { programa,periodoAcademico, sede,notasperpro } = useSelector(state => state.data);
	
    const x = useSelector(state => state.data);
    console.log(x)
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');

    
	React.useEffect(() => {
		programa?.forEach((e)=>{
		dispatch(setNotasperpro({id:e.id,nombre:e.NombrePrograma}))
		})
	},[dispatch,programa])

    React.useEffect(() => {
        dispatch(getData(token));
		dispatch(setCleand([]))
    }, [dispatch, token]);


    const HandleChageP = (e) => {
        console.log(e.target.value)
        dispatch(get_Nota_Año(e.target.value, token))
    }
    const HandleChageS = (e) => {
		dispatch(setCleand([]))
        console.log(e.target.value)
        dispatch(getProgramas(e.target.value, token))
    }
    const HandleChageC = (e) => {
        console.log(e.target.value)
        dispatch(setNotasmateria(`${e.target.value}`))
    }

    const HandleChageE = (e) => {
        console.log(e.target.value)
        dispatch(setNotastate(e.target.value))
    }
    React.useEffect(() => {
		var datos= notasperpro
        const myChart = echarts.init(document.getElementById('main'));
        window.addEventListener("resize", function () {
            myChart.resize();
        })

        var option = {
            title:{
                text:'Notas Perdidas Por Progama'   ,
                left:"center"             
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
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
                    type: 'pie',
                    radius: '65%',
                    center: ['50%', '50%'],
                    selectedMode: 'single',
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

	myChart.setOption(option);
	
    }, [notasperpro]);
    return (
        <>
            <Nav />
            <div className='flex flex-row justify-content-around'>
                <Sidebar props={4} />
                <div className="flex flex-col items-center w-full h-full z-0" >

                    <div className='flex flex-row flex-wrap p-1 '>
                  
                        <div className="px-0 py-2">
                            <select name="Periodo academico" onChange={HandleChageP} className="select select-secondary select-sm max-w-xs">
                                <option defaultValue="0">Periodo Academico</option>
                                {periodoAcademico?.map(e =>
                                    <option key={e.id} value={e.id}>{e.Year} {e.Periodo}</option>
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
                                <option defaultValue="0">Estado de notas</option>
                                <option value="1">Gano</option>
                                <option value="0">Perdio</option>
                            </select>

                        </div>

                    </div>

                    <div id="main" style={{width: '100%', height: '900px'}}></div>
			
                </div>

            </div>
            <Footer />

        </>
    )
}