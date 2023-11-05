//import { productManager } from '../dao/FileSystem/productManager.js';
import productManager from '../dao/db/productManager.js';
import cartManager from '../dao/db/CartManager.js';

async function getProducts(req, res, next) {
  try {
    const { query, limit, page, sort } = req.query;

    const products = await productManager.getProducts(query, limit, page, sort);

    products.status = products.payload.length > 0 ? 'success' : 'error';

    delete products.totalDocs;
    delete products.limit;
    delete products.pagingCounter;

    products.prevLink = products.hasPrevPage
      ? `http://localhost:8080/api/products?page=${products.prevPage}`
      : null;
    products.nextLink = products.hasNextPage
      ? `http://localhost:8080/api/products?page=${products.nextPage}`
      : null;

    res.status(200).json({ result: products });
  } catch (error) {
    next(error);
  }
}

async function getProductById(req, res, next) {
  try {
    const { pid } = req.params;

    const { value: product, msg, result } = await productManager.getById(pid);

    if (product) {
      res.status(200).json({ product: product, message: msg });
    } else {
      res.status(400).json({ product: 'Not found', message: msg });
    }
  } catch (error) {
    next(error);
  }
}

async function addProduct(req, res, next) {
  try {
    let newProduct = { ...req.body, thumbnails: [] };

    if (req.files) {
      req.files.forEach((file, index) => {
        newProduct.thumbnails.push({ idPhoto: index, url: file.path });
      });
    }

    const result = await productManager.create(newProduct);

    res.status(201).json({ message: result });
  } catch (error) {
    next(error);
  }
}

async function updateProductById(req, res, next) {
  try {
    const { pid } = req.params;

    let newProductInfo = { ...req.body, thumbnails: [] };

    if (req.files) {
      newProductInfo.thumbnails = req.files.map((file) => file.path);
    }

    const result = await productManager.updateById(pid, newProductInfo);

    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
}

async function deleteProductById(req, res, next) {
  try {
    const { pid } = req.params;

    const result = await productManager.deleteById(pid);
    await cartManager.deleteProductFromCarts(pid);

    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
}

async function addImagesToProductById(req, res, next) {
  try {
    if (req.files) {
      const { pid } = req.params;

      req.files.forEach(async (file) => {
        await productManager.addImageToProductById(pid, file.path);
      });

      res.status(201).json({ message: 'Images added' });
    } else {
      throw new Error('At least one image must be uploaded');
    }
  } catch (error) {
    next(error);
  }
}

async function deleteImageFromProductById(req, res, next) {
  try {
    const { pid, imageId } = req.params;

    const result = await productManager.deleteImageOfProductById(pid, imageId);

    res.status(201).json({ message: result });
  } catch (error) {
    next(error);
  }
}

export {
  addProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  addImagesToProductById,
  deleteImageFromProductById,
};
