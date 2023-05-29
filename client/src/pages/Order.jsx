import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Container, Title, Group, Stack, Text, useMantineTheme, Flex } from '@mantine/core';

import { CustomButton } from 'components';
import { CartHistory, Address, Coupon, PaymentMethod } from 'components/Order';
import { applyCoupon } from 'api/fetch';
import { useMediaQuery } from 'hooks';
import { useAddresses } from 'hooks/address';
import { useTotalCartItems, useTotalPrice } from 'hooks/carts';
import { useOrderMutation } from 'hooks/mutation';
import { MEDIAQUERY_WIDTH, PAYMENT_METHODS, PATH } from 'constants';

const Order = () => {
  const matches = useMediaQuery(`(min-width: ${MEDIAQUERY_WIDTH}px)`);
  const { colorScheme } = useMantineTheme();

  const navigate = useNavigate();

  const addresses = useAddresses();
  const totalCartItems = useTotalCartItems();
  const totalPrice = useTotalPrice();
  const [discount, setDiscount] = useState({ discountAmount: 0, discountedTotalPrice: totalPrice });
  const [form, setForm] = useState({
    addressId: addresses[0]?.id ?? null,
    couponId: null,
    paymentMethod: PAYMENT_METHODS[0].value,
  });
  const [mode, setMode] = useState({
    edit: false,
    add: !form.addressId,
  });
  const { mutate: order } = useOrderMutation();

  const updateForm = property => setForm({ ...form, ...property });

  const handleEditModeClick = () => setMode({ ...mode, edit: !mode.edit });

  const handleAddModeClick = () => setMode({ ...mode, add: !mode.add, edit: !mode.edit });

  const handleCouponIdUpdate = async couponId => {
    const newDiscount = await applyCoupon(couponId);

    setDiscount({ ...discount, ...newDiscount });
    updateForm({ couponId });
  };

  const handleOrderClick = () => {
    order(form);
    navigate(PATH.ORDER_COMPLETE, { replace: true });
  };

  return (
    <Container fz="1.6rem" size="1200px">
      <Stack align="center" pb="4rem" spacing={0}>
        <Title fz="2.4rem" py="0.8rem">
          결제하기
        </Title>
        {!matches && (
          <Group c={colorScheme === 'dark' ? 'gray.5' : 'gray.7'} spacing="0.8rem">
            <Text>{totalCartItems} 개의 제품</Text>
            <Text>/</Text>
            <Text>{totalPrice.toLocaleString('ko-KR')} 원</Text>
          </Group>
        )}
      </Stack>

      <Flex direction={matches ? 'row' : 'column-reverse'} mih="5rem" spacing={0}>
        <Stack mx="auto" pr={matches && '5rem'} spacing="5rem" w="100%">
          <Address
            form={form}
            handleAddModeClick={handleAddModeClick}
            handleEditModeClick={handleEditModeClick}
            mode={mode}
            updateForm={updateForm}
          />
          <Coupon handleCouponIdUpdate={handleCouponIdUpdate} />
          <PaymentMethod form={form} updateForm={updateForm} />
          <CustomButton
            color={colorScheme === 'dark' ? 'gray.6' : 'dark'}
            disabled={!form.addressId || mode.edit || mode.add}
            m="0 auto"
            w="30rem"
            onClick={handleOrderClick}>
            주문결제
          </CustomButton>
        </Stack>
        <CartHistory discount={discount} />
      </Flex>
    </Container>
  );
};

export default Order;
