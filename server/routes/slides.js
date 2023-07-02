const router = require('express').Router();

const { getSlides } = require('../controllers/slides');

router.get('/', (req, res) => {
  const slides = getSlides();

  res.send(slides);
});

module.exports = router;
