const Order = require('../models/order')

const createOrder = async (req, res, next) => {
  const { products} = req.body;
  let result;
  let newOrder = new Order({
      products,
  });

  try {
      result = await newOrder.save();
      console.log(result + 'primero');
  } catch (error) {
      res.status(400).json({ error: 'Error al crear la orden' })
  }
  console.log(result + ' segundo');
  result = await  result.populate('products')
  return res.status(201).json({result});
}

// Agregar producto al carrito
const addProduct = async (req, res, next) => {
  const { products, amount } = req.body;
  let newProduct;
  const orderId = req.params.oid;
  console.log(orderId);

  try {
    newProduct = await Order.findById(orderId);

    const product = await Product.findById(products);

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    newProduct.products.push({
      product,
      amount,
    });

    newProduct.calculateTotalPrice();

    await newProduct.save();
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar producto al carrito' });
  }

  return res.status(201).json({ order: newProduct });
};

exports.createOrder = createOrder;
exports.addProduct = addProduct;

/*const createOrder = async (req, res, next) => {
  const { products} = req.body;
  let result;
  const newOrder = new Order({
      products,
  });

  try {
      result = await newOrder.save();
  } catch (error) {
      res.status(400).json({ error: 'Error al crear la orden' })
  }
  result = await  result.populate('products')
  return res.status(201).json({result});
}*/

/*const Order = require('../models/order')

const createOrder = async (req, res, next) => {
    const { products} = req.body;

    const newOrder = new Order({
        products,
    });
    newOrder.calculateTotalPrice();
    try {
        await newOrder.save();
    } catch (error) {
        res.status(400).json({ error: 'Error al crear la orden' })
    }
    */