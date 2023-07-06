import axios from 'axios';

const API_URL = 'http://ec2-3-36-56-62.ap-northeast-2.compute.amazonaws.com:8000';

export const fetchProducts = async () => {
  const { data } = await axios.get(`${API_URL}/api/products`);
  return data;
};

export const fetchPageProducts = async (page, pageSize) => {
  const { data } = await axios.get(`${API_URL}/api/products/pages/${page}?pageSize=${pageSize}`);
  return data;
};

export const fetchFilteredProducts = search => async () => {
  const { data } = await axios.get(`${API_URL}/api/products${search}`);
  return data;
};

export const fetchSlides = async () => {
  const { data } = await axios.get(`${API_URL}/api/slides`);
  return data;
};

export const signOut = async () => {
  await axios.get('api/auth/signout');
};

export const requestVerify = async () => {
  const { data } = await axios.get(`${API_URL}/api/auth/verify`);
  return data;
};

export const fetchFavorites = async () => {
  const { data } = await axios.get(`${API_URL}/api/favorites/me`);
  return data;
};

export const fetchCarts = async () => {
  const { data } = await axios.get(`${API_URL}/api/carts/me`);
  return data;
};

export const fetchAddresses = async () => {
  const { data } = await axios.get('api/users/me/address');
  return data;
};

export const fetchCoupons = async () => {
  const { data } = await axios.get(`${API_URL}/api/coupons`);
  return data;
};

export const applyCoupon = async id => {
  const { data } = await axios.get(`${API_URL}/api/order/coupons/${id}`);
  return data;
};

export const fetchHistory = async () => {
  const { data } = await axios.get(`${API_URL}/api/order/history`);
  return data;
};

export const signIn = async ({ email, password }) => {
  const { data } = await axios.post(`${API_URL}/api/auth/signin`, {
    email,
    password,
  });

  return data;
};

export const checkEmailDuplicate = async email => {
  const { data } = await axios.post(`${API_URL}/api/auth/signup/email`, {
    email,
  });

  return data;
};

export const signUp = async ({ email, name, password, phone, mainAddress, detailAddress, postcode }) => {
  await axios.post(`${API_URL}/api/auth/signup`, {
    email,
    name,
    phone,
    password,
    mainAddress,
    detailAddress,
    postcode,
  });
};

export const addCoupon = async id => {
  const { data } = await axios.post(`${API_URL}/api/coupons/${id}`);
  return data;
};

export const addFavorite = async productId => {
  const { data } = await axios.post(`${API_URL}/api/favorites/me`, { id: productId });
  return data;
};

export const addCart = async ({ id, size }) => {
  const { data } = await axios.post(`${API_URL}/api/carts/me/${id}`, { size });
  return data;
};

export const addAddress = async ({ name, phone, mainAddress, detailAddress, postcode }) => {
  const { data } = await axios.post(`${API_URL}/api/users/me/address`, {
    recipient: name,
    recipientPhone: phone,
    mainAddress,
    detailAddress,
    postcode,
  });

  return data;
};

export const order = async form => {
  await axios.post(`${API_URL}/api/order/pay`, form);
};

export const changeCartQuantity = async ({ id, size, quantity }) => {
  await axios.patch(`${API_URL}/api/carts/me/${id}`, { size, quantity });
};

export const changeDefaultAddress = async id => {
  await axios.patch(`${API_URL}/api/users/me/address/default/${id}`);
};

export const removeCart = async id => {
  await axios.delete(`${API_URL}/api/carts/me/${id}`);
};

export const removeAddress = async id => {
  await axios.delete(`${API_URL}/api/users/me/address/${id}`);
};

export const removeFavorite = async favoriteId => {
  await axios.delete(`${API_URL}/api/favorites/me/${favoriteId}`);
};
