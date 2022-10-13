import React from 'react'
import{ AppBar,Container,Toolbar,Typography,Select,MenuItem,Avatar} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { CryptoState } from '../CryptoCoinContext';
import logo from '../assets/logoblack.png';
// 
const Header = () => {
    const history = useHistory();

    const {currency, setCurrency} = CryptoState();
  return (
    <AppBar color = 'transparent' position = 'static'>
        <Container>
            <Toolbar>
            <Avatar alt="C" src={logo}/>
                <Typography style={{cursor:"pointer"}} onClick={()=>history.push("/")}>
                    CryptoAnalysis
                </Typography>
                <Select value = {currency} onChange={(e) => setCurrency(e.target.value)} variant = "outlined" style = {{
                    width: 100,
                    height: 40,
                    marginLeft: 15
                }}>
                    <MenuItem value={"USD"}>USD</MenuItem>
                    <MenuItem value={"BDT"}>BDT</MenuItem>
                </Select>
            </Toolbar>
        </Container>
    </AppBar>
  )
}

export default Header