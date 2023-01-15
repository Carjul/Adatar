import * as echarts from 'echarts';
import { useEffect } from 'react';

function GraficoPolar({props}) {
	console.log(props)
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
              data: props
            }
          ]
        };
    
        chart.setOption(option);
      }, [props])
    return(
        <div id='chart' style={{width: '80%', height: '80%'}}></div> 
        
    )
}

export default GraficoPolar;