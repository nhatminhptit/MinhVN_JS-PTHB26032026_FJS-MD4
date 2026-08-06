const Product = require("../models/Product");

const getProducts = (req, res) => {
  const data = Product.getAll();
  res.json({
    success: true,
    data: data,
  });
};

const createProduct = (req, res) => {
  const newProduct = Product.create(req.body);
  res.status(201).json({
    success: true,
    data: newProduct,
  });
};

module.exports = {
  getProducts,
  createProduct,
};
