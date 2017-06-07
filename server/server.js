// content of index.js
const express = require('express');
const app = express();
const path = require("path");
const port = 3000;

app.get('/', (request, response) => {
    //response.send("Hello from express!");
    response.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port, (err) => {
    if(err){
        return console.log('something bad happened', err);
    }

    console.log(`server is listening on ${port}`);
});
