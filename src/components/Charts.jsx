import React from 'react'
import { useState } from 'react';
import Chart from "react-apexcharts";

const Charts = ({chartData, symbol}) => {
    const {day, week, year} = chartData;
    const [dateFormat, setDateFormat] = useState('24h')

    const getDateFormat  = () => {
        switch (dateFormat) {
          case '24h':
            return day
          case '7d':
            return week
          case '1yr':
            return year
          default:
            break;
        }
    }
    const getBtnColor = (val) => {
      let classu ='p-4 text-black rounded-lg mr-[6px]';
        if(val == dateFormat) {
          return classu + ' bg-[aqua]'
        }else{
          return classu + ' bg-[white]'
        }
    }
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
      data: getDateFormat()
    }]
  return (
    <div className='p-4 mt-5'>
      <Chart options={options} series={series} type='area' width="100%" height='500' />
      <div>
        <button onClick={() => setDateFormat('24h')} className={getBtnColor('24h')}>Day</button>
        <button onClick={() => setDateFormat('7d')} className={getBtnColor('7d')}>Week</button>
        <button onClick={() => setDateFormat('1yr')} className={getBtnColor('1yr')}>Year</button>
      </div>
    </div>
  )
}

export default Charts