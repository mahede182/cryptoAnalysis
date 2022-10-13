import { CircularProgress } from '@material-ui/core';
import React, { useEffect,useState } from 'react'
import { Line } from 'react-chartjs-2';
import { CryptoState } from '../CryptoCoinContext';
import axios from 'axios'
import {HistoricalChart} from '../config/api'
import Chart from 'chart.js/auto';
import SelectButton from './SelectButton';
import { chartDays } from '../config/data';

// to fix date string error
function formatTime(time, prefix = "") {
  return typeof time == "object" ? prefix + time.toLocaleDateString() : "";
}

function CoinInfo({ coin }) {
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1); 

  const {currency} = CryptoState();

  const fetchHistoricData = async () => {
    const {data} = await axios.get(HistoricalChart(coin.id,days,currency))

    setHistoricalData(data.prices);
  };


  useEffect(()=>{
    fetchHistoricData();
  },[currency,days])
  return (
    <div>
      {/* chart */}
    {
      !historicalData ? (
        <CircularProgress style={{color:"#07BBCE"}} size={250} thickness={1}/>
      ):(
        <>
          <Line data={{
            labels: historicalData.map((coin) => {
              let date = new Date(coin[0]);
              // let time = 
                let time = date.getHours() > 12 ? `${date.getHours() - 12}:${date.getMinutes()} PM` 
                : `${date.getHours()}:${date.getMinutes()} AM`;

                return days === 1 ? time : date.toLocaleDateString();
          }),
          datasets: [
            {
              data: historicalData.map((coin) => coin[1]),
              label: `Price ( Past ${days} Days ) in ${currency}`,
              borderColor: "#eebc1d",
            }
          ]
          }}
          options={{
            elements: {
              point: {
                radius: 1
              }
            }
          }}
          />

          {/* days button */}
          <div style={{
            display: "flex",
            marginTop: 20,
            justifyContent: "space-arount",
            width: "100%",
          }}>
            {chartDays.map((day) => (
              <SelectButton
              key={day.value}
              onClick = {() => setDays(day.value)}
              selected={day.value === days}
              >
                {day.label}
              </SelectButton>
            ))}
          </div>
        </>
      )
    }

      {/* button */}
    </div>
  )
}

export default CoinInfo