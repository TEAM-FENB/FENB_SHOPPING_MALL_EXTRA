import { Link } from 'react-router-dom';

import { SimpleGrid, Image, Text, Card, Group, Badge } from '@mantine/core';

import { SadIcon } from '..';
import { PATH } from '../../constants';

const ResultProducts = ({ products }) => (
  <>
    {/* 조건 ? 원래보여줘야할 화면 : 특수한 상황에서의 보여줘야할 화면 */}
    {/* products가 있니 ? 상품 나열 : 등록된 상품이 없습니다. */}
    {products.length === 0 ? (
      <SadIcon>등록된 상품이 없습니다.</SadIcon>
    ) : (
      <SimpleGrid breakpoints={[{ maxWidth: 1024, cols: 2 }]} cols={3}>
        {products.map(({ id, imgURL, name, price, brand, feature }) => (
          <Link key={id} to={`${PATH.PRODUCTS}/${id}`}>
            <Card fz="1.6rem" padding="lg" withBorder>
              <Card.Section pos="relative">
                <Image alt={name} src={imgURL} />
              </Card.Section>

              <Group mb="xs" mt="md" position="apart" noWrap>
                <Text weight={500} truncate>
                  {name}
                </Text>
                <Badge color="skyblue" size="xl" sx={{ flexShrink: 0 }} variant="light">
                  무료배송
                </Badge>
              </Group>

              <Text align="left" color="dimmed" size="1.4rem">
                {brand.kr} / {feature}
              </Text>
              <Text fw={500} m="1rem 0" size="1.5rem">
                {/* ko-KR 붙일까 지울까 (해외 사람이 들어왔을때를 고려하면 ko-KR이 적혀있어야하긴 함) */}
                {`${price.toLocaleString('ko-KR')} 원`}
              </Text>
            </Card>
          </Link>
        ))}
      </SimpleGrid>
    )}
  </>
);

export default ResultProducts;
