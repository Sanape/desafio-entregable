import Manager from './manager.js';
import productsModel from '../models/product.model.js';

class ProductManager extends Manager {
  constructor() {
    super(productsModel);
  }

  async getProducts(query, limit = 10, page = 1, sort = 0) {
    const options = {
      page: page,
      limit: limit,
      customLabels: {
        docs: 'payload',
      },
    };

    if (+sort) {
      options.sort = { price: +sort };
    }

    if (query) {
      const foundObjects = await this.model.paginate(
        JSON.parse(query),
        options
      );
      return foundObjects;
    }
    const foundObjects = await this.model.paginate(query, options);
    return foundObjects;
  }
}

export default new ProductManager();

//TODO: agregar metodos para operar imagenes utilizando metodos propios de MongoDB y usando getIndex de Manager
// async addImageToProductById(id, imagePath) {
//   try {
//     let {
//       value: product,
//       msg: msg1,
//       result: resultProduct,
//     } = await this.getById(id);
//     if (!resultProduct) {
//       throw new Error(msg1);
//     }

//     let {
//       value: index,
//       msg: msg2,
//       result: resultIndex,
//     } = this.getIndex(id);
//     if (!resultIndex) {
//       throw new Error(msg2);
//     }
//     product.thumbnails.push({
//       id: product.thumbnails.length ? product.thumbnails.length : 1,
//       url: imagePath,
//     });

//     this.products[resultIndex] = {
//       ...product,
//     };

//     return `Imagen actualizada correctamente`;
//   } catch (error) {
//     throw error;
//   }
// }

// async deleteImageOfProductById(idProduct, idImage) {
//   try {
//     let {
//       value: product,
//       msg: msg1,
//       result: resultProduct,
//     } = await this.getProductById(id);
//     if (!resultProduct) {
//       throw new Error(msg1);
//     }
//     await this.#loadProductsFromFile();

//     let {
//       value: index,
//       msg: msg2,
//       result: resultIndex,
//     } = this.getProductsIndex(id);
//     if (!resultIndex) {
//       throw new Error(msg2);
//     }

//     const imageIndex = product.thumbnails.findIndex(
//       (image) => image.idPhoto === +idImage
//     );

//     product.thumbnails.splice(imageIndex, 1);

//     this.products[index] = {
//       ...product,
//     };

//     return `Imagen borrada correctamente`;
//   } catch (error) {
//     throw error;
//   }
// }
