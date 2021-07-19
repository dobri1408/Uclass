import React, {useEffect} from 'react'
import {useHistory} from 'react-router-dom';
import './Ask.scss'

function Ask()  {
    let history = useHistory();
    // useEffect (() => 
    //     {
    //         var styleei=document.getElementById("styleei");
    //         if (styleei){
    //             styleei.style.height= window.screen.height;
    //             console.log(window.screen.height);
    //             styleei.style.width= window.screen.width;
                
    //         }
    //     }, []
    // )
    return (
        <div id='styleei'>
        <button id='esti_prof' onClick={()=>{history.push('/signprofesor')}}>
            <h1  style={{color:"white"}}>Esti profesor?</h1>
        </button>
        <button id='esti_elev' onClick={()=>{history.push('/signelev')}}>
            <h1 style={{color:"black"}}>Esti elev?</h1>
        </button>
        </div>
    )
}

export default Ask
