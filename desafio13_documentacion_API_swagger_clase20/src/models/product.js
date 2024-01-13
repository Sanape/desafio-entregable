import { DataTypes } from "sequelize";
import { Database } from "../config/database.connection.js";
import { Developer } from "./developer.js";
import { Category } from "./category.js";
import { Cart } from "./cart.js";
import { deleteImageInCloud } from "../middlewares/uploadImages.middleware.js";

const instanceDatabase = Database.getInstanceDatabase();

export const Product = await instanceDatabase.define("product", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  discount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      max: 100,
      min: 0,
    },
  },
  trailer_video: {
    type: DataTypes.STRING,
  },
  release_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  url_front_page: {
    type: DataTypes.STRING,
    defaultValue:
      "https://res.cloudinary.com/dixntuyk8/image/upload/v1701903327/image_not_found.webp",
  },
  front_page_public_id: {
    type: DataTypes.STRING,
    defaultValue: "image_not_found",
  },
  popularity: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  CPU: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  RAM: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  memory: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  GPU: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Product.beforeBulkDestroy(async (product, options) => {
  const foundProduct = await Product.findByPk(+product.where.id);

  if (foundProduct.front_page_public_id != "image_not_found") {
    await deleteImageInCloud(foundProduct.front_page_public_id);
  }
});

Product.belongsTo(Developer);

Developer.hasMany(Product);

Product.belongsToMany(Category, {
  through: "belong",
});

Category.belongsToMany(Product, {
  through: "belong",
});

Product.belongsToMany(Cart, {
  through: "added",
});

Cart.belongsToMany(Product, {
  through: "added",
});
