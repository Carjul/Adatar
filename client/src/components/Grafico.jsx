import * as echarts from 'echarts';
import { useEffect } from 'react';

function GraficoPolar() {

  useEffect(() => {
    const chart = echarts.init(document.getElementById('chart'));
    window.addEventListener("resize", function () {
      chart.resize();
    });
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
                { value: 1048, name: 'Search Engine' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
                { value: 484, name: 'Union Ads' },
                { value: 300, name: 'Video Ads' }
              ]
            }
          ]
        };
    
        chart.setOption(option);
      })
    return(
        <div id='chart' style={{width: '80%', height: '750px'}}></div> 
        
    )
}

export default GraficoPolar;