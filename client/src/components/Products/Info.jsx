import { Stack, ColorSwatch, Text, SimpleGrid, Button, useMantineColorScheme } from '@mantine/core';

import { useMediaQuery } from 'hooks';
import { MEDIAQUERY_WIDTH } from 'constants';

const Info = ({
  currentProduct: { price, color, brand, stocks, feature },
  currentSelectedSize,
  setCurrentSelectedSize,
  isSizeSelected,
  setIsSizeSelected,
}) => {
  const matches = useMediaQuery(`(min-width: ${MEDIAQUERY_WIDTH.TABLET}px)`);
  const { colorScheme } = useMantineColorScheme();

  const handleSizeClick = size => () => {
    setCurrentSelectedSize(size);
    setIsSizeSelected(true);
  };

  return (
    <>
      <Text c={colorScheme === 'dark' ? 'gray.4' : 'gray.8'} size={colorScheme === 'dark' ? '1.6rem' : '1.4rem'}>
        {brand.kr} / {feature}
      </Text>
      <Text fw={500} m="2rem 0" size="2rem">{`${price.toLocaleString('ko-KR')} 원`}</Text>
      <Stack>
        <Text fw="600">사이즈 선택</Text>
        <SimpleGrid
          cols={matches ? 5 : 4}
          sx={theme => ({
            border: `${!isSizeSelected && `1px solid ${theme.colors.red[6]}`}`,
            borderRadius: '0.4rem',
          })}>
          {stocks.map(({ size, quantity }) => (
            <Button
              key={size}
              disabled={!quantity}
              fw="normal"
              fz="1.6rem"
              h="4rem"
              radius="0.4rem"
              variant="default"
              styles={theme => ({
                root: {
                  '&:disabled': {
                    color: colorScheme === 'dark' && theme.colors.gray[6],
                  },
                },
              })}
              sx={theme => ({
                border: `${size === currentSelectedSize && `1px solid ${theme.colors.blue[6]}`}`,
              })}
              onClick={handleSizeClick(size)}>
              {size}
            </Button>
          ))}
        </SimpleGrid>
        {!isSizeSelected && (
          <Text color="red.6" fw="500">
            사이즈를 선택해주세요
          </Text>
        )}
        <Stack align="center" m="1.4rem 0" spacing="xs" w="5rem">
          <ColorSwatch color={color.color} size="2.5rem" />
          <Text fw="500" fz="1.4rem" m="0">
            {color.kr}
          </Text>
        </Stack>
      </Stack>
    </>
  );
};

export default Info;
