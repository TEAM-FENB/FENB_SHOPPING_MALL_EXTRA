const Product = require('../models/product');
const { BRANDS, COLORS, GENDER, CATEGORIES } = require('../constants/products');

const createProduct = async productInfo => {
  try {
    const res = await Product.create({
      ...productInfo,
      brand: BRANDS[productInfo.brand],
      category: CATEGORIES[productInfo.category],
      color: COLORS[productInfo.color],
      gender: GENDER[productInfo.gender],
      favorites: productInfo.favorites || 0,
      dateOfManufacture: new Date(productInfo.dateOfManufacture),
    });
    return res;
  } catch (err) {
    console.error('상품 생성에 실패했습니다.', err);
  }
};

const getProducts = async () => {
  try {
    const products = await Product.find();
    return products;
  } catch (err) {
    console.error('모든 상품 목록을 가져오는데 실패했습니다.', err);
  }
};

const getPageProducts = async (page, pageSize) => {
  try {
    const products = await Product.find();

    return {
      currentPage: page,
      totalPages: Math.ceil(products.length / (pageSize ?? 5)),
      products: products.slice((page - 1) * pageSize, page * pageSize),
      totalProducts: products.length,
    };
  } catch (err) {
    console.error('페이지별 상품 목록들을 가져오는데 실패했습니다.', err);
  }
};

const getProductById = async _id => {
  try {
    const productById = await Product.findById(_id);
    return productById;
  } catch (err) {
    console.error('id로 상품 목록을 가져오는데 실패했습니다.', err);
  }
};

const getProductsByQuery = async (searchQuery, categoryQuery) => {
  const query = searchQuery
    ? {
        name: { $regex: searchQuery },
        'brand.kr': { $regex: searchQuery },
        'brand.en': { $regex: searchQuery },
        'category.en': { $regex: searchQuery },
        'category.kr': { $regex: searchQuery },
      }
    : categoryQuery
    ? { 'category.en': { $regex: categoryQuery } }
    : {};

  try {
    const queriedProducts = await Product.find(query);
    return queriedProducts;
  } catch (err) {
    console.error('query로 상품 목록을 가져오는데 실패했습니다.', err);
  }
};

const updateProductFavorite = async (_id, isFavorite) => {
  try {
    const updatedProduct = await Product.updateOne(
      { _id },
      { $inc: { favorites: isFavorite ? -1 : 1 } },
      { new: true }
    );
    return updatedProduct;
  } catch (err) {
    console.error('query로 상품 목록을 가져오는데 실패했습니다.', err);
  }
};

module.exports = {
  createProduct,
  getProducts,
  getPageProducts,
  getProductById,
  getProductsByQuery,
  updateProductFavorite,
};
