const express = require('express');
const router = express.Router();
const Product = require("../models/Product");

router.get("/", (req, res) => {
    res.redirect("/product/list");
});

router.get("/list", (req, res) => {
    Product.find().then((products) => {
        res.render("product/list", {
            product_list: products
        });
    }).catch(err => {
        console.log(`Error: ${err}`);
    })
});

router.get("/add", (req, res) => {
    res.render("product/add");
});

router.post("/add", (req, res) => {
    Product.findOne({ title: req.body.txtTitle }).then((prod) => {
        if (prod == null) {
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
            }).catch(err => {
                console.log(err);
            })
        } else {
            error = "*** Error: Product title is duplicated ***";
            res.render("product/add", {
                error: error
            })
        }
    }).catch(err => {
        console.log(`Add error: ${err}`);
    })

});

router.get("/edit", (req, res) => {
    res.redirect("/product/list");
});

router.get("/edit/:id/:err", (req, res) => {
    Product.findById(req.params.id).then((product) => {
        res.render("product/edit", {
            product: product,
            error:req.params.err
        })
    }).catch(err => {
        console.log(`edit error ${err}`);
        res.redirect("/product/list");
    })
});

router.put("/edit/:id", (req, res) => {
    Product.findById(req.params.id).then((product) => {
        if (product == null) {
            res.redirect("/product/list");
        } else if (product.title == req.body.txtTitle.trim()) {
            error = "*** Error: Product title is duplicated ***";
            res.render("/edit/" + product.id + "/Product title is duplicated", {
                error: error
            });
        } else {
            product.title = req.body.txtTitle;
            product.desc = req.body.txtDesc;
            product.price = req.body.txtPrice;
            product.quantity = req.body.txtQuantity;
            product.taxable = req.body.radioTax;
            product.save().then(() => {
                res.redirect("/product/list");
            }).catch(err => {
                console.log(`edit error ${err}`);
            })
        }
    }).catch(err => {
        console.log(`find id error ${err}`);
    })
});





module.exports = router;