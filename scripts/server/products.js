var fs = require('fs');

exports.loadProducts = function (filters) {
    if (filters) {
        return new Promise((resolve, reject) => {
            fs.readFile('products.json', 'utf-8', (err, data) => {
                if (err) reject();
                var parsedData = JSON.parse(data);
                var filteredProducts = new Array();

                if (filters !== "features" && filters !== "deals") { // Normal request - respond with all products
                    var filtersArray = filters.split(',');

                    for (var i = 0; i < parsedData.length; i++) {
                        for (var j = 0; j < filtersArray.length; j++) {
                            if (parsedData[i].type === filtersArray[j]) {
                                filteredProducts.push(parsedData[i]);
                            }
                        }
                    }
                } else if (filters === "features") { // Respond with featured products
                    for (var i = 0; i < parsedData.length; i++) {
                        if (parsedData[i].feature) {
                            filteredProducts.push(parsedData[i]);
                        }
                    }
                } else if (filters === "deals") { // Find the products with deals as true
                    for (var i = 0; i < parsedData.length; i++) {
                        if (parsedData[i].deal) {
                            filteredProducts.push(parsedData[i]);
                        }
                    }
                }
                resolve(filteredProducts);
            });
        });
    } else {
        return new Promise((resolve, reject) => {
            fs.readFile('products.json', 'utf-8', (err, data) => {
                if (err) reject();
                resolve(JSON.parse(data));
            });
        });
    }
}
