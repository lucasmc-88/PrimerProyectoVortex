
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const categoriesRoutes = require('./routes/categories-routes');
const productsRoutes = require('./routes/products-routes')
//const orderRoutes = require('./routes/orders-routes');


const app = express();

app.use(bodyParser.json());




app.use('/api/categories', categoriesRoutes);
app.use('/api/products', productsRoutes);
//app.use('/api/orders', orderRoutes);

mongoose
    .connect(
        `mongodb+srv://crudVortex:akademyVortex@cluster0.v4ofevg.mongodb.net/e-commerce`
    )
    .then(() => {
        app.listen(5000);
    })
    .catch((err) => {
        console.log('probando conexion');
    });
