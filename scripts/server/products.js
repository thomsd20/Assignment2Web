var fs = require('fs');

exports.loadProducts = function (filters) {
    if (filters) {
        return new Promise((resolve, reject) => {
            fs.readFile('products.json', 'utf-8', (err, data) => {
                if (err) reject();
                var parsedData = JSON.parse(data);
                var filteredProducts = new Array();
                var filtersArray = filters.split(',');

                for(var i = 0; i < parsedData.length; i++){
                    for(var j = 0; j < filtersArray.length; j++){
                        if(parsedData[i].type === filtersArray[j]){
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

exports.saveCart = function (cart) {
    return new Promise((resolve, reject) => {

    });
}