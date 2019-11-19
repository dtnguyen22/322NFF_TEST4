const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    taxable: {
        type: String,
        required: true
    }
})

const productModel = mongoose.model("products", productSchema);
module.exports = productModel;