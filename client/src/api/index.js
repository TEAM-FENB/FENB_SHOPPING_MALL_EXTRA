import axios from 'axios';

export const fetchProducts = async () => {
  const { data } = await axios.get('/api/products');
  return data;
};

export const fetchCategories = async () => {
  const { data } = await axios.get('/api/categories');
  return data;
};

export const fetchCarts = async () => {
  const { data } = await axios.get('/api/carts/me');
  return data;
};

export const fetchFilteredProducts = async search => {
  const { data } = await axios.get(`/api/products${search}`);
  return data;
};

export const fetchCarousel = async () => {
  const { data } = await axios.get('/api/carousel');
  return data;
};

export const addCoupon = async id => {
  const { data } = await axios.post(`/api/coupons/${id}`);
  return data;
};

export const checkSignIn = async () => {
  const { data } = await axios.get('/api/auth/verify');
  return data;
};

export const getUserInfo = async () => {
  const { data } = await axios.get('api/users/me');
  return data;
};

export const signOut = async () => {
  await axios.get('api/auth/signout');
};
