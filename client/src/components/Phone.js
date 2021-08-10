import React from 'react';
import Logo from './LOGO UCLASS ALB full.png'
import Test from './Animation/Test';
import Typography from '@material-ui/core/Typography';

function Phone() {
    return(
    // <div style={{backgroundColor: '#345F65',height:'100vh',width:'100wh'}}>
    //     <img style={{marginTop:'90px', height:'350px'}} src={Logo} alt="Uclass"/>
    //     <p style={{fontSize:'20px',marginRight:'10px',marginLeft:'10px',color:'#FFFFFF'}}>Uclass is not available for your device at the moment. We are now developing an app for your phone.<br/> Try using Uclass on your PC or laptop.</p>
    // </div>
    <div>
        <Test/>
        <div style={{
            position: 'fixed',
            zIndex: 200,
        }}>
            <img style={{
                marginLeft: '10%',
                marginRight: '10%',
                width: '80%'
            }} src={Logo} alt="Uclass"/>
            <Typography style={{
                color: 'white',
                fontSize: 30,
                fontWeight: 600,
                textAlign: 'center'
            }}>
                Uclass is not available for your device at the moment. 
                In order to use all features please try using Uclass on your PC or laptop.
            </Typography>
        </div>
    </div>
    );
}

export default Phone
