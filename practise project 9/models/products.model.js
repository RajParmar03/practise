const mongoose = require("mongoose");


const productsSchema = mongoose.Schema({
    title : String,
    price : Number,
    image : String,
    stock : {
        type : Number,
        default : 5
    },
});

const ProductsModel = mongoose.model("product" , productsSchema);

module.exports = ProductsModel;