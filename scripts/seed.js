const db = require("../models");
const products = require("./products.json");
// const posts = require("./posts.json");

db.sequelize.sync({ force: true }).then(function () {
    return db.Product.bulkCreate(products);
}).then(function () {
    db.sequelize.close();
});

// db.sequelize.sync({ force: true }).then(() => {
//     return db.Products.bulkCreate(products);
// }).then(() => { 
//     db.sequelize.close();
// });