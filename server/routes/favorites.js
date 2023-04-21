const jwt = require('jsonwebtoken');
const router = require('express').Router();

const { toggleProductFavorite, findProduct } = require('../controllers/products');
const { addFavoriteProduct, removeFavoriteProduct, hasFavorite, getMyFavorites } = require('../controllers/favorites');

router.get('/', (req, res) => {
  const { email } = jwt.decode(req.cookies.accessToken);

  res.send(getMyFavorites(email).products);
});

router.post('/', (req, res) => {
  const { email } = jwt.decode(req.cookies.accessToken);
  const id = +req.body.id;

  const isFavorite = hasFavorite({ email, id });

  if (isFavorite) removeFavoriteProduct({ email, id });
  else {
    const product = findProduct(id);
    addFavoriteProduct({ product, email });
  }
  toggleProductFavorite(id, isFavorite);
});

module.exports = router;
