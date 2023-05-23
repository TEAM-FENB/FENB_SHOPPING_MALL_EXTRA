import { useQuery } from '@tanstack/react-query';

import { Stack, Title, Group, Text, useMantineTheme, Accordion, Container, Image } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import { cartsQuery } from 'api/query';
import { useTotalPrice } from 'hooks/carts';
import { MEDIAQUERY_WIDTH } from 'constants';

const CartHistory = ({ discount: { discountAmount, discountedTotalPrice } }) => {
  const matches = useMediaQuery(`(min-width: ${MEDIAQUERY_WIDTH}px)`);
  const { colors, colorScheme } = useMantineTheme();

  const totalPrice = useTotalPrice();
  const { data: carts } = useQuery(cartsQuery());

  return (
    <>
      {matches ? (
        <Stack miw="30rem" px="0.8rem">
          <Title py="1.2rem">장바구니</Title>
          <Group position="apart">
            <Text>상품 금액</Text>
            <Text>{totalPrice.toLocaleString('ko-KR')} 원</Text>
          </Group>
          <Group position="apart">
            <Text>쿠폰 할인액</Text>
            <Text>{discountAmount.toLocaleString('ko-KR')} 원</Text>
          </Group>
          <Group position="apart">
            <Text>배송비</Text>
            <Text>0 원</Text>
          </Group>
          <Group
            my="1.2rem"
            position="apart"
            py="2.4rem"
            sx={{
              borderBottom: `1px solid ${colorScheme === 'dark' ? colors.gray[8] : colors.gray[3]}`,
              borderTop: `1px solid ${colorScheme === 'dark' ? colors.gray[8] : colors.gray[3]}`,
            }}>
            <Text>총 결제 금액</Text>
            <Text>{discountedTotalPrice.toLocaleString('ko-KR')} 원</Text>
          </Group>

          <Stack mb="2rem" pt="2.4rem">
            <Title fw="bold" fz="2rem" mb="0.8rem">
              주문 상품
            </Title>

            {carts.map(({ id, selectedSize, imgURL, name, color, quantity, price }) => (
              <Group
                key={`${id}-${selectedSize}`}
                align="flex-start"
                c={colorScheme === 'dark' ? 'gray.6' : 'dark'}
                fz="1.4rem"
                sx={{ flexWrap: 'nowrap' }}>
                <Image alt={name} height="7rem" src={imgURL} width="7rem" withPlaceholder />
                <Stack align="flex-start" justify="flex-start" maw="fit-content" pl="2rem" spacing={0}>
                  <Text c={colorScheme === 'dark' ? 'gray.4' : '#111'} fw="bold" fz="1.4rem" mb="0.4rem">
                    {name}
                  </Text>
                  <Text>사이즈 : {selectedSize}</Text>
                  <Text>색상 : {color.kr}</Text>
                  <Text>수량 : {quantity}</Text>
                  <Text>가격 : {price.toLocaleString('ko-KR')} 원</Text>
                  <Text>총 가격 : {(price * quantity).toLocaleString('ko-KR')} 원</Text>
                </Stack>
              </Group>
            ))}
          </Stack>
        </Stack>
      ) : (
        <Accordion
          chevronSize="3rem"
          my="2rem"
          p="0"
          w="100%"
          styles={() => ({
            chevron: {
              svg: {
                width: '3rem',
                height: '3rem',
              },
            },
            item: {
              button: {
                padding: 0,
              },
            },
          })}
          sx={{
            borderTop: `1px solid ${colorScheme === 'dark' ? colors.gray[8] : colors.gray[3]}`,
          }}>
          <Accordion.Item py="2.4rem" value="CartHistory">
            <Accordion.Control sx={{ ':hover': { backgroundColor: 'transparent' } }}>
              <Title>장바구니</Title>
            </Accordion.Control>
            <Accordion.Panel>
              <Container size="100%">
                <Stack mb="2rem" pt="2.4rem">
                  <Title fw="bold" fz="2rem" mb="0.8rem">
                    주문 상품
                  </Title>
                  {carts.map(({ id, selectedSize, imgURL, name, color, quantity, price }) => (
                    <Group
                      key={`${id}-${selectedSize}`}
                      align="flex-start"
                      c={colorScheme === 'dark' ? 'gray.6' : 'dark'}
                      fz="1.4rem"
                      sx={{ flexWrap: 'nowrap' }}>
                      <Image alt={name} height="7rem" src={imgURL} width="7rem" withPlaceholder />
                      <Stack align="flex-start" justify="flex-start" maw="fit-content" pl="2rem" spacing={0}>
                        <Text c={colorScheme === 'dark' ? 'gray.4' : '#111'} fw="bold" fz="1.4rem" mb="0.4rem">
                          {name}
                        </Text>
                        <Text>사이즈 : {selectedSize}</Text>
                        <Text>색상 : {color.kr}</Text>
                        <Text>수량 : {quantity}</Text>
                        <Text>가격 : {price.toLocaleString('ko-KR')} 원</Text>
                        <Text>총 가격 : {(price * quantity).toLocaleString('ko-KR')} 원</Text>
                      </Stack>
                    </Group>
                  ))}
                </Stack>
                <Stack
                  fz="1.5rem"
                  pt="2.4rem"
                  spacing="0.2rem"
                  sx={{ borderTop: `1px solid ${colorScheme === 'dark' ? colors.gray[8] : colors.gray[3]}` }}>
                  <Group position="apart">
                    <Text>상품 금액</Text>
                    <Text>{totalPrice.toLocaleString('ko-KR')} 원</Text>
                  </Group>
                  <Group position="apart">
                    <Text>쿠폰 할인액</Text>
                    <Text>{discountAmount.toLocaleString('ko-KR')} 원</Text>
                  </Group>
                  <Group position="apart">
                    <Text>배송비</Text>
                    <Text>0 원</Text>
                  </Group>
                  <Group mt="0.8rem" position="apart">
                    <Text>총 결제 금액</Text>
                    <Text>{discountedTotalPrice.toLocaleString('ko-KR')} 원</Text>
                  </Group>
                </Stack>
              </Container>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      )}
    </>
  );
};

export default CartHistory;
