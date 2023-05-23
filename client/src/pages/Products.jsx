import { useEffect, useRef, useState } from 'react';

import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { Container, Stack, Group, Image, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import { favoritesQuery, productsQuery, verifyQuery } from '../api/query';
import { Info, Description, CartButton, WishListButton } from '../components/Products';
import { useAddCartMutation } from '../hooks/carts';
import { useToggleWishItemMutation } from '../hooks/wishList';

const MEDIAQUERY_WIDTH = 768;

const Products = () => {
  const { data: products } = useQuery(productsQuery());
  const { data: favorites } = useQuery(favoritesQuery());
  const { data: verify } = useQuery(verifyQuery());
  const { pathname } = useLocation();

  const { mutateAsync: addCart } = useAddCartMutation();
  const { mutate: toggleFavorite } = useToggleWishItemMutation();

  const getIdfromPath = pathname => +pathname.split('/').at(-1);

  const currentProduct = products?.find(product => product.id === getIdfromPath(pathname));

  const { id, name, brand, description, imgURL } = currentProduct;

  const [currentSelectedSize, setCurrentSelectedSize] = useState(-1);
  const [isSizeSelected, setIsSizeSelected] = useState(null);

  const isSignInUserRef = useRef(null);
  const [hasStock, setHasStock] = useState(true);

  const [isFavorite, setIsFavorite] = useState(verify ? favorites.some(product => product.id === id) : false);

  const matches = useMediaQuery(`(min-width: ${MEDIAQUERY_WIDTH}px)`);

  useEffect(() => {
    setHasStock(true);
  }, [currentSelectedSize]);

  useEffect(() => {
    isSignInUserRef.current = verify;
  }, [verify]);

  const handleIsSizeSelected = () => {
    setIsSizeSelected(!!isSizeSelected);
  };

  const handleSizeClick = selectedSize => {
    setCurrentSelectedSize(selectedSize);
    setIsSizeSelected(true);
  };

  const handleCartClick = async selectedSize => {
    try {
      await addCart({ id, selectedSize, currentProduct });
    } catch (e) {
      setHasStock(selectedSize !== currentSelectedSize);
    }
  };

  const handleWishListToggle = () => {
    setIsFavorite(!isFavorite);

    toggleFavorite({ id, isFavorite, currentProduct });
  };

  return (
    <Container p="0 0 5rem 0" size="120rem">
      {matches ? (
        <Group align="flex-start" noWrap="nowrap" position="center">
          <Stack m="4.8rem 0 0.8rem" maw="60rem" p="0 2.4rem 0 4.8rem">
            <Image src={imgURL} />
            <Description>{description}</Description>
          </Stack>
          <Stack fz="1.6rem" m="4.8rem 0.8rem 0 0" miw="40rem" p="0 4.8rem 0 2.4rem" spacing={0}>
            <Title>{`[${brand.kr}] ${name}`}</Title>
            <Info
              currentProduct={currentProduct}
              currentSelectedSize={currentSelectedSize}
              handleSizeClick={handleSizeClick}
              isSizeSelected={isSizeSelected}
            />
            <CartButton
              currentProduct={currentProduct}
              handleCartClick={() => handleCartClick(currentSelectedSize)}
              handleIsSizeSelected={handleIsSizeSelected}
              hasStock={hasStock}
              isSignInUserRef={isSignInUserRef}
              isSizeSelected={isSizeSelected}
            />
            <WishListButton
              currentProduct={currentProduct}
              handleWishListToggle={handleWishListToggle}
              isFavorite={isFavorite}
              isSignInUserRef={isSignInUserRef}
            />
          </Stack>
        </Group>
      ) : (
        <Stack fz="1.6rem" m="4.8rem 0.8rem 0 0" miw="45rem" p="0 5rem" spacing={0}>
          <Title>{`[${brand.kr}] ${name}`}</Title>
          <Image src={imgURL} />
          <Info
            currentProduct={currentProduct}
            currentSelectedSize={currentSelectedSize}
            handleSizeClick={handleSizeClick}
            isSizeSelected={isSizeSelected}
          />
          <CartButton
            currentProduct={currentProduct}
            handleCartClick={() => handleCartClick(currentSelectedSize)}
            handleIsSizeSelected={handleIsSizeSelected}
            hasStock={hasStock}
            isSignInUserRef={isSignInUserRef}
            isSizeSelected={isSizeSelected}
          />
          <WishListButton
            currentProduct={currentProduct}
            handleWishListToggle={handleWishListToggle}
            isFavorite={isFavorite}
            isSignInUserRef={isSignInUserRef}
          />
          <Description>{description}</Description>
        </Stack>
      )}
    </Container>
  );
};

export default Products;
