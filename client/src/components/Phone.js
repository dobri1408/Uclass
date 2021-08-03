import React, {useState, useEffect, useRef} from 'react';

import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions'; 
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import Logo from './LOGO UCLASS ALB full.png'
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import {datas} from './pages/HomePage/Data.js'
import { makeStyles } from '@material-ui/core/styles';
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import { useHistory } from 'react-router-dom';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

function Phone() {
    return(
    <div style={{backgroundColor: '#345F65',height:'100vh',width:'100wh'}}>
        <img style={{marginTop:'90px', height:'350px'}} src={Logo} alt="Uclass"/>
        <p style={{fontSize:'20px',marginRight:'10px',marginLeft:'10px',color:'#FFFFFF'}}>Uclass is not available for your device at the moment. We are now developing an app for your phone.<br/> Try using Uclass on your PC or laptop.</p>
    </div>
    );
}

export default Phone
