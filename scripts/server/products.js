var fs = require('fs');

exports.loadProducts = function () {
    return new Promise((resolve, reject) => {
        fs.readFile('products.json', 'utf-8', (err, data) => {
            if (err) reject();
            resolve(JSON.parse(data));
        });
    });
}

exports.saveCart = function(cart) {
    return new Promise((resolve, reject) => {
        
    });
}