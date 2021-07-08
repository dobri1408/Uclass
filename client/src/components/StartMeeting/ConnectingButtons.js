import React from 'react'
import ConnectingButton from './ConnectingButton'
import {useHistory } from 'react-router-dom';




const ConnectingButtons = () => {
    let history = useHistory();
    const pushToJoinRoomPage = () => {
    history.push('/join-room');
    console.log('intrrrrrr');
    }
    const pushToJoinRoomPageAsHost = () => {
        history.push('/join-room?host=true');
    }
    return (
        <div className='connecting_buttons_container'>
                <ConnectingButton
                buttonText='Intra intr-o pregaitre'
                onClickHandler={pushToJoinRoomPage}/>
                   <ConnectingButton
                buttonText='Creeaza o pregatire'
                createRoomButton 
                onClickHandler={pushToJoinRoomPageAsHost}/>

        </div>
    )
}

export default ConnectingButtons
