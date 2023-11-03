const Order = require('../models/order');
const product = require('../models/product');
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
const addProduct = async (req, res, next) => {
  const orderId = req.params.oid;
  const productsToAdd = req.body.products;
  console.log(productsToAdd);
  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Carrito de compra no encontrado' });
    }

    //order.products = [...order.products, ...productsToAdd];
    order.products = order.products.concat(productsToAdd);

    //order.calculateTotalPrice();
    await order.save();


    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron agregar los productos al carrito' });
  }
};


const updateProductByOrder = async (req, res, next) => {
  const orderId = req.params.oid;
  const productId = req.params.pid
  const updatedProductDetails = req.body;

console.log(orderId + ' este es el id de la orden');
console.log(productId + ' este es el id del producto');
console.log(updatedProductDetails.products + ' este es lo que se modifica');

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Carrito de compra no encontrado' });
    }

    // Busca el producto y actualiza sus detalles
    const updatedProducts = order.products.map((product) => {
      if (product.productId == productId) {
        return { ...product, ...updatedProductDetails };
      }
      return product;
    });

    order.products = updatedProducts;

    // Actualiza el documento de la orden en la base de datos
    await order.save();

    res.json(order);

  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar el producto en el carrito' });
  }

}

const deleteProductByOrder = async (req, res, next) => {
  const orderId = req.params.oid;
  const productId = req.params.pid;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Carrito de compra no encontrado' });
    }
    const updatedProducts = order.products.filter((product) => product.productId != productId);
    order.products = updatedProducts;
    order.calculateTotalPrice();

    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo eliminar el producto del carrito' });
  }
}


const deleteOrder = async (req, res, next) => {
  const orderId = req.params.oid;
  console.log(orderId);

  const order = await Order.findOne({ _id: orderId });

  if (!order) {
    return res.status(404).json({ message: "Orden no encontrada" });
  }

  await order.deleteOne({ _id: orderId });

  res.status(200).json({ message: "Orden eliminada con éxito" });
}

exports.createOrder = createOrder;
exports.addProduct = addProduct;
exports.updateProductByOrder = updateProductByOrder;
exports.deleteProductByOrder = deleteProductByOrder
exports.deleteOrder = deleteOrder;


/*
  const { amount, totalprice } = req.body;

  try {
    const newOrder = await Order.findById(req.params.id);
    if (!newOrder) {
      return res.status(404).json({ error: 'Carrito de compra no encontrado' });
    }

    const productOrder = newOrder.products.productId(req.params.product);
    if (!productOrder) {
      return res.status(404).json({ error: 'Producto no encontrado en el carrito' });
    }

    productOrder.amount = amount;
    productOrder.totalprice = totalprice;

    newOrder.totalprice = newOrder.products.reduce((sum, product) => sum + product.totalprice, 0);

    await newOrder.save();
    res.json(newOrder);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar producto en el carrito' });
  }
  ;*/ 

