
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const app = express();


mongoose
    .connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.v4ofevg.mongodb.net/${process.env.DB_NAME}`
    )
    .then(() => {
        app.listen(5000);
    })
    .catch((err) => {
        console.log(err);
    });
