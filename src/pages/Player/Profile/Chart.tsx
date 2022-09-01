import React from 'react'
import * as echarts from 'echarts'
import ReactECharts from 'echarts-for-react'

interface Props {
  xAxisData: any
  series: any
}

const Chart: React.FC<Props> = ({ xAxisData, series }) => {
  const option = {
    tooltip: {
      trigger: 'axis',
      position: function (pt: any) {
        return [pt[0], '10%']
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xAxisData,
      show: true,
    },
    color: '#ABACB5',
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} K',
        color: '#ABACB5',
        fontWeight: 'bold',
        fontSize: 13,
      },
      splitLine: {
        lineStyle: { color: '#56596A' },
      },
      splitNumber: 10,
      axisLine: {
        lineStyle: { color: '#56596A' },
        show: true,
      },
    },
    // dataZoom: [
    //   {
    //     type: 'inside',
    //   },
    // ],
    backgroundColor: '#171923',
    series: [
      {
        name: 'Fake Data',
        type: 'line',
        symbol: 'none',
        sampling: 'lttb',
        itemStyle: {
          color: '#6BC909',
        },
        lineStyle: {
          color: '#6BC909',
          width: 1.5,
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#6BC909',
            },
            {
              offset: 1,
              color: '#171923',
            },
          ]),
        },
        data: series,
      },
    ],
  }

  return (
    <>
      <ReactECharts option={option} />
    </>
  )
}

export default Chart
