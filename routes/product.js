const express = require('express');

const router = express.Router();


router.get("/", (req,res)=>{
    res.render("product/list");
});

router.get("/list", (req,res)=>{
    res.render("product/list");
});

router.get("/add", (req,res)=>{
    res.render("product/add");
});

router.get("/edit", (req,res)=>{
    res.render("product/edit");
});


module.exports = router;