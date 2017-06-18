// Handles data and adding and removing cart items
var JsonDB = require('node-json-db');

var cartDB = new JsonDB("cartDatabase", true, true);

var products = require('./products');

exports.addProductToCart = function (product, qty) {
    console.log("in product: ", product);
    return new Promise((resolve, reject) => {
        try {
            cartDB.reload();
            var cartData = cartDB.getData("/cart/items");
            var foundItemInCart = false;
            var itemIndex = -1;
            for (var i = 0; i < cartData.length; i++) {
                if (JSON.parse(product).pid === cartData[i].pid) {
                    //Product already in cart - update qty
                    foundItemInCart = true;
                    itemIndex = i;
                }
            }
            if (foundItemInCart) {
                var productObj = JSON.parse(product);
                productObj.qty = Number(cartData[itemIndex].qty) + 1;
                exports.modifyProductInCart(JSON.stringify(productObj));
            } else {
                cartDB.reload();
                cartDB.push("/cart/items[]", {
                    "pid": JSON.parse(product).pid,
                    "qty": qty
                }, true);
                //cartDB.push("/" + JSON.parse(product).pid, { "pid": JSON.parse(product).pid, "qty": qty });
                cartDB.save();
            }
            resolve(cartDB.getData('/'));
        } catch (error) {
            console.error(error);
            reject(error);
        }
    });
}

exports.modifyProductInCart = function (productData) {
    var product = JSON.parse(productData);
    console.log("Changing Product: ", product);
    return new Promise((resolve, reject) => {
        try {
            cartDB.reload();
            var items = cartDB.getData("/cart/items");
            for (var i = 0; i < items.length; i++) {
                if (items[i].pid === product.pid) {
                    var cartItem = {
                        "pid": product.pid,
                        "qty": product.qty
                    };
                    cartDB.push("/cart/items[" + i + "]", cartItem);
                }
            }
            //cartDB.push("/" + JSON.parse(product).pid, { "pid": JSON.parse(product).pid, "qty": qty });
            cartDB.save();
            resolve(cartDB.getData('/'));
        } catch (error) {
            console.error(error);
            reject(error);
        }
    });
}

exports.removeProductFromCart = function (productData) {
    var product = JSON.parse(productData);
    return new Promise((resolve, reject) => {
        try {
            cartDB.reload();
            var items = cartDB.getData('/cart/items');
            for (var i = 0; i < items.length; i++) {
                if (items[i].pid == product.pid) {
                    cartDB.delete("/cart/items[" + i + "]");
                }
            }
            resolve(cartDB.getData('/'));
        } catch (error) {
            console.error(error);
            reject(error);
        }
    });
}

exports.loadCart = function () {
    return new Promise((resolve, reject) => {
        try {
            cartDB.reload();
            var items = cartDB.getData('/cart/items');
            //console.log("Items: ", items);
            products.loadProducts().then((productData) => {
                var productArray = Array();

                for (var i = 0; i < items.length; i++) {
                    for (var p = 0; p < productData.length; p++) {
                        if (items[i].pid === productData[p].pid) {
                            productData[p]['qty'] = items[i].qty; // Add quantity to object
                            productArray.push(productData[p]);
                        }
                    }
                }
                //console.log("Product Array: ", productArray);
                resolve(productArray);
            }, (error) => {
                console.error(error);
            });
        } catch (error) {
            console.error(error);
            reject(error);
        }
    });
}

/*
[
    {
        "pid": "01",
        "qty": 1
    },
    {
        "pid": "05",
        "qty": 4
    }
]
*/