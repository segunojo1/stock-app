import React from 'react'

const Chart = ({chartData}) => {
    const {day, week, year} = chartData;
    const options = {
      title: {
        text: symbol,
        align: 'center',
         style: {
          fontSize: '24px'
         }
      },
      chart: {
        id: 'stock data',
        animations: {
          speed: 1300
        }
      },
      xaxis: {
         type: 'datetime',
         labels: {
          datetimeUTC: false
         }
      },
      tooltip: {
        
      }
    }

    const series = [{
      name: symbol,
      data: day
    }]
  return (
    <div>
      <Chart options={options} series={series} type='area' width="100%"/>
    </div>
  )
}

export default Chart