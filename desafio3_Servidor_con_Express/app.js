import express from 'express';
import { productManager } from './productManager.js';

const app = express();

app.listen(8080, () => {
  console.log('escuchando 8080');
});

// get de los productos
app.get('/api/products', async (req, res) => {
  try {
    const products = await productManager.getProducts(req.query);
    if (!products.length) {
      return res.status(200).json({ message: 'No products found' });
    }
    res.status(200).json({ message: 'Products found', products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/products/:idProduct', async (req, res) => {
  const { idProduct } = req.params;
  try {
    const { value, result, msg } = await productManager.getProductById(
      idProduct
    );
    if (!value) {
      return res.status(400).json({ message: ` ${msg}` });
    }
    res.status(200).json({ message: ` ${msg}`, value });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
