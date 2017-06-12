const express = require('express');
const app = express();
const path = require("path");
const port = 3000;

var products = require('./scripts/server/products');

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
    products.loadProducts().then((json) => {
        console.log("prod: ", json);
        response.send(JSON.stringify(json));
    });
});

app.get('/cart', (request, response) => {
    response.sendFile(path.join(__dirname + '/shoppingcart.html'));
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }

    console.log(`server is listening on ${port}`);
    console.log("Press Ctrl+C to Stop server...");
});
