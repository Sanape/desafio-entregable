//imports
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

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
      required:true
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

productSchema.plugin(mongoosePaginate);

const product = new mongoose.model("products", productSchema);

export default product;
