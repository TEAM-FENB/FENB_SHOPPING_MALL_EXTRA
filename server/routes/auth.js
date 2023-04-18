const jwt = require('jsonwebtoken');
const router = require('express').Router();

const users = require('../controllers/users');

router.post('/signin', (req, res) => {
  // 401 Unauthorized
  const { email, password } = req.body;
  if (!email || !password) return res.status(401).send({ error: '사용자 아이디 또는 패스워드가 전달되지 않았습니다.' });

  // 401 Unauthorized
  const user = users.findUser(email, password);
  if (!user) return res.status(401).send({ error: '등록되지 않은 사용자입니다.' });

  const accessToken = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
    expiresIn: '1d',
  });

  res.cookie('accessToken', accessToken, {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7d
    httpOnly: true,
  });

  // 로그인 성공
  res.send({ email, username: user.name });
});

module.exports = router;
