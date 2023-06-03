const { getDB } = require('../apis/database');
const { v4: uuidv4 } = require('uuid');
const { BRANDS, COLORS, GENDER, CATEGORIES } = require('../constants/products');

class Product {
  constructor({
    name,
    price,
    imgURL,
    description,
    feature,
    brand,
    category,
    color,
    gender,
    favorites,
    dateOfManufacture,
  }) {
    this.id = uuidv4();
    this.name = name;
    this.price = price;
    this.imgURL = imgURL;
    this.description = description;
    this.feature = feature;
    this.brand = BRANDS[brand];
    this.category = CATEGORIES[category];
    this.color = COLORS[color];
    this.gender = GENDER[gender];
    this.favorites = favorites || 0;
    this.dateOfManufacture = new Date(dateOfManufacture);
  }

  save() {
    const db = getDB();

    try {
      db.collection('products').insertOne(this);
    } catch (err) {
      console.error(err);
    }
  }

  static async getProducts() {
    const db = getDB();

    try {
      const products = await db.collection('products').find().toArray();
      return products;
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = Product;
