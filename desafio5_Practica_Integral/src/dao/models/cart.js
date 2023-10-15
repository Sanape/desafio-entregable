//imports
import mongoose from "mongoose";

//schema
const cartSchema = new mongoose.Schema(
  {
    products: {
      type: [{ productId: String, quantity: Number }],
      require: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const cart = new mongoose.model("carts", cartSchema);

export default cart;
