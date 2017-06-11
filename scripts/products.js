var fs = require('fs');

module.exports.loadProducts = function () {
    fs.readFile('products.json', 'utf-8', (err, data) => {
        if (err) throw err;
        console.log("Products Loaded from file: ", JSON.parse(data));
        module.exports.productJson = JSON.parse(data);
        return JSON.parse(data);
    });
}