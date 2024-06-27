const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const Category = require("./category"); // Impor model Category
const Supplier = require("./supplier");
const Product = sequelize.define(
  "Product",
  {
    productID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    supplierID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Supplier,
        key : "supplierID"
      }
    },
    categoryID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Category,
        key: "categoryID",
      },
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
// Definisikan relasi antara Product dan Category
Product.belongsTo(Category, { foreignKey: "categoryID" });
Category.hasMany(Product, { foreignKey: "categoryID" });

Product.belongsTo(Supplier, {foreignKey: "supplierID"});
Supplier.hasMany(Product, {foreignKey: "supplierID"});

module.exports = Product;
