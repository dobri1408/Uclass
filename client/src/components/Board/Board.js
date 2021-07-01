import React from 'react';
import io from 'socket.io-client';
import './board.css';
import {useParams} from 'react-router-dom';
import {useState, useEffect,useRef,useCallback} from 'react';
import {Toolbar} from './Toolbar'
export default function Board() {
const [socket,setSocket] = useState()
const[currentColor,setCurrentColor] = useState();
const CTX = useRef();
const {id:boardId} = useParams();
const selectedColor = useRef("#000000");
var ctx;

const handleColor = (e) => {
    setCurrentColor(e.currentTarget.value);
    selectedColor.current = e.currentTarget.value;
     
     if(CTX != null) {
        CTX.current.strokeStyle =currentColor;
        console.log(currentColor);
     }

  }; 
const handleWidth=(e) =>{
if(CTX != null) {
    CTX.current.lineWidth=e.currentTarget.value;
}
    //e.currentTarget.value
}
const handleEraserMode=(e) => {
    if(CTX != null) {CTX.current.globalCompositeOperation = "destination-out"
    }
}
const handleRegularMode=(e) => {
    if(CTX != null) {CTX.current.globalCompositeOperation = "source-over"
    }
}
console.log(boardId);
useEffect(() =>{
    if(socket == null) return;
    const interval =setInterval(() =>
    { 
        console.log("salvez")
        var canvas = document.querySelector('#board');
           var base64ImageData=canvas.toDataURL("image/png");
            socket.emit("save-board",base64ImageData);
    },7000)
    return () =>clearInterval(interval);
},[socket])

useEffect(() => {
    const s = io("http://localhost:3002");
    setSocket(s)
    
    return () => {
      s.disconnect()
    }
  }, [])
  useEffect(() => {
      
        if(socket == null) return;
        socket.once("load-board",data => {
            var image = new Image();
            var canvas = document.querySelector("#board");
            var ctx = canvas.getContext("2d");
            image.onload = function () {
                ctx.drawImage(image,0,0);
            }
            image.src=data;
        });
    socket.emit("get-board",boardId);
    drawonCanvas();
        
  },[socket])
  useEffect(() => {
      if(socket == null) return;
      socket.on("canvas-data", function(data){
          console.log("enter");
        var image = new Image();
        var canvas = document.querySelector("#board");
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
        var canvas = document.querySelector('#board');
           var base64ImageData=canvas.toDataURL("image/png");
            socket.emit("canvas-data",base64ImageData);
    },1000)
    return () =>clearInterval(interval);
},[socket])

    const  drawonCanvas= useCallback((e)=> {
        var canvas = document.querySelector('#board');
         ctx = canvas.getContext('2d');
        CTX.current = ctx;
         ctx.StrokeStyle = currentColor;
        console.log(currentColor);
        var sketch = document.querySelector('#sketch');
        var sketch_style = getComputedStyle(sketch);
        var w  = parseInt(sketch_style.getPropertyValue('width'));
        var h = parseInt(sketch_style.getPropertyValue('height'));

        canvas.width = w;
        canvas.height = h

        var mouse = {x: 0, y: 0};
        var last_mouse = {x: 0, y: 0};

        /* Mouse Capturing Work */
       canvas.addEventListener('mousemove', function(e) {
            last_mouse.x = mouse.x;
            last_mouse.y = mouse.y;

            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;
        }, false);


        /* Drawing on Paint App */
        ctx.lineWidth = 5;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'blue';

        canvas.addEventListener('mousedown', function(e) {
            canvas.addEventListener('mousemove', onPaint, false);
        }, false);

        canvas.addEventListener('mouseup', function() {
            canvas.removeEventListener('mousemove', onPaint, false);
        }, false);
    var root= this;
        var onPaint = function() {
            ctx.beginPath();
            ctx.moveTo(last_mouse.x, last_mouse.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.closePath();
            ctx.stroke();
          
        };
    },[ctx,currentColor],)
   
        return (
            <>
            <Toolbar handleWidth={handleWidth}
            handleColor={handleColor} handleEraserMode={handleEraserMode} handleRegularMode={handleRegularMode}/>
        <div className="sketch" id ="sketch">
           
           <canvas className="board" id ="board"></canvas>
        </div>
        </>
            )
    
}