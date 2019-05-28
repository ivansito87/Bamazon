
// Get the DOM ready ============================================================>>>>>>>>
$(() => {
    loadProducts();
});


// Function to render all the products in from the database==============================
var loadProducts = () => {
    $.get("/products", (products) => {
        $.each(products, (indexOfArr, eachObject) => {

            $("#products").append(`<tr id="itemrow">
                            <td class="itemId">${eachObject.id}</td>
                            <td class="productName">${eachObject.product_name}</td>
                            <td>${eachObject.department_name}</td>
                            <td>$ ${eachObject.price}</td>
                            <td><select class="form-control" id="exampleFormControlSelect1">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            </select></td>
                            <td><button type="button" class="btn btn-outline-warning addToCart" data-item="${eachObject.id}"><i class="fas fa-cart-plus"></i></button></td>
                            </tr>`);
        });
    });
};

// Global Varables ==================================================>>>>>>>>>>>>>>>>>>>>>>>
var subtotal = 0;
var total = 0;
var tax = 0;
var arrObjects = [];

//function to add to shopping cart from table
$(document).on("click", ".addToCart", function () {
    
    var itemId = $(this).data().item;
    var quantity = $(this).closest("#itemrow").find("select#exampleFormControlSelect1 option:selected").val();
    console.log(quantity)

    $.get("/api/products/" + itemId, function (data, status) {
        if (data.stock_quantity < 0) {
            $("#cardBody").html(`<h4>Sold out!</h4>
            <h4>The item you are trying to buy is unavailable. Don't worry, we are getting more soon!</h4>`);
        } else {
            data.stock_quantity -= quantity;
            arrObjects.push(data)
            subtotal += data.price * quantity;
            tax += (data.price * .06) * quantity;
            total = tax + subtotal;
            $("#startAdding").remove();
            $("#emptyCar").remove();
            $("#addItems").append(`<tr><td class="qty">${quantity}</td><td>${data.product_name}</td><td class="tprice">$ ${data.price}</td></tr>`);
            $("#cardBody").html(`<h5 class="card-title text-right text-light">Subtotal&emsp;&emsp;<i class="fas fa-dollar-sign"></i> ${parseFloat(subtotal).toFixed(2)}</h5>
                <h5 class="card-title text-right text-light">Tax&emsp;&emsp;<i class="fas fa-dollar-sign"></i> ${parseFloat(tax).toFixed(2)}</h5>
                <hr />
                <h4 class="card-title text-right text-light">Total&emsp;&emsp;<i class="fas fa-dollar-sign"></i> ${parseFloat(total).toFixed(2)}</h4>
                <a class="btn btn-outline-warning btn-block text-white" id="submitOrder">Submit Order</a>`);
        }
    });
});

// =============== Function to Update database after submit order

$(document).on("click", "#submitOrder", () => { 
    console.log(arrObjects)
    $("#newDateName").text(`Your total is:  $${parseFloat(subtotal).toFixed(2)}`);
    $("#newDatePicture").attr("src", "https://images.unsplash.com/photo-1517076731070-13c65bcb2e86?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2467&q=80");
    $("#exampleModalLong").modal("toggle");
    $("#cardBody").html(`<h1>Thank you for shopping with us today</h1>`);
    $("#addItems").html(`<h1>We appreciate your business</h1>`);
    loadProducts();
        $.ajax({
            method: "POST",
            url: "/api/products/",
            contentType: "application/json",
            data: JSON.stringify(arrObjects)
        }).then(function () {
            window.location.href = "/products";
            });
});



