// export default class Product {
//   constructor(
//     title,
//     description,
//     price,
//     thumbnails = [],
//     code,
//     status = true,
//     stock,
//     id
//   ) {
//     this.title = title;
//     this.description = description;
//     this.price = price;
//     this.thumbnails = thumbnails;
//     this.code = code;
//     this.stock = stock;
//     this.status = status;
//     this.id = id;
//   }

///No sirve ya que solo funciona cuando los productos se envian een la misma peticion. No tiene persistencia en el tiempo.
// static #getNextId() {
//   if (!Product.nextId) {
//     Product.nextId = 1;
//   }
//   return Product.nextId++;
// }
//}
import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    default: 10,
  },
  description: {
    type: String,
  },
});

productSchema.plugin(mongoosePaginate);

const productsModel = model('Products', productSchema);

export default productsModel;
