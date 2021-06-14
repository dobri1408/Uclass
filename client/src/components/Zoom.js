import React from 'react';
import {ZoomMtg} from '@zoomus/websdk'
import {useEffect} from 'react';
function Zoom() {
useEffect(() =>{
    ZoomMtg.setZoomJSLib('http://localhost:3000/custom/path/to/lib/', '/av');
},[])
    return (
        <div>
            
        </div>
    )
}

export default Zoom
