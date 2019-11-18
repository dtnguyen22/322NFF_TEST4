
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const generalRoutes = require("./routes/general");
const productRoutes = require("./routes/product");

const server = express();


server.use(express.static("public"));

server.use(bodyParser.urlencoded({extended:false}));



server.engine("handlebars", exphbs());
server.set("view engine", "handlebars");

//mapping routes
server.use("/", generalRoutes);
server.use("/product", productRoutes);


const HTTP_PORT = process.env.PORT || 8080;
server.listen(HTTP_PORT, ()=>{
    console.log("server is running");
});
