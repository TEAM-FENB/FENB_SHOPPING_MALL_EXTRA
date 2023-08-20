import { useRef } from 'react';

import { useQuery } from '@tanstack/react-query';

import { Accordion, Group, Radio, Stack, Text, Title, useMantineTheme } from '@mantine/core';

import { couponsQuery } from 'api/query';
import { useTotalPrice } from 'hooks/carts';

const ONE_DAY = 1000 * 60 * 60 * 24;

const expirationDate = endTime => Math.floor((new Date(endTime) - new Date()) / ONE_DAY);

const Coupon = ({ handleCouponIdUpdate }) => {
  const { colors } = useMantineTheme();

  const { data: coupons } = useQuery(couponsQuery());
  const totalPrice = useTotalPrice();

  const selectedCoupon = useRef('쿠폰을 선택하세요');

  const handleSelectCouponChange = e => {
    const { _id, discountPrice, discountRate, title } = coupons.find(({ _id }) => _id === e);

    const discountAmount = discountPrice || totalPrice * (discountRate / 100);
    const discountedTotalPrice = totalPrice - discountAmount;

    handleCouponIdUpdate(_id, discountAmount, discountedTotalPrice);

    selectedCoupon.current = title;
  };

  return (
    <Stack w="100%">
      <Title py="1.2rem">쿠폰</Title>
      <Accordion variant="separated">
        <Accordion.Item value="coupons">
          <Accordion.Control fz="1.6rem">{selectedCoupon.current}</Accordion.Control>
          <Accordion.Panel>
            <Radio.Group name="coupons" onChange={handleSelectCouponChange}>
              <Stack mt="xs">
                {coupons.map(({ _id: id, title, expireTime, minimumPrice }) => (
                  <Radio
                    key={id}
                    disabled={totalPrice < minimumPrice}
                    size="lg"
                    value={id}
                    label={
                      <Group fz="1.6rem" position="apart">
                        <Text>{title}</Text>
                        <Text color={colors.orange[7]}>
                          {totalPrice < minimumPrice
                            ? `최소 쿠폰 적용 금액은 ${minimumPrice.toLocaleString('ko-KR')}원 입니다`
                            : `${expirationDate(expireTime)}일 남았습니다`}
                        </Text>
                      </Group>
                    }
                    styles={{
                      labelWrapper: { width: '100%' },
                      label: { cursor: 'pointer' },
                      radio: { cursor: 'pointer' },
                      inner: { transform: 'translate3D(0, 3px, 0)' },
                    }}
                  />
                ))}
              </Stack>
            </Radio.Group>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Stack>
  );
};

export default Coupon;
