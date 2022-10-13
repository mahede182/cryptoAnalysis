import React, { useState,useContext, useEffect } from 'react'
import {createContext} from 'react'


const CryptoCoin = createContext();

function CryptoCoinContext({children}) {
    const [currency,setCurrency] = useState("BDT");
    const [symbol, setSymbol] = useState("৳");

    useEffect(()=>{
        if(currency === "BDT") setSymbol("৳");
        else if(currency === "USD") setSymbol("$");
    },[currency])

  return (
     <CryptoCoin.Provider value={{currency,symbol,setCurrency}}>
        {children}
     </CryptoCoin.Provider>
  )
}

export default CryptoCoinContext

export const CryptoState = () =>{
   return useContext(CryptoCoin)
}