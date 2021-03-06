// Cart needs to
// 1. Hold JSON information for each product
// 2. Must be able to add and delete products from cart
// 3. Save shopping cart list as JSON file

var productsList = {};

$(document).ready(function () {
    //loadCart();
});

function loadCart() {
    // Get current cart from API
    console.log("Loading Cart...");
    $.ajax({
        url: "/cart/current",
        dataType: "json",
        success: displayCart
    });
}

function addProductToCart(product, qty) {
    // Send PID and quantity to server
    $.ajax({
        url: "/cart/add?product=" + encodeURIComponent(JSON.stringify(product)) + "&qty=" + encodeURIComponent(qty),
        type: "POST"
    });
}

function modifyCartProduct(product){
    console.log("Sending product: ", product);
    $.ajax({
        url: "/cart/modify?product=" + encodeURIComponent(JSON.stringify(product)) + "&qty=" + encodeURIComponent(product.qty),
        type: "PUT"
    });
}

function removeFromCart(product) {
    console.log("Removing product: ", product);
    $.ajax({
        url: "/cart/remove?product=" + encodeURIComponent(JSON.stringify(product)),
        type: "DELETE"
    });
}

function removeFromCartClick(data){
    var prod = data.data.product;
    removeFromCart(prod);
    location.reload(); // Reload the page
}

function displayCart(cartData) {
    // Handle HTML Rendering
    //console.log("cart loaded...", cartData);
    var totalPrice = 0;
    var $cartList = $("#cartList");
    $cartList.empty();
    for (var i = 0; i < cartData.length; i++) {
        var $itemRow = $("<div>").attr("class", "row");
        $itemRow.append(
            $("<div>").attr("class", "col-xs-2")
                .append($("<img>").attr("class", "img-responsive").attr("style", "width: 100px; height: 200px;").attr("src", cartData[i].imgSrc))
        ).append(
            $("<div>").attr("class", "col-xs-4")
                .append($("<h4>").attr("class", "product-name").html("<strong>" + cartData[i].title + "</strong>"))
                .append($("<h4>").attr("class", "product-name").html("<small>" + cartData[i].description + "</small>"))
            ).append(
            $("<div>").attr("class", "col-xs-6")
                .append(
                $("<div>").attr("class", "col-xs-6 text-right")
                    .append($("<h6>").html("<strong>$" + cartData[i].price + "</strong>")
                        .append($("<span>").attr("class", "text-muted").html("<strong>x</string>")))
                ).append(
                $("<div>").attr("class", "col-xs-4")
                    //.append($("<input>").attr("type", "text").attr("class", "form-control input-sm").attr("value", "1"))
                    .append(
                        $("<input>").attr("id", "spinner"+cartData[i].pid)
                    )
                ).append(
                $("<div>").attr("class", "col-xs-2")
                    .append($("<button>").attr("type", "button").attr("class", "btn btn-link btn-xs").html(
                        $("<span>").attr("class", "glyphicon glyphicon-trash")
                    ).click({"product": cartData[i] }, removeFromCartClick))
                )
            );
        $cartList.append($itemRow);

        // Setup spinner for managing the quantity of our cart items
        $("#spinner"+cartData[i].pid).spinner({ min: 0 }).spinner("value", cartData[i].qty).on("spinstop", null, {"product": cartData[i], "cartData": cartData}, function(e, ui){
            //console.log("changed:", $(this).spinner("value"));
            e.data.product.qty = $(this).spinner("value");

            $("#cartTotal").html("Total <strong>$" + getCartTotal(e.data.cartData) + "</strong>");

            modifyCartProduct(e.data.product);
        });

        totalPrice += (cartData[i].price * cartData[i].qty);
    }

    $("#cartTotal").html("Total <strong>$" + getCartTotal(cartData) + "</strong>");
}

function getCartTotal(cartData){
    var total = 0;
    cartData.forEach( (item) => {
        total += item.price * item.qty;
    });
    return total;
}
