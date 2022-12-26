import * as echarts from 'echarts';
import { useEffect } from 'react';

function GraficoPolar(params) {
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
    return(
        <div clasName="flex items-center w-auto">
        <div id="chart"></div> 
        </div>
    )
}

export default GraficoPolar;