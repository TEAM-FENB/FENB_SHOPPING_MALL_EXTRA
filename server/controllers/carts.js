const { User } = require('../models/shop');

const createUserCart = async (email, product) => {
  // OK!
  try {
    const createdUserCart = await User.findOneAndUpdate(
      { email },
      { $push: { carts: { ...product, productId: product._id } } },
      { new: true }
    );

    return createdUserCart;
  } catch (err) {
    console.error('장바구니에 상품을 추가하는데 실패했습니다.', err);
  }
};

const getUserCarts = async email => {
  // OK!
  try {
    const user = await User.findOne({ email });

    return user.carts;
  } catch (err) {
    console.error('장바구니에 담긴 상품을 가져오는데 실패했습니다.', err);
  }
};

const updateUserCart = async (email, _id, size, quantity) => {
  // ❗ 0이 되거나 마이너스가 될때 처리가 필요하다.
  // OK!
  try {
    const user = await User.findOneAndUpdate(
      { email },
      {
        $inc: { 'carts.$[product1].stocks.$[stock1].select': quantity },
        // $pull: { 'carts.$[product2].stocks.$[stock2].select': { select: 0 } },
      },
      {
        new: true,
        arrayFilters: [
          { 'product1._id': _id },
          // { 'product2._id': _id },
          { 'stock1.size': size },
          // { 'stock2.size': size },
        ],
      }
    );

    return user.carts;
  } catch (err) {
    console.error('장바구니를 수정하는데 실패했습니다.', err);
  }
};

const deleteUserCart = async (email, _id) => {
  // OK!
  try {
    const user = await User.findOneAndUpdate({ email }, { $pull: { carts: { _id } } });

    return user.carts;
  } catch (err) {
    console.error('장바구니 상품을 삭제하는데 실패했습니다.', err);
  }
};

const removeUserCart = async email => {
  // OK!
  try {
    const user = await User.findOneAndUpdate({ email }, { $set: { carts: [] } });

    return user.carts;
  } catch (err) {
    console.error('장바구니를 비우는데 실패했습니다.', err);
  }
};

module.exports = { createUserCart, getUserCarts, updateUserCart, deleteUserCart, removeUserCart };
