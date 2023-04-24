import { useQuery } from '@tanstack/react-query';
import { Card, Image, Text, Badge, Button, Group, Flex, Container, Modal } from '@mantine/core';
import { useRef, useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { useDisclosure } from '@mantine/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { checkSignIn, fetchCarousel, fetchProducts } from '../api';
import PATH from '../constants/path';

const MainCarousel = ({ modalOpen }) => {
  const { data: slides } = useQuery({
    queryKey: ['carousel'],
    queryFn: fetchCarousel,
  });
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  const sideBackgroundColorsRef = useRef(slides.map(slide => slide.sideBackgroundColor));
  const [sideBackgroundColor, setSideBackgroundColor] = useState(sideBackgroundColorsRef.current.at(0));
  const navigate = useNavigate();

  const handleCarouselClick = async () => {
    const data = await checkSignIn();
    console.log(data);
    if (!data.isSignIn) navigate(PATH.SIGNIN);

    modalOpen();
  };

  return (
    <Container w="100%" maw="100%" pos="relative" bg={sideBackgroundColor}>
      <Carousel
        mx="auto"
        maw="120rem"
        withIndicators
        loop
        plugins={[autoplay.current]}
        previousControlIcon={<SlArrowLeft size="5rem" color="white" />}
        nextControlIcon={<SlArrowRight size="5rem" color="white" />}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        onSlideChange={idx => setSideBackgroundColor(sideBackgroundColorsRef.current.at(idx))}
        pos="static"
        sx={{
          '.mantine-Carousel-control': {
            border: 'none',
            backgroundColor: 'transparent',
            boxShadow: 'none',
          },
        }}
        styles={{
          indicator: { width: '1rem', height: '1rem' },
        }}>
        {slides.map(({ title, imgURL, alt }) => (
          <Carousel.Slide key={title} onClick={() => handleCarouselClick()}>
            <Image src={imgURL} alt={alt} />
          </Carousel.Slide>
        ))}
      </Carousel>
    </Container>
  );
};

const Main = () => {
  const { data: products } = useQuery({ queryKey: ['products'], queryFn: fetchProducts });

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <MainCarousel modalOpen={open} />
      <Container p="0" maw="120rem">
        <Flex gap="xl" justify="center" align="center" direction="row" wrap="wrap" m="5rem 0">
          {products.map(({ id, name, price, imgURL, brand }) => (
            <Link to={`${PATH.PRODUCTS}/${id}`} key={id}>
              <Card shadow="sm" padding="lg" radius="md" w="28rem" withBorder>
                <Card.Section pos="relative">
                  <Image src={imgURL} alt={name}></Image>
                  <Badge
                    color="pink"
                    variant="light"
                    size="xl"
                    h="3rem"
                    fz="1.3rem"
                    pos="absolute"
                    bottom="1rem"
                    right="1rem">
                    무료 배송
                  </Badge>
                </Card.Section>

                <Group position="apart" mt="md" mb="xs">
                  <Text weight="bold" size="2rem">
                    {name}
                  </Text>
                </Group>

                <Text size="1.5rem" color="dimmed">
                  {brand.kr}
                </Text>
                <Text size="1.5rem" color="dimmed">
                  {price.toLocaleString('ko-KR')}
                </Text>

                <Button variant="light" color="blue" fullWidth mt="md" radius="md" size="2rem" h="4rem">
                  상품 보러 가기
                </Button>
              </Card>
            </Link>
          ))}
        </Flex>
        <Modal
          opened={opened}
          onClose={close}
          centered
          ta="center"
          size="xl"
          padding="xl"
          transitionProps={{ transition: 'rotate-left' }}
          sx={{
            '.mantine-Modal-close': {
              width: '3rem',
              height: '3rem',
            },
            '.mantine-Modal-close > svg': {
              width: '3rem',
              height: '3rem',
            },
          }}>
          <Text size="3rem" weight="bold" p="5rem 0">
            쿠폰이 발급되었습니다.
          </Text>
          <Button fullWidth size="2rem" h="5rem" onClick={close}>
            확인
          </Button>
        </Modal>
      </Container>
    </>
  );
};
export default Main;
