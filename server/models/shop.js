const mongoose = require('mongoose');
const { ProductSchema, UserSchema, CouponSchema } = require('../schema/shop');

const Product = mongoose.model('Product', ProductSchema);
const User = mongoose.model('User', UserSchema);
const Coupon = mongoose.model('Coupon', CouponSchema);

module.exports = { Product, User, Coupon };
