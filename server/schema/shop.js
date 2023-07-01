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
  stocks: [{ size: Number, stock: Number }],
});

const favoriteSchema = ProductSchema.omit(['stocks']);

const UserSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    name: String,
    phone: String,
    address: [
      {
        recipient: String,
        recipientPhone: String,
        mainAddress: String,
        detailAddress: String,
        postcode: String,
        isDefault: Boolean,
      },
    ],
    favorites: [favoriteSchema],
  },
  { timestamps: true }
);

module.exports = { ProductSchema, UserSchema };
