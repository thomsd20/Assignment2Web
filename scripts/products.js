// Loads products from express API

var productsList = {};

$(document).ready(function() {
    loadProducts();
});

function loadProducts(){
    $.ajax({
        url: "/productData",
        dataType: "json",
        success: displayProducts
    });
}

function displayProducts(data){
    //var data = JSON.parse(json);

    var $productsDiv = $('#productsDiv');
    for(var i = 0; i < data.length; i++){
        var $link = $("<a href='#'>");
        var $div = $("<div>", {"class": "product"});
        $("<img>").attr("src", data[i].imgSrc).attr("title", data[i].title).appendTo($div);
        var $display = $("<div>", {"class": "dealtext"});
        $("<h2>").text(data[i].price).appendTo($display);
        $("<h4>").text(data[i].title).appendTo($display);
        $div.append($display);
        $productsDiv.append($div);
    }
}

/*<a href="#">
        <div class="product">
          <img src="images/oyster bay wine.jpg" title="Image from https://www.queenstownnz.co.nz/explore/listing/luma-southern-light-project">
          <div class="dealtext">
            <h2>$10.99</h2>
            <h4>Oyster Bay Wine</h4>

          </div>
        </div>
      </a>*/

/*
[
    {
        "title": "Wine 1",
        "description": "This is a nice wine!",
        "imgSrc": "images/wine1.jpg",
        "type": "red",
        "price": 5.0
    },
    {
        "title": "Wine 2",
        "description": "This is also a nice wine!",
        "imgSrc": "images/wine2.jpg",
        "type": "white",
        "price": 5.0
    }
]*/