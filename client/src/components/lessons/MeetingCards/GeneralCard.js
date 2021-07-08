import React from 'react';
import Meeting from './Meeting';
import Message from './Message';
import File from './File';


const GeneralCard = ({info}) => {
    if ('message' in info) {
        console.log('got to 1')
        return <Message info={info}/>
    } else if ('start' in info) {
        console.log('got to 2')
        return <Meeting info={info}/>
    } else {
        console.log('got to 3')
        return <File info={info}/>
    }
}

export default GeneralCard