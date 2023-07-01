const { User } = require('../models/shop');

const createUserFavorite = async (email, product) => {
  // OK!
  try {
    const createdUserFavorite = await User.findOneAndUpdate(
      { email },
      { $push: { favorites: product } },
      { new: true }
    );

    return createdUserFavorite;
  } catch (err) {
    console.error('관심상품을 추가하는데 실패했습니다.', err);
  }
};

const getUserFavorites = async email => {
  // OK!
  try {
    const user = await User.findOne({ email });
    console.log(user.favorites);
    return user.favorites;
  } catch (err) {
    console.error('관심상품을 가져오는데 실패했습니다.', err);
  }
};

const deleteUserFavorite = async (email, _id) => {
  // OK!
  try {
    const user = await User.findOneAndUpdate({ email }, { $pull: { favorites: { _id } } });

    return user.favorites;
  } catch (err) {
    console.error('관심상품을 가져오는데 실패했습니다.', err);
  }
};

module.exports = {
  createUserFavorite,
  getUserFavorites,
  deleteUserFavorite,
};
