import { useLocation, useNavigate } from 'react-router-dom';

import { useMantineColorScheme, Stack, Group, Button, Modal, Image, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { SadIcon } from '..';
import { PATH } from '../../constants';

const CartButton = ({
  currentProduct,
  isSizeSelected,
  isSignInUserRef,
  hasStock,
  handleCartClick,
  handleIsSizeSelected,
}) => {
  const { colorScheme } = useMantineColorScheme();
  const [opened, { open, close }] = useDisclosure(false);
  const { imgURL, name, brand, price } = currentProduct;
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleCartModalOpen = () => {
    if (isSizeSelected) {
      if (!isSignInUserRef.current) {
        navigate(PATH.SIGNIN, { state: pathname });
      } else {
        open();

        handleCartClick();
      }
    }

    handleIsSizeSelected();
  };

  const handleModalButtonClick = () => {
    navigate(PATH.CART);
  };

  return (
    <>
      {isSizeSelected && (
        <Modal.Root opened={opened} size="50rem" sx={{ fontSize: '1.6rem' }} yOffset="0" onClose={close}>
          <Modal.Overlay />
          <Modal.Content sx={{ padding: '1.5rem' }}>
            {hasStock ? (
              <>
                <Modal.Header>
                  <Modal.Title fw="600" fz="1.6rem">
                    장바구니에 추가 되었습니다.
                  </Modal.Title>
                  <Modal.CloseButton size="1.6rem" />
                </Modal.Header>
                <Modal.Body>
                  <Stack sx={{ paddingTop: '1rem' }}>
                    <Group align="flex-start" noWrap="nowrap" position="apart">
                      <Image src={imgURL} width="15rem" />
                      <Stack sx={{ paddingLeft: '1.2rem' }} w="30rem">
                        <Text fw="600">{name}</Text>
                        <Text color="dimmed" fw="500" fz="1.4rem">
                          {brand.kr}
                        </Text>
                        <Text>{`${price.toLocaleString('ko-KR')} 원`}</Text>
                      </Stack>
                    </Group>
                    <Button
                      color={colorScheme === 'dark' ? 'gray.6' : 'dark'}
                      fz="1.6rem"
                      h="5rem"
                      mt="1rem"
                      radius="3rem"
                      onClick={handleModalButtonClick}>
                      장바구니 보기
                    </Button>
                  </Stack>
                </Modal.Body>
              </>
            ) : (
              <Stack align="center">
                <Modal.Header>
                  <Modal.Title fw="600" fz="2rem" pt="1rem">
                    재고가 부족하여 장바구니에 추가할 수 없습니다
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <SadIcon />
                </Modal.Body>
                <Button
                  color={colorScheme === 'dark' ? 'gray.6' : 'dark'}
                  fz="1.6rem"
                  h="4rem"
                  radius="3rem"
                  w="12rem"
                  onClick={close}>
                  돌아가기
                </Button>
              </Stack>
            )}
          </Modal.Content>
        </Modal.Root>
      )}

      <Button
        color={colorScheme === 'dark' ? 'gray.6' : 'dark'}
        fz="1.8rem"
        h="6rem"
        m="0.5rem"
        radius="3rem"
        onClick={handleCartModalOpen}>
        장바구니
      </Button>
    </>
  );
};

export default CartButton;
