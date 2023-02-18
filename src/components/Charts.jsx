import React from 'react'
import { useState } from 'react';
import Chart from "react-apexcharts";

const Charts = ({chartData, symbol, type}) => {
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

    const color = getDateFormat()
    [getDateFormat().length-1].y - getDateFormat()[0].y > 0 ? '#26c281' : '#ed3419'
    const getBtnColor = (val) => {
      let classu ='p-4 text-black rounded-lg mr-[6px] border';
        if(val == dateFormat) {
          return classu + ' bg-[aqua]'
        }else{
          return classu + ' bg-[white]'
        }
    }
    const options = {
      colors: [color],
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
      },
      plotOptions: {
        candlestick: {
          colors: {
            upward: '#3C90EB',
            downward: '#DF7D46'
          },
          wick: {
            useFillColor: false,
          }
        }
      }
    }

    
    const series = [{
      name: symbol,
      data: getDateFormat()
    }]
  return (
    <div className='p-4 mt-5'>
      <Chart options={options} series={series} type={type} width="100%" height='400' />
      <div>
        <button onClick={() => setDateFormat('24h')} className={getBtnColor('24h')}>Day</button>
        <button onClick={() => setDateFormat('7d')} className={getBtnColor('7d')}>Week</button>
        <button onClick={() => setDateFormat('1yr')} className={getBtnColor('1yr')}>Year</button>
      </div>
    </div>
  )
}

export default Charts

//candlestick format
// data: [{
//   x: date,
//   y: [o, h, c, l]
// },
// {
//   x: date,
//   y: [o, h, c, l]
// }
// ]