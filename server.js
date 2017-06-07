// content of index.js
const express = require('express');
const app = express();
const path = require("path");
const port = 3000;

//app.use("/styles", express.static(__dirname + '/styles'));
//app.use("/scripts", express.static(__dirname + '/scripts'));
//app.use("/images", express.static(__dirname + '/images'));
app.use("/", express.static(__dirname));

app.get('/', (request, response) => {
    //response.send("Hello from express!");
    response.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/products', (request, response) => {
    response.sendFile(path.join(__dirname + '/products.html'));
});

app.listen(port, (err) => {
    if(err){
        return console.log('something bad happened', err);
    }

    console.log(`server is listening on ${port}`);
});
