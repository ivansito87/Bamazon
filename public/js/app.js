// '.tbl-content' consumed little space for vertical scrollbar, scrollbar width depend on browser/os/platfrom. Here calculate the scollbar width .
$(() => {
    loadProducts();
});

// Function to render all the products in from the database
var loadProducts = () => {
    $.get("/products", (products) => {
        $.each(products, (indexOfArr, eachObject) => {
            // console.log(eachObject)
            $("#products").append(`<tr>
                            <td class="itemId">${eachObject.id}</td>
                            <td>${eachObject.product_name}</td>
                            <td>${eachObject.department_name}</td>
                            <td>$ ${eachObject.price}</td>
                            <td>${eachObject.stock_quantity} in Stock</td>
                            <td><button type="button" class="btn btn-outline-warning" data-item="${eachObject.id}">add</button></td>
                            <td><select class="form-control" id="exampleFormControlSelect1">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            </select></td></tr>`)
        });
    });
};

//function to add to shopping cart from table
$(document).on("click", ".btn-outline-warning", function () {
    var itemId = $(this).data().item;
    console.log(itemId)
    $.get("/api/products/" + itemId, function (data, status) {
        console.log(data);
        console.log(status);
        // $(".result").html(data);
        // alert("Load was performed.");
    });



});



/* <tr>
    <td>AAC</td>
    <td>AUSTRALIAN COMPANY </td>
    <td>$1.38</td>
    <td>+2.01</td>
    <td>-0.36%</td>
</tr> */
// $.get("/products", function (data) {
//     // var rowsToAdd = [];
//     // for (var i = 0; i < data.length; i++) {
//     //     rowsToAdd.push(data[i]);
//     // }
//     console.log(data);
//     // renderAuthorList(rowsToAdd);
//     // nameInput.val("");
// });


// +++++++++++++++++++++++++ From website ++++++++++++++++++++++
// var loadProducts = function () {
//     $.get("/products", function (products) {
//         $.each(products, function (i, v) {
//             var row = $("<tr class='itemRow'>");
//             $("<td class='itemid' data-itemid='" + v.ItemID + "'>").text(v.ItemID).appendTo(row);
//             $("<td>").text(v.ProductName).appendTo(row);
//             $("<td>").text(v.DepartmentName).appendTo(row);
//             $("<td class='cashmoney'>").text(v.Price).appendTo(row);
//             $(amazonQ + "<button type='button' class='btn btn-default btn-sm addItem'><span class='glyphicon glyphicon-shopping-cart'></span> Shopping Cart</button>").appendTo(row);
//             row.appendTo("#products");
//         });
//         $(".cashmoney").autoNumeric("init", {
//             aSep: ",",
//             aSign: "$"
//         });
//     });
// };