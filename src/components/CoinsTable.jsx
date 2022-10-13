import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoCoinContext';
import { TableBody,TableRow,Container,Typography,TextField, TableCell,TableContainer, LinearProgress, Table, TableHead } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { numberWithCommas } from './Banner/Carousel';
import { Pagination } from '@material-ui/lab';

const CoinsTable = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const history = useHistory();

    const {currency,symbol }=CryptoState();

    const fetchCoins = async () =>{
        setLoading(true);
        const {data} = await axios.get(CoinList(currency));

        setCoins(data);
        setLoading(false);
    }
console.log(coins)
    
    useEffect(() => {
      fetchCoins();
    }, [currency])
    
    const handleSearch = () =>{
      return coins.filter((coin)=>(
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
      ))
    }

    
  return (
    <Container>
      <Typography variant = "h4" style={{margin:18,fontFamily:"Montserral"}}>
        Cryptocurrency Price by market cap
      </Typography>
      <TextField label="Search For a Crypto Currency"
                 variant="outlined"
                 style={{marginBottom: 20,width:"100%"}}
                 onChange={(e)=>setSearch(e.target.value)}
      >

      </TextField>
    {/* coin table */}
    <TableContainer>
      {
        loading ? (
          <LinearProgress style={{backgroundColor: "#ffbd59"}}/>
        ) : (
          <Table>
            <TableHead style={{backgroundColor: "#ddd"}}>
              <TableRow>
                {["coin","Price","24h Change","Market Cap"].map((head)=>(
                  <TableCell
                    style={{
                      color: "black",
                      fontWeight: "700",
                      fontFamily: "Monserrat",
                      margin: 0,
                    }}
                    key = {head}
                    align={head === "Coin" ? "left" : "right"}>{head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {handleSearch()
              .slice((page-1)*10,(page-1)*10+10)
              .map((row) =>{
                const profit = row.price_change_percentage_24h > 0;

                return(
                  <TableRow style={{cursor:"pointer"}} onClick={()=>history.push(`/coins/${row.id}`)}>
                    <TableCell>
                      <img src={row?.image} alt={row.name} height="50" style={{marginBottom:10}}/>
                      <span style={{display:"flex",flexDirection:"coulumn",textTransform: "uppercase",fontSize: 22}}>{row.symbol}</span>
                    </TableCell>
                    <TableCell>
                      {symbol} {" "}
                      {numberWithCommas(row.current_price.toFixed(2))}
                    </TableCell>
                    <TableCell style={{
                      color: profit > 0 ? "green":"red",
                      fontWeight: 500,
                    }}>
                      {profit && "+"}
                      {row.price_change_percentage_24h.toFixed(2)}%
                    </TableCell>

                    <TableCell>
                      {symbol}{" "}
                      {numberWithCommas(
                        row.market_cap.toString().slice(0,-6)
                      )}
                      M
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )
      }
    </TableContainer>
    <Pagination 
    style={{
      padding: 20,
      width: "100%",
      display: "flex",
      justifyContent:"center"
    }}
    onChange={(_, value)=>{
      setPage(value);
      window.scroll(0,450);
    }}
    count={(handleSearch()?.length/10).toFixed(0)}/>
    </Container>
    
  )
}

export default CoinsTable