const express = require('express');
const bodyParser = require('body-parser');

let app = express();

let port = process.env.PORT || 3000;
app.listen(port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res) => {
  res.end('hello world');
});


app.post('/', (req, res) => {

});
