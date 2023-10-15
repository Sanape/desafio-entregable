//imports
import mongoose from "mongoose";

//schema
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String
    },
    code: {
      type: String,
      required: true,
      unique:true
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    stock: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      require:true
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const product = new mongoose.model("products", productSchema);

export default product;
