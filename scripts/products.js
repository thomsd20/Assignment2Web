// Loads products from express API

var selectedType = "";
var productsList = {};

$(document).ready(function () {
    loadProducts();
});

function loadProducts(filterTypes) { // Array of current type filters
    if (filterTypes) {
        // Highlight selected type
        $(".category").removeClass("selectedCategory");
        if(filterTypes[0] == "all"){
            $("#nofilter").addClass("selectedCategory");
        } else {
            $("#" + filterTypes[0]).addClass("selectedCategory");
        }
        var filterStr = "";
        for (var t = 0; t < filterTypes.length; t++) {
            if (t === filterTypes.length - 1) {
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
        var $rowDiv;
        if (i % 2 === 0) {
            $rowDiv = $("<div>").attr("class", "row");
        }
        //<div class="col-md-6" style="height:320px; margin-top:20px;margin-left:0px;">
        var $div = $("<div>").attr("class", "col-md-6").attr("style", "height:320px; margin-top:20px;margin-left:0px;");
        // <div class="thumbnail">
        var $thumbnailDiv = $("<div>").attr("class", "thumbnail");
        // <div class="row" style="height:350px;">
        var $rowDivHeight = $("<div>").attr("class", "row").attr("style", "height:350px;");
        // <div class="productimg col-md-4" style="height:300px;">
        var $productImgDiv = $("<div>").attr("class", "productimg col-md-4").attr("style", "height:300px;");
        // <img src="images/oyster bay wine.jpg" alt="">
        $("<img>").attr("src", data[i].imgSrc).appendTo($productImgDiv);
        // <div class="col-md-8" style="height:300px;">
        var $divHeight = $("<div>").attr("class", "col-md-8").attr("style", "height:300px;");
        // <div class="producttext" style="height:210px; padding-left:30px;">
        var $productText = $("<div>").attr("class", "producttext").attr("style", "height:210px; padding-left:30px;");
        $productText.append($("<h2>").text("$" + data[i].price));
        $productText.append($("<h4>").text(data[i].title));
        $productText.append($("<p>").text(data[i].description));

        // <div class="control" style="height:130px;">
        var $controlDiv = $("<div>").attr("class", "control").attr("style", "height:130px;");
        $controlDiv.append($("<hr>").attr("class", "line"));
        // <div class="col-md-6 col-sm-6" style="padding-top:5px;">
        var $viewMoreDiv = $("<div>").attr("class", "col-md-6 col-sm-6").attr("style", "padding-top:5px;");
        $viewMoreDiv.append($("<a>").attr("href", "").text("View More"));

        var self = this;

        // <div class="col-md-6 col-sm-6">
        var $addToCartDiv = $("<div>").attr("class", "col-md-6 col-sm-6");
        $addToCartDiv.append($("<button>")
            .attr("class", "btn btn-danger right")
            .text("+ Add to Cart")
            .click({ "product": data[i], "qty": 1 }, addToCartClick));

        // Add View and add to cart buttons to the control div
        $controlDiv.append($viewMoreDiv);
        $controlDiv.append($addToCartDiv);

        // Add the control and producttext to the height 300px div
        $divHeight.append($productText);
        $divHeight.append($controlDiv);

        // Add divHeight to rowDivHeight
        $rowDivHeight.append($productImgDiv);
        $rowDivHeight.append($divHeight);

        // Add rowDivHeight to thumbnailDiv
        $thumbnailDiv.append($rowDivHeight);

        // Add thumbnail to div
        $div.append($thumbnailDiv);

        $rowDiv.append($div);

        $productsDiv.append($rowDiv);
    }
}

function addToCartClick(data) {
    var product = data.data.product;
    var qty = data.data.qty;

    addProductToCart(product, qty);
}

/*var $link = $("<a href='#'>");
var $div = $("<div>", { "class": "product" });
$("<img>").attr("src", data[i].imgSrc).attr("title", data[i].title).appendTo($div);
var $display = $("<div>", { "class": "dealtext" });
var $price = $("<h2>").text("$" + data[i].price).appendTo($display);
$("<span>").attr("class", "fa fa-plus-circle pull-right addToCart").attr("aria-hidden", "true").appendTo($price);
$("<h4>").text(data[i].title).appendTo($display);
$div.append($display);
$productsDiv.append($div);*/

function addToCart(product) {

}