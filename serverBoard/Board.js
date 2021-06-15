const {Schema, model} = require('mongoose');

const Board = new Schema({
    _id:String,
    data:Object,
})
module.exports = model("Board", Board);