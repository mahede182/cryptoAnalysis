import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import { SingleCoin } from '../config/api'
import { CryptoState } from '../CryptoCoinContext'
import CoinInfo from '../components/CoinInfo'
import { LinearProgress, Typography } from '@material-ui/core'
// import { numberWithCommas } from './Banner/Carousel';
import { numberWithCommas } from '../components/Banner/Carousel'



const CoinPage = () => {
  const {id} = useParams()
  const [coin, setCoin] = useState()
  const {currency, symbol} = CryptoState()
  const fetchCoin = async ()=>{
    const {data} = await axios.get(SingleCoin(id));
    setCoin(data)
  }
useEffect(() => {
  return () => {
    fetchCoin();
  }
}, [coin])

  if (!coin) return <LinearProgress style={{backgroundColor: "gold"}}/>
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
      {/* sidebar */}
      <div
       style={{width:"30%",display:"flex",flexDirection: "column",alignItems:"center",marginTop: 25,borderRight: "2px solid grey"}}>
        <img src={coin?.image.large} alt={coin?.name} height="200" style={{marginBottom: 20}}/>
      <Typography variant="h3">
        {coin?.name}
      </Typography>
      <Typography variant="subtitle1">
        {coin?.description.en.split(". ")[0]}
      </Typography>

      <div>
        <span style={{display:"flex"}}>
          <Typography variant="h5">
            Rank
          </Typography>
          &nbsp; &nbsp; 
          <Typography 
          style={{fontFamily: "Montserrat"}}
          variant="h5">
            {coin?.market_cap_rank}
          </Typography>
        </span>

        <span style={{display:"flex"}}>
          <Typography variant="h5">
            Current Price:
          </Typography>
          &nbsp; &nbsp; 
          <Typography 
          style={{fontFamily: "Montserrat"}}
          variant="h5">
            {coin?.market_data.current_price[currency.toLowerCase()]}
          </Typography>
        </span>

        <span style={{display:"flex"}}>
          <Typography variant="h5">
            Market Cap: {" "}
          </Typography>
          &nbsp; &nbsp; 
          <Typography 
          style={{fontFamily: "Montserrat"}}
          variant="h5">
            {symbol}{ " " }
            {numberWithCommas(
              coin?.market_data.market_cap[currency.toLowerCase()]
              .toString()
              .slice(0,-6)
            )}
          </Typography>
        </span>
      </div>
      
      
      
      </div>
      {/* chart */}
      <CoinInfo coin={coin} />
    </div>
  )
}

export default CoinPage