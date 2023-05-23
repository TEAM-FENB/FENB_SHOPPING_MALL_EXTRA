import { Stack, ColorSwatch, Text, SimpleGrid, useMantineColorScheme } from '@mantine/core';
import styled from '@emotion/styled';

import { SizeButton } from '..';

const SizeButtonContainer = styled(SimpleGrid)`
  border: ${props => props.selected && '1px solid #F36B26'};
  border-radius: 0.4rem;
`;

const Info = ({ currentProduct, isSizeSelected, currentSelectedSize, handleSizeClick }) => {
  const { colorScheme } = useMantineColorScheme();
  const { price, color, brand, stocks, feature } = currentProduct;

  return (
    <>
      <Text c={colorScheme === 'dark' ? 'gray.4' : 'gray.8'} size="1.4rem">
        {brand.kr} / {feature}
      </Text>
      <Text fw={500} m="2rem 0" size="2rem">{`${price.toLocaleString('ko-KR')} 원`}</Text>
      <Stack>
        <Text fw="600">사이즈 선택</Text>
        <SizeButtonContainer cols={5} selected={isSizeSelected === false}>
          {stocks.map(({ size, stock }) => (
            <SizeButton
              key={size}
              disabled={stock === 0}
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
              onClick={() => handleSizeClick(size)}>
              {size}
            </SizeButton>
          ))}
        </SizeButtonContainer>
        {isSizeSelected === false ? (
          <Text color="red" fw="500">
            사이즈를 선택해주세요
          </Text>
        ) : null}
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
