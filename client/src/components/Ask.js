import React from 'react'
import {useHistory} from 'react-router-dom';
import './Ask.scss'

function Ask()  {
    let history = useHistory();
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