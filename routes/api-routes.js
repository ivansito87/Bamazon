// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

    // GET route for getting all of the Products
    app.get("/products", function (req, res) {
        db.Product.findAll({})
            .then((dbPost) => {
                res.json(dbPost);
            });
    });


    // PUT route for updating Products
    app.post("/api/products/", function (req, res) {
        console.log(req.body);
        var arrOfObjects = req.body;
        arrOfObjects.forEach(function (element) {
            db.Product.update(
                {
                    stock_quantity: element.stock_quantity
                }, {
                    where: {
                        id: element.id
                    }
                })
        });
    });

    //   Get route for returning Products of a specific category
    app.get("/api/products/:id", function (req, res) {

        db.Product.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (singleProduct) {
            res.json(singleProduct);
        });
    });
};
