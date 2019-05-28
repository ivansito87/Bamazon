// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
// We create our server in this file and make it listen on X port
// ******************************************************************************

// ======== *** Dependencies ==================================
// Require express from the node_modules
var express = require("express");
var path = require("path");
var favicon = require('serve-favicon');  // Favicon to track my Icon


// Express app
// ====== Create our Express server and store it in app ============= 
var app = express();

// **** We select the port we want out server to listen
var PORT = process.env.PORT || 8080;

// Models
// ================== Require our models =================================
// require all our models to be able to sync them later
var db = require("./models");

// Middleware
// ================== Sets Up the Express app middleware =================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Static directory to be able to access css and other files images,CSS,JavaScript
app.use(express.static("./public"));
app.use(favicon(path.join(__dirname, "/public/images/my_ir_favicon.png")));



// Routes
// ================== Handle Routes =================================
require("./routes/api-routes.js")(app);
require("./routes/html-routes")(app);

// Syncing 
// ===== sequelize models and then starting our Express app ====
db.sequelize.sync({ force: false }).then(function () {
    app.listen(PORT, () => {
        console.log("App Listening on http://localhost:" + PORT);
    });
});

