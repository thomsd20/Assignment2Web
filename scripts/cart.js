var fs = require('fs');

console.log("Loading Cart...");

// Cart needs to
// 1. Hold JSON information for each product
// 2. Must be able to add and delete products from cart
// 3. Save shopping cart list as JSON file

var productsList = {};

$(document).ready(function() {
    loadProducts();
});

function loadProducts(){
    fs.readFile('../products.json', 'utf-8', (err, data) => {
        if (err) throw err;
        productsList = JSON.parse(data);
        console.log("Products Loaded from file: ", productsList);
    });
}

//JSON Loader
function readJSONFile(file, callback) {
    var jsonFile = new XMLHttpRequest();
    jsonFile.overrideMimeType('application/json');
    jsonFile.open("GET", file, true);
    jsonFile.onreadystatechange = () => {
        if (jsonFile.readyState === 4 && jsonFile.status == "200") {
            callback(jsonFile.responseText);
        }
    };
    jsonFile.send(null);
}
