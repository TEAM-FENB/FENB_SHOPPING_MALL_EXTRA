const router = require('express').Router();

const { getProductsByQuery, getPageProducts } = require('../controllers/products');

router.get('/', async (req, res) => {
  const { search, category } = req.query;

  const queriedProducts = await getProductsByQuery(search, category);
  res.send(queriedProducts);
});

router.get('/pages/:page', (req, res) => {
  const page = +req.params.page;
  const pageSize = +req.query.pageSize;
  const pageProducts = getPageProducts(page, pageSize);

  res.send(pageProducts);
});

module.exports = router;
