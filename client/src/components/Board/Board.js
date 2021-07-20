import React from 'react';
import io from 'socket.io-client';
import './board.css';
import {useParams} from 'react-router-dom';
import {useState, useEffect,useRef,useCallback} from 'react';
import {Toolbar} from './Toolbar';

export const Board =()=>{
const [socket,setSocket] = useState()
const[currentColor,setCurrentColor] = useState();
const[render,setRender] = useState(0);
const CTX = useRef();
var {id:boardId} = useParams();

/*
Get the page that I am from link and realboardId
*/
var get_page = new String(boardId)
var realBoardId = new String();
let i;
for( i = 0; i < get_page.length; ++i) {
    realBoardId+= new String(get_page.charAt(i))
    if(get_page.charAt(i) ==='$'){
        break;
    }
}
++i;
realBoardId = realBoardId.substring(0,realBoardId.length-1)
var page = new String();
for(; i <= get_page.length; ++i) {
    page+=new String(get_page.charAt(i));
}
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
    if(CTX != null) {
       // CTX.current.globalCompositeOperation = "destination-out"
    CTX.current.strokeStyle='#ffffff';
}
}
const handleRegularMode=(e) => {
    if(CTX != null) {CTX.current.globalCompositeOperation = "source-over"
   
}
}

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



function white2transparent(img)
{
    var c = document.createElement('canvas');

    var w = img.width || img.naturalWidth, h = img.height || img.naturalHeight;
if(w == 0 || h == 0) return -1;
    c.width = w;
    c.height = h;
    console.log("The width is" + w);
    console.log("The height is" + h);
    
    var ctx = c.getContext('2d');

    ctx.drawImage(img, 0, 0, w, h);
    var imageData = ctx.getImageData(0,0, w, h);
    var pixel = imageData.data;

    var r=0, g=1, b=2,a=3;
    for (var p = 0; p<pixel.length; p+=4)
    {
      if (
          pixel[p+r] == 255 &&
          pixel[p+g] == 255 &&
          pixel[p+b] == 255) // if white then change alpha to 0
      {pixel[p+a] = 0;}
    }

    ctx.putImageData(imageData,0,0);

    return c.toDataURL('image/png');

}
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
            ctx.clearRect(0, 0, canvas.width, canvas.height);
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
       image.src = data;
     
       
        var ctx = canvas.getContext("2d");
        if(ctx.strokeStyle ==='#ffffff') {
            console.log("radiera acum");    

            return; 
    }
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
            handleColor={handleColor} handleEraserMode={handleEraserMode} handleRegularMode={handleRegularMode}
            page = {page} realBoardId={realBoardId}
        />
        <div className="sketch" id ="sketch">
           
           <canvas className="board" id ="board"></canvas>
        </div>
        </>
            )
    
}