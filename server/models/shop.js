const mongoose = require('mongoose');
const { ProductSchema, UserSchema } = require('../schema/shop');

const Product = mongoose.model('Product', ProductSchema);
const User = mongoose.model('User', UserSchema);

module.exports = { Product, User };
