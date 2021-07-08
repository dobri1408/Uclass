import React from 'react';
import Meeting from './Meeting';
import Message from './Message';
import File from './File';


const GeneralCard = ({info,name}) => {
    if ('message' in info) {
        return <Message info={info}/>
    } else if ('start' in info) {
        return <Meeting info={info}/>
    } else {
        return <File info={info} name={name}/>
    }
}

export default GeneralCard