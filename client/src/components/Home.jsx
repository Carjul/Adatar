import React, { useEffect } from 'react';
import { Nav } from './Nav';
import { useSelector, useDispatch } from 'react-redux';
import { getData } from '../app/Actions/action';
import * as echarts from 'echarts';



const Home = () => {
  const datos = useSelector(state => state.data);
  const dispatch = useDispatch();

  console.log(datos);
  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);


   useEffect(() => {
    const chart = echarts.init(document.getElementById('chart'));
    const option = {
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
          data: [
            { value: 40, name: 'education' },
            { value: 38, name: 'rose 2' },
            { value: 32, name: 'rose 3' },
            { value: 30, name: 'rose 4' },
            { value: 28, name: 'rose 5' },
            { value: 26, name: 'rose 6' },
            { value: 22, name: 'rose 7' },
            { value: 18, name: 'rose 8' },
            { value: 19, name: 'rose 9' },
          ]
        }
      ]
    };

    chart.setOption(option);
  }, []) 
  return (<>
      <Nav />
       
    <div className="flex flex-row items-center ">
    <div className="flex flex-col items-center justify-end border-2" >
      <div className="w-1/3 p-4">
        hola
      </div>
      <div className="w-1/3 p-4">
      hola
      </div>
      <div className="w-1/3 p-4">
      hola
      </div>
    </div>
    
       <div id="chart" style={{ width: 'auto', height: '600px' }}></div> 
    </div>


  </>
   
  );
}

export default Home; 