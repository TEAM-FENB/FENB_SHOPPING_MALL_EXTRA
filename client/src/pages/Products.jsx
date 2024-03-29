import { useState } from 'react';

import { Container, Stack, Group, Image, Title, Text } from '@mantine/core';

import { Info, CartButton, WishListButton } from 'components/Products';
import { productsQuery } from 'api/query';
import { useMediaQuery, useCurrentItem } from 'hooks';
import { useIsSignInRef } from 'hooks/products';
import { MEDIAQUERY_WIDTH } from 'constants';

const Products = () => {
  const matches = useMediaQuery(`(min-width: ${MEDIAQUERY_WIDTH.TABLET}px)`);

  const currentProduct = useCurrentItem(productsQuery);
  const { imgURL, description, brand, name } = currentProduct;

  const [currentSelectedSize, setCurrentSelectedSize] = useState(-1);
  const [isSizeSelected, setIsSizeSelected] = useState(true);

  const isSignInRef = useIsSignInRef();

  return (
    <Container p="0 0 5rem 0" size="120rem">
      {matches ? (
        <Group align="flex-start" noWrap="nowrap" position="center">
          <Stack m="4.8rem 0 0.8rem" maw="60rem" p="0 2.4rem 0 4.8rem">
            <Image alt={name} src={imgURL} />
            <Text fw="500" fz="1.6rem" lh="3.2rem" mt="1.5rem">
              {description}
            </Text>
          </Stack>
          <Stack fz="1.6rem" m="4.8rem 0.8rem 0 0" miw="36rem" p="0 4.8rem 0 2.4rem" spacing={0} w="40rem">
            <Title>{`[${brand.kr}] ${name}`}</Title>
            <Info
              currentProduct={currentProduct}
              currentSelectedSize={currentSelectedSize}
              isSizeSelected={isSizeSelected}
              setCurrentSelectedSize={setCurrentSelectedSize}
              setIsSizeSelected={setIsSizeSelected}
            />
            <CartButton
              currentProduct={currentProduct}
              currentSelectedSize={currentSelectedSize}
              isSignInRef={isSignInRef}
              isSizeSelected={isSizeSelected}
              setIsSizeSelected={setIsSizeSelected}
            />
            <WishListButton currentProduct={currentProduct} isSignInRef={isSignInRef} />
          </Stack>
        </Group>
      ) : (
        <Stack fz="1.6rem" m="4.8rem 0.8rem 0 0" miw="35rem" p="0 5rem" spacing={0}>
          <Title>{`[${brand.kr}] ${name}`}</Title>
          <Image alt={name} my="2rem" src={imgURL} />
          <Info
            currentProduct={currentProduct}
            currentSelectedSize={currentSelectedSize}
            isSizeSelected={isSizeSelected}
            setCurrentSelectedSize={setCurrentSelectedSize}
            setIsSizeSelected={setIsSizeSelected}
          />
          <CartButton
            currentProduct={currentProduct}
            currentSelectedSize={currentSelectedSize}
            isSignInRef={isSignInRef}
            isSizeSelected={isSizeSelected}
            setIsSizeSelected={setIsSizeSelected}
          />
          <WishListButton currentProduct={currentProduct} isSignInRef={isSignInRef} />
          <Text fw="500" fz="1.6rem" lh="3.2rem" mt="1.5rem">
            {description}
          </Text>
        </Stack>
      )}
    </Container>
  );
};

export default Products;
