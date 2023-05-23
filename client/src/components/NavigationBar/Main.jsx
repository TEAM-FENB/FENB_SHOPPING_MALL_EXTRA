import { forwardRef, useEffect, useState } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';

import {
  ActionIcon,
  Autocomplete,
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
import { useDebouncedValue } from '@mantine/hooks';
import { BiSearch } from 'react-icons/bi';
import { BsFillSuitHeartFill } from 'react-icons/bs';
import { SlHandbag } from 'react-icons/sl';

import { requestSignout } from '../../api/fetch';
import { AUTH_QUERY_KEY, MEDIAQUERY_WIDTH, PATH } from '../../constants';
import { useMediaQuery } from '../../hooks';
import { useSearchProducts } from '../../hooks/products';
import { userState } from '../../recoil/atoms';
import { getDecodeSearch } from '../../utils/location';
import { DarkMode } from '../index';

const AutoCompleteItem = forwardRef(({ value, id, onMouseDown, ...rest }, ref) => {
  const navigate = useNavigate();

  const handleMouseDown = e => {
    onMouseDown(e);
    // Link component? navigate function call?
    navigate(`${PATH.PRODUCTS}/${id}`);
  };

  return (
    <Text ref={ref} value={value} onMouseDown={handleMouseDown} {...rest}>
      {value}
    </Text>
  );
});

const SearchBar = () => {
  const { searchProducts } = useSearchProducts();
  const [searchInput, setSearchInput] = useState('');
  const [debounced] = useDebouncedValue(searchInput, 200);
  const { search: rawSearch, pathname } = useLocation();
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    document.activeElement.blur();

    navigate(`${PATH.CATEGORY}?search=${searchInput}`);
  };

  useEffect(() => {
    const { search, searchValue } = getDecodeSearch(rawSearch);
    setSearchInput(pathname.includes('category') && search.includes('search') ? searchValue : '');
  }, [rawSearch, setSearchInput, pathname]);

  return (
    <form onSubmit={handleSubmit}>
      <Autocomplete
        data={searchProducts}
        icon={<BiSearch size="2rem" />}
        itemComponent={AutoCompleteItem}
        nothingFound={<Text>검색결과가 없습니다.</Text>}
        placeholder="상품 검색"
        radius="xl"
        size="xl"
        value={searchInput}
        filter={(_, item) =>
          item.value.toLowerCase().includes(debounced.toLowerCase().trim()) ||
          item.brand.en.toLowerCase().includes(debounced.toLowerCase().trim()) ||
          item.brand.kr.toLowerCase().includes(debounced.toLowerCase().trim()) ||
          item.category.kr.toLowerCase().includes(debounced.toLowerCase().trim()) ||
          item.category.en.toLowerCase().includes(debounced.toLowerCase().trim())
        }
        onChange={setSearchInput}
      />
    </form>
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

const SimpleUtilArea = ({ user, handleSignOutClick, redirectTo }) => (
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
              <BsFillSuitHeartFill color="tomato" size="2.8rem" />
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

const UtilArea = ({ user, handleSignOutClick, redirectTo }) => {
  const navigate = useNavigate();

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
            icon={<BsFillSuitHeartFill color="tomato" size="2rem" />}
            onClick={() => navigate(PATH.WISHLIST)}>
            관심상품
          </Menu.Item>
          <Menu.Item
            disabled={!user}
            fw="bold"
            fz="1.6rem"
            icon={<SlHandbag size="2rem" />}
            onClick={() => navigate(PATH.CART)}>
            장바구니
          </Menu.Item>
          <Menu.Divider />
          {user ? (
            <Menu.Item color="red" fw="bold" fz="1.6rem" onClick={handleSignOutClick}>
              로그아웃
            </Menu.Item>
          ) : (
            <>
              <Menu.Item
                key="signup"
                fw="bold"
                fz="1.6rem"
                onClick={() => navigate(PATH.SIGNUP, { state: redirectTo })}>
                회원가입
              </Menu.Item>
              <Menu.Item
                key="signin"
                fw="bold"
                fz="1.6rem"
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

const Main = () => {
  const matches = useMediaQuery(`(min-width: ${MEDIAQUERY_WIDTH}px)`);
  const [user, setUser] = useRecoilState(userState);
  const { search: rawSearch, pathname, state } = useLocation();
  const { search } = getDecodeSearch(rawSearch);
  const redirectTo = pathname === PATH.SIGNIN || pathname === PATH.SIGNUP ? state : `${pathname}${search}`;
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const handleSignOutClick = async () => {
    await requestSignout();
    setUser(null);
    queryClient.removeQueries(AUTH_QUERY_KEY);
    navigate(PATH.MAIN);
  };

  return (
    <Group position="apart">
      <Logo />
      {/* 모바일 UI먼저? PC UI 먼저? */}
      {matches ? (
        <SimpleUtilArea handleSignOutClick={handleSignOutClick} redirectTo={redirectTo} user={user} />
      ) : (
        <UtilArea handleSignOutClick={handleSignOutClick} redirectTo={redirectTo} user={user} />
      )}
    </Group>
  );
};

export default Main;
