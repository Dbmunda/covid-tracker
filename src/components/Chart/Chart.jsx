import React, { useState, useEffect } from 'react'
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';
import styles from './Chart.module.css'

const Chart = ({data:{confirmed,recovered,deaths},country}) => {
    const [dailyData, setdailyData] = useState([])

    useEffect(() => {
        const fetchAPI = async () => {
            const Data = await fetchDailyData();
           setdailyData(Data)
        }
        fetchAPI();
    }, [])
    
    const state = {
        labels: dailyData.map(({reportDate}) =>reportDate),
        datasets: [
          {
            label: 'Deaths',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'red',
            borderColor: 'red',
            borderWidth: 2,
            data: dailyData.map(({deaths}) =>deaths)
          },
          {
            label: 'Confirmed',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'blue',
            borderColor: 'blue',
            borderWidth: 2,
            data: dailyData.map(({confirmed}) =>confirmed)
          }
        ]
      }

    const linechart = (
        dailyData.length?
            (<Line
                data={state}
                options={{
                  title:{
                    display:true,
                    text:'covid -19',
                    fontSize:20
                  },
                  legend:{
                    display:true,
                    position:'right'
                  }
                }}
              />) : null


    )
    // console.log(confirmed.value,recovered.value,deaths.value);
    //console.log(confirmed);
    const barChart = (
      confirmed ? (
        <Bar
          data={{
            labels: ['Infected', 'Recovered', 'Deaths'],
            datasets: [
              {
                label: 'Infected',
                backgroundColor: ['blue','green','red'],
                data: [confirmed.value,recovered.value,deaths.value],
              },
            ]
          }}
          // options={{
          //   legend: { display: false },
          //   title: { display: true, text: `Current state in ${country}` },
          // }}
        />
      ) : null
    );
    return (
        <div className={styles.container}>
             {country? barChart : linechart}
        </div>
    )
}

export default Chart
