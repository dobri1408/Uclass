import socketClient from 'socket.io-client';
const SERVER = 'http://localhost:5000';
let socket;

export const connectWithWebScocket = () =>{
    socket = socketClient(SERVER);
    socket.on('connection',()=>{
    console.log('muie')
    console.log(socket.id);
    })
}