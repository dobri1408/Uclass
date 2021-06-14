require("dotenv").config();
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT;
const app = express();
//idk
const server = http.createServer(app);
const Routes = require("./meeting/routes");
app.use(cors({origin:'http://188.166.119.126:3000'}))
app.use([
  cors(),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false }),
  Routes,
]);

const io = (module.exports.io = require("socket.io")(server,{
  cors: {
    origin: "http://188.166.119.126:3000",
    methods: ["GET", "POST"]
  }
}));
const socketManager = require("./meeting/socketManager");
io.on("connection", socketManager);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});