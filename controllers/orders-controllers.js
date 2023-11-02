const Order = require('../models/order')
const Product = require('../models/product')

const createOrder = async (req, res, next) => {
  const { products } = req.body;
  let result;
  let newOrder = new Order({
    products,

  });

  try {
    await newOrder.save();

  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Error al crear la orden' })
  }
  return res.status(201).json({ newOrder });
}

// Agregar producto al carrito
/*const addProduct = async (req, res, next) => {
  const { products } = req.body;
  const productId = products[0].product;
  console.log(productId + 'quiero saber el id que tengo');

};*/

// Agregar producto al carrito
const addProduct = async (req, res, next) => {
  const { products } = req.body;
  let oldOrder;
  const orderId = req.params.oid;
  const productId = products[0].product
 try {
    let product;

    if (!product) {
      product = await Product.findById(productId);
    }

    oldOrder = await Order.findById(orderId);

    oldOrder.products.push({
      product,
    });


    await oldOrder.save();

    res.status(201).json({ oldOrder });
  } catch (error) {
    console.log(error + 'error al agregar');
    res.status(500).json({ error: 'Error al agregar producto al carrito' });
  }
};



exports.createOrder = createOrder;
exports.addProduct = addProduct;
