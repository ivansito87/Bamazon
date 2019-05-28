// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the Products
  app.get("/products", function(req, res) {
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

    // db.Product.update(newData,
    //   {
    //     where: {
    //       id: req.body.id
    //     }
    //   })
    //   .then(function(dbPost) {
    //     res.json(dbPost);
    //   });
  });
    // app.get('/api/5', (req, res) => {
    //     let query;
    //     if (req.params.userId) {
    //         query = Blog.findAll({
    //             include: [
    //                 { model: User, where: { id: req.params.userId } },
    //                 { model: Tag }
    //             ]
    //         })
    //     } else {
    //         query = Blog.findAll({ include: [Tag, User] })
    //     }
    //     return query.then(blogs => res.json(blogs))
    // })
    
    
//   Get route for returning posts of a specific category
    app.get("/api/products/:id", function (req, res) {
        
      db.Product.findOne({
      where: {
        id: req.params.id
      }
      }).then(function (singleProduct) {
          res.json(singleProduct);
      });
  });

//   // Get route for retrieving a single post
//   app.get("/api/posts/:id", function(req, res) {
//     db.Post.findOne({
//       where: {
//         id: req.params.id
//       }
//     })
//       .then(function(dbPost) {
//         res.json(dbPost);
//       });
//   });

//   // POST route for saving a new post
//   app.post("/api/posts", function(req, res) {
//     console.log(req.body);
//     db.Post.create({
//       title: req.body.title,
//       body: req.body.body,
//       category: req.body.category
//     })
//       .then(function(dbPost) {
//         res.json(dbPost);
//       });
//   });

//   // DELETE route for deleting posts
//   app.delete("/api/posts/:id", function(req, res) {
//     db.Post.destroy({
//       where: {
//         id: req.params.id
//       }
//     })
//       .then(function(dbPost) {
//         res.json(dbPost);
//       });
//   });

//   // PUT route for updating posts
//   app.put("/api/posts", function(req, res) {
//     db.Post.update(req.body,
//       {
//         where: {
//           id: req.body.id
//         }
//       })
//       .then(function(dbPost) {
//         res.json(dbPost);
//       });
//   });
};
