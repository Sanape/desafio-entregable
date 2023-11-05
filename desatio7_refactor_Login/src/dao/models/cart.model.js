// export default class Cart {
//   constructor(id, products = []) {
//     this.id = id;
//     this.products = products;
//   }
// }

//imports
import mongoose from 'mongoose';

//schema
const cartSchema = new mongoose.Schema(
  {
    products: {
      type: [
        {
          productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
          quantity: Number,
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const cartsModel = new mongoose.model('carts', cartSchema);

export default cartsModel;
