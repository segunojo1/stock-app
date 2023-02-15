import React from 'react'
import Chart from "react-apexcharts";

const Charts = ({chartData, symbol}) => {
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
        x: {
          format: 'MMM dd HH:MM'
        }
      }
    }

    const series = [{
      name: symbol,
      data: day
    }]
  return (
    <div className='p-4 mt-5'>
      <Chart options={options} series={series} type='area' width="100%" height='500' />
    </div>
  )
}

export default Charts