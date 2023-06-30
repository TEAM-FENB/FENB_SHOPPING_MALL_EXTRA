const mongoose = require('mongoose');
const { ProductSchema } = require('../schema/shop');

const Product = mongoose.model('Product', ProductSchema);

module.exports = { Product };
