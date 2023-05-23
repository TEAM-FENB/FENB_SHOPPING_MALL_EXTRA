import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import {
  Title,
  Container,
  Group,
  Card,
  Image,
  Text,
  Badge,
  UnstyledButton,
  Grid,
  useMantineTheme,
} from '@mantine/core';
import { BiTrash } from 'react-icons/bi';

import { favoritesQuery } from '../api/query';
import { NoProduct } from '../components';
import { PATH } from '../constants';
import { useToggleWishItemMutation } from '../hooks/wishList';

const WishList = () => {
  const { data: favorites } = useQuery(favoritesQuery());
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const { mutate } = useToggleWishItemMutation();

  const handleRemoveWishItemClick = id => {
    mutate({ id, isFavorite: true });
  };

  const handleClickProduct = id => {
    navigate(`${PATH.PRODUCTS}/${id}`);
  };

  return (
    <Container size="120rem">
      <Title>관심상품 목록</Title>
      {!favorites.length ? (
        <NoProduct pageName={'관심상품 목록'} />
      ) : (
        <Grid p="3.5rem">
          {favorites.map(({ id, imgURL, name, brand, price, feature }) => (
            <Grid.Col
              key={id}
              span={4}
              sx={{
                '@media (max-width: 768px)': {
                  flexBasis: '50%',
                  maxWidth: '50%',
                },
              }}>
              <Card fz="1.6rem" padding="lg" withBorder>
                <Card.Section>
                  <Image
                    alt="product"
                    src={imgURL}
                    sx={{ cursor: 'pointer' }}
                    truncate
                    onClick={() => handleClickProduct(id)}
                  />
                </Card.Section>

                <Group mb="xs" mt="md" position="apart" noWrap>
                  <Text sx={{ cursor: 'pointer' }} weight={500} truncate onClick={() => handleClickProduct(id)}>
                    {name}
                  </Text>
                  <Badge color="skyblue" h="2rem" sx={{ flexShrink: 0 }} variant="light">
                    무료배송
                  </Badge>
                </Group>

                <Text align="left" color="dimmed" size="1.4rem">
                  {brand.kr} / {feature}
                </Text>

                <Group my="md" position="apart">
                  <Text fw="500">{`${price.toLocaleString()} 원`}</Text>
                  <UnstyledButton sx={{ cursor: 'pointer' }} onClick={() => handleRemoveWishItemClick(id)}>
                    <BiTrash
                      color={theme.colorScheme === 'dark' ? theme.colors.gray[6] : 'rgb(117,117,117)'}
                      size="2.5rem"
                    />
                  </UnstyledButton>
                </Group>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default WishList;
