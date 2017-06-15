
$(document).ready(function () {
    loadDeals();
});

function loadDeals() { // Array of current type filters
    // If filter is all dont try and filter just display all products
    $.ajax({
        url: "/productdata?filters=deals",
        type: "POST",
        success: displayDeals
    });
    $.ajax({
        url: "/productdata?filters=features",
        type: "POST",
        success: displayFeatures
    });
}

function displayFeatures(data) {

    var $dealsDiv = $("#features");

    for (var i = 0; i < data.length; i++) {
        $("<a>").append(
            $("<div>").attr("class", "deal").append(
                $("<img>").attr("src", data[i].imgSrc)
            ).append(
                $("<div>").attr("class", "dealtext").append(
                    $("<h2>").text("$" + data[i].price)
                ).append(
                    $("<h4>").text(data[i].title)
                    )
                ).append(
                    $("<button>").attr("class", "add").text("+ Add to Cart").click((event) => {
                        toastr.success("Success", "Item has been added to cart!");
                    })
                )
        ).appendTo($dealsDiv)
    }
}

function displayDeals(data) {

    var $dealsDiv = $("#deals");

    for (var i = 0; i < data.length; i++) {
        $("<a>").append(
            $("<div>").attr("class", "deal").append(
                $("<img>").attr("src", data[i].imgSrc)
            ).append(
                $("<div>").attr("class", "dealtext").append(
                    $("<h2>").text("$" + data[i].price)
                ).append(
                    $("<h4>").text(data[i].title)
                    )
                ).append(
                $("<button>").attr("class", "add").text("+ Add to Cart").click((event) => {
                    console.log("Adding to cart");
                })
                )
        ).appendTo($dealsDiv)
    }
}

/*
<a href="#">
      <div class= "deal">
        <img src="images/oyster bay wine.jpg" title="Image from https://www.queenstownnz.co.nz/explore/listing/luma-southern-light-project">
        <div class="dealtext">
          <h2>$10.99</h2>
        <h4>Oyster Bay Wine</h4>
      </div>
      <button class="add">+ Add to cart</button>
      </div>
    </a>
*/