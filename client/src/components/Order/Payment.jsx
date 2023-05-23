import { useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { Stack, useMantineColorScheme } from '@mantine/core';

import { CustomButton } from 'components';
import { order } from 'api/fetch';
import { useMediaQuery } from 'hooks';
import { useGetAddresses } from 'hooks/address';
import { useOrderInfo } from 'hooks/order';
import { CARTS_QUERY_KEY, INIT_FIELD, MEDIAQUERY_WIDTH, PATH } from 'constants';
import Address from './Address';
import Coupons from './Coupons';
import PaymentMethod from './PaymentMethod';

const Payment = ({ changeDiscount }) => {
  const addresses = useGetAddresses();

  const matches = useMediaQuery(`(min-width: ${MEDIAQUERY_WIDTH}px)`);
  const { colorScheme } = useMantineColorScheme();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const defaultAddress = !addresses?.length ? {} : addresses?.find(address => !!address.isDefault) ?? addresses[0];
  const isValidAddress = defaultAddress.postcode ? defaultAddress.postcode !== '' : false;

  const { changeAddressId, changeCouponId, changePaymentMethod, getOrderInfo } = useOrderInfo(
    defaultAddress,
    changeDiscount
  );

  const [field, setFiled] = useState({ ...INIT_FIELD, info: isValidAddress, input: !isValidAddress });
  const selectedAddress = useRef(defaultAddress);

  const changeSelectedAddress = newAddress => {
    selectedAddress.current = newAddress;

    changeAddressId(newAddress.id);
  };

  const handleOrderClick = async () => {
    queryClient.removeQueries(CARTS_QUERY_KEY);

    await order(getOrderInfo());

    navigate(PATH.ORDER_COMPLETE, { replace: true });
  };

  return (
    <Stack mx="auto" pr={matches && '5rem'} spacing="5rem" w="100%">
      <Address
        changeSelectedAddress={changeSelectedAddress}
        field={field}
        selectedAddress={selectedAddress}
        setFiled={setFiled}
      />
      <Coupons changeCouponId={changeCouponId} />
      <PaymentMethod changePaymentMethod={changePaymentMethod} />
      <CustomButton
        color={colorScheme === 'dark' ? 'gray.6' : 'dark'}
        disabled={!field.info}
        m="0 auto"
        w="30rem"
        onClick={handleOrderClick}>
        주문결제
      </CustomButton>
    </Stack>
  );
};

export default Payment;
