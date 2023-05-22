import { Stack, ColorSwatch, Text, SimpleGrid, useMantineColorScheme, useMantineTheme } from '@mantine/core';

import { SizeButton } from 'components';

const Info = ({
  currentProduct: { price, color, brand, stocks, feature },
  currentSelectedSize,
  setCurrentSelectedSize,
  isSizeSelected,
  setIsSizeSelected,
}) => {
  const { colorScheme } = useMantineColorScheme();
  const { colors } = useMantineTheme();

  const handleSizeClick = selectedSize => () => {
    setCurrentSelectedSize(selectedSize);
    setIsSizeSelected(true);
  };

  return (
    <>
      <Text c={colorScheme === 'dark' ? 'gray.4' : 'gray.8'} size="1.4rem">
        {brand.kr} / {feature}
      </Text>
      <Text fw={500} m="2rem 0" size="2rem">{`${price.toLocaleString()} 원`}</Text>
      <Stack>
        <Text fw="600">사이즈 선택</Text>
        <SimpleGrid
          cols={5}
          sx={{
            border: `${!isSizeSelected && '1px solid red'}`,
            borderColor: colors.red[6],
            borderRadius: '0.4rem',
          }}>
          {stocks.map(({ size, stock }) => (
            <SizeButton
              key={size}
              disabled={!stock}
              fw="normal"
              radius="0.4rem"
              selected={size === currentSelectedSize}
              variant="default"
              styles={theme => ({
                root: {
                  '&:disabled': {
                    color: colorScheme === 'dark' && theme.colors.gray[6],
                  },
                },
              })}
              onClick={handleSizeClick(size)}>
              {size}
            </SizeButton>
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
