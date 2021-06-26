import  React from 'react';

import './container.css';
import {Toolbar} from './Toolbar';

import {useState} from 'react';
import NavbarProf from '../NavbarProf';
import {useParams} from 'react-router-dom';
import DrawingBoard from 'react-drawing-board'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { useEffect,useRef,useCallback} from 'react';
import io from 'socket.io-client';
function Container(){
  var {id:boardId} = useParams();
const [socket,setSocket] = useState();
useEffect(() => {
  const s = io("http://localhost:3002");
  setSocket(s)
  
  return () => {
    s.disconnect()
  }
}, [])




useEffect(() =>{
//Aici salvez tabla in baza de date
  if(socket == null) return;
  const interval =setInterval(() =>
  { 
      console.log("salvez")
      var canvas = document.querySelector('.drawing-board-sketchpad-canvas');
         var base64ImageData=canvas.toDataURL("image/png");
          socket.emit("save-board",base64ImageData);
  },3000)
  return () =>clearInterval(interval);
},[socket])
useEffect(() => {
   

  
  if(socket == null) return;
  socket.once("load-board",data => {
      var image = new Image();
      var canvas = document.querySelector('.drawing-board-sketchpad-canvas');
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      image.onload = function () {
          ctx.drawImage(image,0,0);
      }
      image.src=data;
  });
 
socket.emit("get-board",boardId);

  
},[socket])
useEffect(() => {
if(socket == null) return;
socket.on("canvas-data", function(data){
    console.log("enter");
  var image = new Image();
  var canvas = document.querySelector('.drawing-board-sketchpad-canvas');
  var ctx = canvas.getContext("2d");
  image.onload = function () {
      ctx.drawImage(image,0,0);
  }
  image.src=data;
});
},[socket])
useEffect(() =>{
if(socket == null) return;
const interval =setInterval(() =>
{ 
  console.log("trimit")
  var canvas = document.querySelector('.drawing-board-sketchpad-canvas');
     var base64ImageData=canvas.toDataURL("image/png");
      socket.emit("canvas-data",base64ImageData);
},1000)
return () =>clearInterval(interval);
},[socket])
return (
        <>
    <NavbarProf/>
    <DrawingBoard/>

          </>        
         
    )
    }
   
export default  Container;