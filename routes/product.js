const express = require('express');
const router = express.Router();
const Product = require("../models/Product");

router.get("/", (req, res) => {
    res.redirect("/product/list");
});

router.get("/list", (req, res) => {
    Product.find().then((products)=>{
        res.render("product/list",{
            product_list:products
        });
    }).catch(err=>{
        console.log(`Error: ${err}`);
    })
});

router.get("/add", (req, res) => {
    res.render("product/add");
});

router.post("/add", (req, res) => {
    const newProduct = {
        title: req.body.txtTitle,
        price: req.body.txtPrice,
        quantity: req.body.txtQuantity,
        desc: req.body.txtDesc,
        taxable: req.body.radioTax
    }
    const product = new Product(newProduct);
    product.save().then(() => {
        console.log("added");
        res.redirect("/product/list");
    }).catch(err=>{
        console.log(err);
    })
});

router.get("/edit/:id", (req, res) => {
    if(req.params.id){
        Product.findById(req.params.id).then((product)=>{
            res.render("product/edit",{
                product:product
            })
        })
    }else{
        res.redirect("/product/list");
    }

});


module.exports = router;