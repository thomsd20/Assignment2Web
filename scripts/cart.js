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
    $.ajax({
        url: "/productData",
        dataType: "json",
        success: function(json){
            console.log("JSON: ", json);
        }
    })
}
