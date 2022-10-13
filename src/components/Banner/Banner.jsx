import React from 'react'

import { Container,makeStyles,Typography,Avatar } from '@material-ui/core'
import Image from '../../assets/banner2.jpg'
import Carousel from './Carousel';

const useStyles = makeStyles(()=>({
  banner: {
    backgroundImage: "url(../../assets/banner2)",
  },
  bannerContent:{
    height: 400,
    display: "flex",
    paddingTop: 25,
    justifyContent: "space-around",
  },
}));

const Banner = () => {
  const classes = useStyles();
  return (
    <div style={{backgroundImage: `url(${Image})`}}>
      <Container style={{
    height: 400,
    display: "flex",
    paddingTop: 25,
    flexDirection: "column",
    justifyContent: "space-around",
  }}>
        <div className={classes.tagline}> 
        
          <Typography variant = "h2"
          style = {{
            fontWeight: "bold",
            marginBottom: 15,
            fontFamily: "Monteserrat",
            color: "#07BBCE"
          }}
          >
            Crypto Analysis
          </Typography>
          <Typography variant = "subtitle2"
            style={{
              fontWeight: 600,
              color: "#fff",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Cryptocurrency has become extremely popular over the past few years, but many consumers and investors may be wondering what all the commotion is about. Why would anyone choose cryptocurrency when their local currency works just fine for most things? Why would someone invest in a cryptocurrency.
          </Typography>
        </div>
      </Container>
      <Carousel />
    </div>
  )
}

export default Banner