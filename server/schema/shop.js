const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  price: String,
  imgURL: String,
  description: String,
  feature: String,
  brand: { en: String, kr: String },
  category: { en: String, kr: String },
  color: { color: String, en: String, kr: String },
  gender: { en: String, kr: String },
  favorites: Number,
  dateOfManufacture: String,
});

module.exports = { ProductSchema };
