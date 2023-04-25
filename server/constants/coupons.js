const COUPONS = [
  {
    id: 1,
    title: '신규회원 15% 할인쿠폰',
    discountRate: 15,
    discountPrice: null,
    minimumPrice: 100000,
    endTime: new Date().setDate(new Date().getDate() + 7),
  },
  {
    id: 2,
    title: '1주년 기념 2만원 할인쿠폰',
    discountRate: null,
    discountPrice: 20000,
    minimumPrice: 100000,
    endTime: new Date().setDate(new Date().getDate() + 7),
  },
];

module.exports = COUPONS;
