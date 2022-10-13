import React,{useEffect, useState} from 'react'
import { TrendingCoins } from '../../config/api'
import { CryptoState } from '../../CryptoCoinContext'
import axios from 'axios';
import AliceCarousel from 'react-alice-carousel';
import {Link} from 'react-router-dom';
import 'react-alice-carousel/lib/alice-carousel.css';

export function numberWithCommas(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}

const Carousel = () => {

    const [trending,setTrending] = useState([]);

    const {currency,symbol} = CryptoState();

    const fetchTrandingCoins =async () =>{
        const {data} = await axios.get(TrendingCoins(currency));

        setTrending(data);
    }
    useEffect(()=>{
        fetchTrandingCoins();
    },[currency]);

    
    const items = trending.map((coin)=>{
        let profit = coin?.price_change_percentage_24h >= 0;
        return(
        <Link style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            textTransform: "uppercase",
            color: "whitesmoke",
        }}  to={`/coins/${coin.id}`}>
            <img 
                src = {coin?.image}
                alt = {coin.name}
                height= "80"
                style={{marginBottom: 10}}
                />
                <span style={{color: profit>0?"rgba(14,203,129)":"red",
                            fontWeight:500,
            }}>
                    {coin?.symbol}
                    &nbsp;
                    <span>{profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%</span>
                </span>
                <span style={{fontSize:22, fontWeight: 5000}}>
                  {symbol}{numberWithCommas(coin?.current_price.toFixed(2))} {currency}
                </span>
        </Link>
        )
    })
    
    console.log(items);

    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4,
        },
    };

  return (
    <div style={{
        height: "50%",
        display: "flex",
        alignItems: "center",
    }}>
        <AliceCarousel 
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableButtonsControls
                responsive
                items={items}
                autoPlay
            />

    </div>
  )
}

export default Carousel
