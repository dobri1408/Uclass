var app = require('express')();
const Board = require('./Board');
var http = require('http').createServer(app);
const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost/board", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})
var io = require('socket.io')(http,{
    cors: { 
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
},
});
io.on('connection',(socket) => {  
    console.log('connected');
    socket.on('get-board',async (BoardId) =>{ 
        const board = await findOrCreateBoard(BoardId);
console.log("intru");
        socket.join(BoardId)
        socket.emit("load-board",board.data);
        console.log(BoardId);
        socket.on('canvas-data',(data) => {
        socket.broadcast.to(BoardId).emit('canvas-data',data);
     
        
    }
    )
    socket.on('save-board',async data => {
        await Board.findByIdAndUpdate(BoardId,{data});
    })
})
  
   
 

})
var server_port = process.env.PORT || 3002;
http.listen(server_port, () => {
    console.log('Server running on port ' + server_port);

})

async function findOrCreateBoard(id){
    if(id == null) return;
    const board = await Board.findById(id);
    if(board) return board;
    return await Board.create({_id:id,data:Object})
}
