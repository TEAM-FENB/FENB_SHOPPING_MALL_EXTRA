import { BsFillSuitHeartFill } from 'react-icons/bs';
import { SlHandbag } from 'react-icons/sl';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
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
} from '@mantine/core';
import { requestSignout } from '../../api/fetch';
import { userState } from '../../recoil/atoms';
import { useMediaQuery } from '../../hooks';
import { getDecodeSearch } from '../../utils';
import { QUERY_KEY, MEDIAQUERY_WIDTH, PATH } from '../../constants';
import { DarkMode } from '../index';
import SearchBar from './SearchBar';

const Main = () => {
  const matches = useMediaQuery(`(min-width: ${MEDIAQUERY_WIDTH}px)`);
  const [user, setUser] = useRecoilState(userState);
  const { search: rawSearch, pathname } = useLocation();
  const { search } = getDecodeSearch(rawSearch);
  const redirectTo = `${pathname}${search}`;
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const handleSignOutClick = async () => {
    await requestSignout();
    setUser(null);
    queryClient.removeQueries(QUERY_KEY.AUTH);
    navigate(PATH.MAIN);
  };

  return (
    <Group position="apart">
      <Logo />
      {matches ? (
        <SimpleUtilArea user={user} redirectTo={redirectTo} handleSignOutClick={handleSignOutClick} />
      ) : (
        <UtilArea user={user} redirectTo={redirectTo} handleSignOutClick={handleSignOutClick} />
      )}
    </Group>
  );
};

const Logo = () => {
  const { colorScheme } = useMantineColorScheme();

  return (
    <Link to={PATH.MAIN}>
      <Image
        width="10rem"
        pl="1rem"
        src={`images/logo/${colorScheme === 'dark' ? 'darkMain' : 'main'}.svg`}
        alt="486"
      />
    </Link>
  );
};

const SimpleUtilArea = ({ user, handleSignOutClick, redirectTo }) => (
  <Stack>
    <Navbar.Section pt="xs">
      <Flex gap="lg" align="center" justify="flex-end" fz="1.3rem" color="#222222">
        {user ? (
          <>
            <Text onClick={handleSignOutClick} sx={{ cursor: 'pointer' }}>
              로그아웃
            </Text>
            <Text>{user.username}님 환영합니다.</Text>
          </>
        ) : (
          <>
            <Link key="signup" to={PATH.SIGNUP} state={redirectTo}>
              회원가입
            </Link>
            <Link key="signin" to={PATH.SIGNIN} state={redirectTo}>
              로그인
            </Link>
          </>
        )}
        <DarkMode />
      </Flex>
    </Navbar.Section>
    <Navbar.Section>
      <Flex justify="flex-end" align="center" gap="xl">
        <SearchBar />
        <Link to={PATH.WISHLIST} state={redirectTo}>
          <Tooltip label="관심상품">
            <ActionIcon size="xl">
              <BsFillSuitHeartFill size="2.8rem" color="tomato" />
            </ActionIcon>
          </Tooltip>
        </Link>
        <Link to={PATH.CART} state={redirectTo}>
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

const UtilArea = ({ user, handleSignOutClick, redirectTo }) => {
  const navigate = useNavigate();

  return (
    <Group>
      <SearchBar />
      <Menu shadow="md" width="20rem" transitionProps={{ transition: 'rotate-right', duration: 150 }}>
        <Menu.Target>
          <Avatar radius="xl" size="5rem" sx={{ cursor: 'pointer' }} />
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label fz="1.6rem" fw="bold">
            {user ? `${user.username}님 환영합니다.` : '로그인이 필요합니다.'}
          </Menu.Label>
          <Menu.Divider />
          <Menu.Item
            fz="1.6rem"
            fw="bold"
            disabled={!user}
            icon={<BsFillSuitHeartFill size="2rem" color="tomato" />}
            onClick={() => navigate(PATH.WISHLIST)}>
            관심상품
          </Menu.Item>
          <Menu.Item
            fz="1.6rem"
            fw="bold"
            disabled={!user}
            icon={<SlHandbag size="2rem" />}
            onClick={() => navigate(PATH.CART)}>
            장바구니
          </Menu.Item>
          <Menu.Divider />
          {user ? (
            <Menu.Item fz="1.6rem" fw="bold" color="red" onClick={handleSignOutClick}>
              로그아웃
            </Menu.Item>
          ) : (
            <>
              <Menu.Item
                key="signup"
                fz="1.6rem"
                fw="bold"
                onClick={() => navigate(PATH.SIGNUP, { state: redirectTo })}>
                회원가입
              </Menu.Item>
              <Menu.Item
                key="signin"
                fz="1.6rem"
                fw="bold"
                onClick={() => navigate(PATH.SIGNIN, { state: redirectTo })}>
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
