import  React from 'react';
import mergeImages from 'merge-images';
import './container.css';
import {Toolbar} from './Toolbar';
import {useState} from 'react';
import NavbarProf from '../NavbarProf';
import {useParams} from 'react-router-dom';
import DrawingBoard from 'react-drawing-board';
import {drawImage} from 'react-drawing-board'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { useEffect,useRef,useCallback} from 'react';
import io from 'socket.io-client';
import {Board} from './Board'
function Container(){
  /*var {id:boardId} = useParams();
  const [previousImage, setPreviousImage] = useState();
const [socket,setSocket] = useState();
var datas;
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
         var ctx = canvas.getContext("2d");
      var imagebg = new Image();
      imagebg.src=datas;
      console.log(datas);
 
           var base64ImageData=canvas.toDataURL("image/png");
           mergeImages([imagebg.src,base64ImageData]) 
           .then( b64=>        { socket.emit("save-board",b64); datas=b64})


  },3000)
  return () =>clearInterval(interval);
},[socket])
useEffect(() => {
   

  
  if(socket == null) return;
  socket.once("load-board",data => {
      var image = new Image();
   datas = data;
      var canvas = document.querySelector('.drawing-board-sketchpad-canvas');
      var ctx = canvas.getContext("2d");
     
      image.onload = function () {
      canvas.style.background = 'url(' + this.src+')';
      setPreviousImage(image);
    }
      image.src=data;
   
      if(image){
        console.log("muie");
      }
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
  var base64ImageData =canvas.toDataURL("image1/png")
    mergeImages([datas,data,base64ImageData]).then(b64=>image.src =b64)
    image.onload = function () {
      canvas.style.background = 'url(' + this.src+')';
    }
   
  });
  },[socket])
useEffect(() =>{
if(socket == null) return;
const interval =setInterval(() =>
{ 
  console.log("trimit")
  var canvas = document.querySelector('.drawing-board-sketchpad-canvas');
     var base64ImageData=canvas.toDataURL("image/png");
     mergeImages([datas,base64ImageData]).then(b64=> socket.emit("canvas-data",b64))
    
},1000)
return () =>clearInterval(interval);
},[socket])
var idk;
console.log("IDk"+idk);*/
return (
        <>
        <NavbarProf/>
    <Board/>

          </>        
         
    )
    }
   
export default  Container;