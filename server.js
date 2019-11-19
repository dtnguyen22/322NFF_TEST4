
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

//config 
require("dotenv").config({path:'./config/key.env'});

//routes
const generalRoutes = require("./routes/general");
const productRoutes = require("./routes/product");

const server = express();


server.use(express.static("public"));
server.use(bodyParser.urlencoded({extended:false}));
server.use(methodOverride('_method'));

//view engine
server.engine("handlebars", exphbs());
server.set("view engine", "handlebars");

//mapping routes
server.use("/", generalRoutes);
server.use("/product", productRoutes);

//connect to db
const DB_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0-qpz9x.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(process.env.DB_NAME);
mongoose.connect(DB_URL, {useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>{
    console.log(`Connect to mongo db successfully`);
})
.catch(err =>{
    console.log(err);
})
const HTTP_PORT = process.env.PORT || 8080;
server.listen(HTTP_PORT, ()=>{
    console.log("server is running");
});
