const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
app.use(express.static('static'));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
  //__dirname : It will resolve to your project folder.
});

app.listen(port);
console.log(`Started at ${port}`);
