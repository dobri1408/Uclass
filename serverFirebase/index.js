const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 1000;
app.use(bodyParser.raw({
    inflate: true,
    limit: '100kb',
    type: 'application/octet-stream'
  }));



let obj = {ceva:'ceva'};




app.post('/postFirebaseData', (req, res) => {
    res.send(JSON.stringify(req.body));
});

app.get('/getFirebaseData', (req,res) => {
    res.send(obj)
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});