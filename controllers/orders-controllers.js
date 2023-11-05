const Order = require('../models/order');

//const Product = require('../models/product')

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
/*
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
}*/

const addProduct = async (req, res, next) => {
  const orderId = req.params.oid;
  const productsToAdd = req.body.products;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Carrito de compra no encontrado' });
    }

    // Crear un mapa para realizar un seguimiento de la cantidad de cada producto
    const productCountMap = new Map();

    // Recorrer los productos a agregar
    for (const productToAdd of productsToAdd) {
      const productId = productToAdd.productId;

      // Verificar si el producto ya existe en la orden
      const existingProduct = order.products.find(product => product.productId.equals(productId));

      if (existingProduct) {
        // Si el producto ya existe, aumenta la cantidad
        existingProduct.quantity++;
      } else {
        // Si el producto no existe, agrégalo a la orden
        order.products.push({ productId, quantity: 1 });
      }

      // Actualiza el mapa de conteo
      if (productCountMap.has(productId)) {
        productCountMap.set(productId, productCountMap.get(productId) + 1);
      } else {
        productCountMap.set(productId, 1);
      }
    }

    // Guarda los cambios en la orden
    await order.save();

    res.json({ order, productCountMap });
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

    // Busca el producto y actualiza sus detalles

    const updatedOrder = await Order.findOneAndUpdate({ _id: orderId }, {
      products: {
        $set: {
          [productId]: updatedProductDetails,
        },
      },
    });

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Carrito de compra no encontrado' });
    }

    res.json(updatedOrder);

    /*  const order = await Order.findById(orderId);
 
     if (!order) {
       return res.status(404).json({ error: 'Carrito de compra no encontrado1' });
     }
    const updatedProducts = order.products.map((product) => {
       if (product.productId == productId) {
         return { ...product, ...updatedProductDetails };
       }
       return product;
     });
 
     order.products = updatedProducts;
 
     // Actualiza el documento de la orden en la base de datos
     await order.save();
 
     res.json(order);*/

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

const getOrderById = async (req, res, next) => {
  const orderId = req.params.oid;

  let order

  try {

    order = await Order.findById(orderId).populate({ path: 'products.productId', select: 'price' });
    const product = order.products[0].productId
    console.log(order + 'probando**********');
    console.log(product + 'probando el id');

    if (!order) {
      return res.status(404).json({ error: 'Orden de compra no encontrada' });
    }
    order.calculateTotalPrice(order);
  } catch (error) {
    console.log(error + 'este es el error');
    res.status(500).json({ error: 'No se pudo obtener la orden de compra' });
  }
  res.json({ order });
}

const getOrder = async (req, res, next) => {

  const orders = await Order.find();

  res.json(orders);
};


exports.createOrder = createOrder;
exports.addProduct = addProduct;
exports.updateProductByOrder = updateProductByOrder;
exports.deleteProductByOrder = deleteProductByOrder
exports.deleteOrder = deleteOrder;
exports.getOrderById = getOrderById;
exports.getOrder = getOrder;


