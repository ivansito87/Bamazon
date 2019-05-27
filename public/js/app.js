
// Get the DOM ready ============================================================>>>>>>>>
$(() => {
    loadProducts();
});
// ===========================================================================>>>>>>>>


// Global Varables ==================================================>>>>>>>>>>>>>>>>>>>>>>>
var subtotal = 0;
var total = 0;
var tax = 0;
//===========================================================================


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
                            <td><button type="button" class="btn btn-outline-warning" data-item="${eachObject.id}"><i class="fas fa-cart-plus"></i></button></td>
                            </tr>`);
        });
    });
};



//function to add to shopping cart from table
$(document).on("click", ".btn-outline-warning", function () {
    
    var itemId = $(this).data().item;
    var quantity = $(this).closest("#itemrow").find("select#exampleFormControlSelect1 option:selected").val();
    console.log(quantity)

    $.get("/api/products/" + itemId, function (data, status) {
        if (data.stock_quantity < 0) {
            $("#cardBody").html(`<h4>Sold out!</h4>
            <h4>The item you are trying to buy is unavailable. Don't worry, we are getting more soon!</h4>`);
        } else {
            subtotal += data.price * quantity;
            tax += (data.price * .06) * quantity;
            total = (tax + subtotal) * quantity;
            $("#addItems").append(`<tr><td class="qty">${quantity}</td><td>${data.product_name}</td><td class="tprice">$ ${data.price}</td></tr>`);
            $("#cardBody").html(`<h5 class="card-title text-right">Subtotal&emsp;&emsp;$ ${parseFloat(subtotal).toFixed(2)}</h5>
                <h5 class="card-title text-right">Tax&emsp;&emsp;$ ${parseFloat(tax).toFixed(2)}</h5>
                <hr />
                <h4 class="card-title text-right">Total&emsp;&emsp;$ ${parseFloat(total).toFixed(2)}</h4>
                <a class="btn btn-outline-warning btn-block" id="submitOrder">Submit Order</a>`);
        }
    });
});

// =============== Function to Update database after submit order
var submitOrder = () => {
    $(document).on("click", "#submitOrder", () => {

        var jqxhr = $.post("/order?" + $.param(order), function () {
        })
            .done(function () {
                $("#cart").empty();
                $("#cart-status").html("<h2>Order complete. Thank you!");
            })
            .fail(function () {
                console.log("womp womp.");
            });
    });
}; 
