console.log("Loading Cart...");

// Cart needs to
// 1. Hold JSON information for each product
// 2. Must be able to add and delete products from cart
// 3. Save shopping cart list as JSON file

function loadProducts(){
    // Load products from JSON file
    readJSONFile("products.json", (json) => {
        var data = JSON.parse(json);
        data.forEach((product) => {

        });
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
