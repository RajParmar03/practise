const mongoose = require("mongoose");
const express = require("express");
const connection =  require("./config/db");

const cors = require("cors");

const productsRouter = require("./routes/products.route");


const app = express();

app.use(cors());
app.use(express.json()); // applying the json middleware


app.get("/" , (req,res) => {
    res.status(200).send("you are on the raj parmar's practise backend...");
});

app.use("/products" , productsRouter);


app.listen(8080 , async () => {
    try{
        await connection;
        console.log("successfully connected DB...");
    }catch(err){
        console.log("failed to connect the DB...");
        console.log(err);
    }
    console.log("successfully started the server at 8080...");
});