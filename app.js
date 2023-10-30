
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//const categoryRoutes = require('./routes/categories-routes');



const app = express();

app.use(bodyParser.json());


const categoriesRoutes = require('./routes/categories-routes');
const productRoutes = require('./routes/products-routes');
const orderRoutes = require('./routes/orders-routes');

app.use('/categories', categoriesRoutes);
//app.use('/products', productRoutes);
//app.use('/orders', orderRoutes);

mongoose
    .connect(
        `mongodb+srv://crudVortex:akademyVortex@cluster0.v4ofevg.mongodb.net/e-commerce`
    )
    .then(() => {
        app.listen(5005);
    })
    .catch((err) => {
        console.log('probando conexion');
    });
