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

const FavoritesSchema = ProductSchema.omit(['stocks']).add({ productId: mongoose.Types.ObjectId });
const CartsSchema = ProductSchema.omit(['stocks']).add({
  productId: mongoose.Types.ObjectId,
  stocks: [{ size: Number, select: Number }],
});
const HistoriesSchema = new mongoose.Schema(
  {
    purchased: [CartsSchema],
  },
  { timestamps: true }
);

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
    favorites: [FavoritesSchema],
    carts: [CartsSchema],
    histories: [HistoriesSchema],
    coupons: [],
  },
  { timestamps: true }
);

const CouponSchema = new mongoose.Schema({
  discountRate: Number,
  discountPrice: Number,
  minimumPrice: Number,
  endTime: String,
  limit: Number,
  couponId: mongoose.Types.ObjectId,
});

module.exports = { ProductSchema, UserSchema, CouponSchema };
