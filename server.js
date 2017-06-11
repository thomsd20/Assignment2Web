const express = require('express');
const app = express();
const path = require("path");
const port = 3000;

var products = require('./scripts/products');

app.use("/", express.static(__dirname));

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/products', (request, response) => {
    response.sendFile(path.join(__dirname + '/products.html'));
});

app.set('json spaces', 4);
// Products data route
app.get('/productdata', (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    var prod = products.loadProducts();
    console.log("prod: ", module.exports.productJson);
    response.send(JSON.stringify(prod));
});

app.get('/cart', (request, response) => {
    response.sendFile(path.join(__dirname + '/cart.html'));
});

app.listen(port, (err) => {
    if(err){
        return console.log('something bad happened', err);
    }

    console.log(`server is listening on ${port}`);
    console.log("Press Ctrl+C to Stop server...");
});
