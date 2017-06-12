// Loads products from express API

var productsList = {};

$(document).ready(function () {
    loadProducts();
});

function loadProducts(filterTypes) { // Array of current type filters
    if (filterTypes) {
        var filterStr = "";
        for(var t = 0; t < filterTypes.length; t++){
            if(t === filterTypes.length-1){
                filterStr += filterTypes[t];
            } else {
                filterStr += filterTypes[t] + ",";
            }
        }
        $.ajax({
            url: "/productdata?filters=" + encodeURIComponent(filterStr),
            type: "POST",
            success: displayProducts
        });
    } else {
        $.ajax({
            url: "/productdata",
            dataType: "json",
            success: displayProducts
        });
    }
}

/* Using the JSON data returned from our node API we build each product tile and add it to the html page using jQuery */
function displayProducts(data) {
    var $productsDiv = $('#productsDiv');
    $productsDiv.empty();
    for (var i = 0; i < data.length; i++) {
        var $link = $("<a href='#'>");
        var $div = $("<div>", { "class": "product" });
        $("<img>").attr("src", data[i].imgSrc).attr("title", data[i].title).appendTo($div);
        var $display = $("<div>", { "class": "dealtext" });
        var $price = $("<h2>").text("$" + data[i].price).appendTo($display);
        $("<span>").attr("class", "fa fa-plus-circle pull-right addToCart").attr("aria-hidden", "true").appendTo($price);
        $("<h4>").text(data[i].title).appendTo($display);
        $div.append($display);
        $productsDiv.append($div);
    }
}

function addToCart(product) {

}