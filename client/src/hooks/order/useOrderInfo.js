import { useRef } from 'react';

const useOrderInfo = (defaultAddress, changeDiscount) => {
  const addressId = useRef(defaultAddress.id);
  const couponId = useRef(null);
  const paymentMethod = useRef('kakaoPay');

  const changeAddressId = newAddressId => {
    addressId.current = newAddressId;
  };

  const changeCouponId = newCouponId => {
    couponId.current = newCouponId;

    changeDiscount(newCouponId);
  };

  const changePaymentMethod = newPaymentMethod => {
    paymentMethod.current = newPaymentMethod;
  };

  const getOrderInfo = () => ({
    addressId: addressId.current,
    couponId: couponId.current,
    paymentMethod: paymentMethod.current,
  });

  return { changeAddressId, changeCouponId, changePaymentMethod, getOrderInfo };
};

export default useOrderInfo;
