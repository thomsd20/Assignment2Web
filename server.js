const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require("path");
const port = 3000;

var products = require('./scripts/server/products');
var cart = require('./scripts/server/cart');

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({
    extended: true
}));
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
        //console.log("prod: ", json);
        response.send(JSON.stringify(json));
    });
});

app.post('/productdata', (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    //console.log("request: ", request.query);
    products.loadProducts(request.query['filters']).then((json) => {
        //console.log("returning json: ", json);
        response.send(JSON.stringify(json));
    });
});

app.get('/cart', (request, response) => {
    response.sendFile(path.join(__dirname + '/shoppingcart.html'));
});

app.get('/cart/current', (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    cart.loadCart().then((json) => {
        response.send(JSON.stringify(json));
    });
});

app.post('/cart/add', (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    cart.addProductToCart(request.query['product'], request.query['qty']).then((cart) => {
        response.send(JSON.stringify(cart));
    });
});

app.delete('/cart/remove', (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    cart.removeProductFromCart(request.query['product']).then((cart) => {
        response.status(200);
        response.send(JSON.stringify(cart));
    });
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }

    console.log(`server is listening on ${port}`);
    console.log("Press Ctrl+C to Stop server...");
});
