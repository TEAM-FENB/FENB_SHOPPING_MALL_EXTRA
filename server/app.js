const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { mongoConnect } = require('./apis/database');
const Product = require('./models/product');

require('dotenv').config();

const app = express();
const api = require('./routes/api');
const PORT = process.env.PORT || 8000;

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api', api);

mongoConnect(async client => {
  console.log('Connected!');

  // const product = new Product({
  //   favorites: 124,
  //   brand: 0,
  //   category: 0,
  //   gender: 0,
  //   name: '덩크 로우 레트로',
  //   price: 330000,
  //   color: 1,
  //   imgURL: 'http://localhost:8000/images/nike/sneakers/nike_black_male_sneakers.png',
  //   description: `진정한 팀워크를 위해
  //     하드우드를 위해 태어나 스트리트로 무대를 옮겨온 나이키 덩크 로우 레트로가 산뜻한 오버레이와 오리지널 팀 컬러로 돌아왔습니다.
  //     신을수록 부드러워지는 멋진 룩의 프리미엄 가죽 갑피가 특징인 이 농구 아이콘은 80년대 분위기를 한껏 발산합니다. 여기에 현대의 풋웨어 기술로 21세기의 편안함을 구현했습니다.
  //     상품 특징
  //     길들이면서 더욱 아름다워지는 완벽한 광택의 프리미엄 가죽 갑피
  //     현대적인 폼 중창으로 가볍고 반응성이 우수한 쿠셔닝 선사
  //     로우 컷 패딩 카라로 편안한 느낌의 날렵한 룩 완성
  //     스쿨 팀 컬러의 과감한 컬러 블로킹으로 오리지널 컬러웨이 감성 재현
  //     클래식 농구 피벗 서클이 새겨진 고무 밑창이 내구성과 접지력, 헤리티지 스타일 선사
  //     상품 상세 정보
  //     로우 컷 카라
  //     폼 안창
  //     토의 천공 디테일`,
  //   dateOfManufacture: new Date('2022-12'),
  //   feature: '남성 운동화',
  // });

  // product.save();

  const products = await Product.getProducts();
  console.log(products);

  app.listen(PORT, () => {
    console.log(`app listening on http://localhost:${PORT}`);
  });
});
