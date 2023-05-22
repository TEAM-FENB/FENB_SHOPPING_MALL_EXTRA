import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import { userState } from 'recoil/atoms';

import {
  ActionIcon,
  Avatar,
  Flex,
  Group,
  Image,
  Menu,
  Navbar,
  Stack,
  Text,
  Tooltip,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import { BsFillSuitHeartFill } from 'react-icons/bs';
import { SlHandbag } from 'react-icons/sl';

import { SearchBar, DarkMode } from 'components/NavigationBar';
import { requestSignout } from 'api/fetch';
import { useMediaQuery } from 'hooks';
import { getDecodeSearch } from 'utils';
import { QUERY_KEY, MEDIAQUERY_WIDTH, PATH } from 'constants';

const Main = () => {
  const matches = useMediaQuery(`(min-width: ${MEDIAQUERY_WIDTH}px)`);

  const navigate = useNavigate();
  const { search: rawSearch, pathname } = useLocation();
  const { search } = getDecodeSearch(rawSearch);

  const queryClient = useQueryClient();

  const [user, setUser] = useRecoilState(userState);

  const handleSignOutClick = async () => {
    await requestSignout();

    setUser(null);
    queryClient.removeQueries(QUERY_KEY.AUTH);

    navigate(PATH.MAIN);
  };

  const redirectTo = `${pathname}${search}`;

  return (
    <Group position="apart">
      <Logo />
      {matches ? (
        <SimpleUtilArea handleSignOutClick={handleSignOutClick} redirectTo={redirectTo} user={user} />
      ) : (
        <UtilArea handleSignOutClick={handleSignOutClick} redirectTo={redirectTo} user={user} />
      )}
    </Group>
  );
};

const Logo = () => {
  const { colorScheme } = useMantineColorScheme();

  return (
    <Link to={PATH.MAIN}>
      <Image
        alt="486"
        pl="1rem"
        src={`images/logo/${colorScheme === 'dark' ? 'darkMain' : 'main'}.svg`}
        width="10rem"
      />
    </Link>
  );
};

const SimpleUtilArea = ({ user, handleSignOutClick, redirectTo }) => {
  const theme = useMantineTheme();

  return (
    <Stack>
      <Navbar.Section pt="xs">
        <Flex align="center" color="#222222" fz="1.3rem" gap="lg" justify="flex-end">
          {user ? (
            <>
              <Text sx={{ cursor: 'pointer' }} onClick={handleSignOutClick}>
                로그아웃
              </Text>
              <Text>{user.username}님 환영합니다.</Text>
            </>
          ) : (
            <>
              <Link key="signup" state={redirectTo} to={PATH.SIGNUP}>
                회원가입
              </Link>
              <Link key="signin" state={redirectTo} to={PATH.SIGNIN}>
                로그인
              </Link>
            </>
          )}
          <DarkMode />
        </Flex>
      </Navbar.Section>
      <Navbar.Section>
        <Flex align="center" gap="xl" justify="flex-end">
          <SearchBar />
          <Link state={redirectTo} to={PATH.WISHLIST}>
            <Tooltip label="관심상품">
              <ActionIcon size="xl">
                <BsFillSuitHeartFill color={theme.colors.red[6]} size="2.8rem" />
              </ActionIcon>
            </Tooltip>
          </Link>
          <Link state={redirectTo} to={PATH.CART}>
            <Tooltip label="장바구니">
              <ActionIcon size="xl">
                <SlHandbag size="2.8rem" />
              </ActionIcon>
            </Tooltip>
          </Link>
        </Flex>
      </Navbar.Section>
    </Stack>
  );
};

const UtilArea = ({ user, handleSignOutClick, redirectTo }) => {
  const theme = useMantineTheme();

  const navigate = useNavigate();

  const handleMoveToWishListClick = () => {
    navigate(PATH.WISHLIST);
  };

  const handleMoveToCartClick = () => {
    navigate(PATH.CART);
  };

  const handleMoveToSignUpClick = () => {
    navigate(PATH.SIGNUP, { state: redirectTo });
  };

  const handleMoveToSignInClick = () => {
    navigate(PATH.SIGNIN, { state: redirectTo });
  };

  return (
    <Group>
      <SearchBar />
      <Menu shadow="md" transitionProps={{ transition: 'rotate-right', duration: 150 }} width="20rem">
        <Menu.Target>
          <Avatar radius="xl" size="5rem" sx={{ cursor: 'pointer' }} />
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label fw="bold" fz="1.6rem">
            {user ? `${user.username}님 환영합니다.` : '로그인이 필요합니다.'}
          </Menu.Label>
          <Menu.Divider />
          <Menu.Item
            disabled={!user}
            fw="bold"
            fz="1.6rem"
            icon={<BsFillSuitHeartFill color={theme.colors.red[6]} size="2rem" />}
            onClick={handleMoveToWishListClick}>
            관심상품
          </Menu.Item>
          <Menu.Item
            disabled={!user}
            fw="bold"
            fz="1.6rem"
            icon={<SlHandbag size="2rem" />}
            onClick={handleMoveToCartClick}>
            장바구니
          </Menu.Item>
          <Menu.Divider />
          {user ? (
            <Menu.Item color="red" fw="bold" fz="1.6rem" onClick={handleSignOutClick}>
              로그아웃
            </Menu.Item>
          ) : (
            <>
              <Menu.Item key="signup" fw="bold" fz="1.6rem" onClick={handleMoveToSignUpClick}>
                회원가입
              </Menu.Item>
              <Menu.Item key="signin" fw="bold" fz="1.6rem" onClick={handleMoveToSignInClick}>
                로그인
              </Menu.Item>
            </>
          )}
        </Menu.Dropdown>
      </Menu>
      <DarkMode />
    </Group>
  );
};

export default Main;
