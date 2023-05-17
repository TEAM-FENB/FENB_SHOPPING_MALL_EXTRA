import { forwardRef, useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { useLocation, useNavigate } from 'react-router-dom';
import { Autocomplete, Text } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useSearchProducts } from '../../hooks/products';
import { getDecodeSearch } from '../../utils';
import { PATH } from '../../constants';

const SearchBar = () => {
  const searchProducts = useSearchProducts();
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
        size="xl"
        icon={<BiSearch size="2rem" />}
        placeholder="상품 검색"
        data={searchProducts}
        radius="xl"
        itemComponent={AutoCompleteItem}
        value={searchInput}
        onChange={setSearchInput}
        filter={(_, item) =>
          item.value.toLowerCase().includes(debounced.toLowerCase().trim()) ||
          item.brand.en.toLowerCase().includes(debounced.toLowerCase().trim()) ||
          item.brand.kr.toLowerCase().includes(debounced.toLowerCase().trim()) ||
          item.category.kr.toLowerCase().includes(debounced.toLowerCase().trim()) ||
          item.category.en.toLowerCase().includes(debounced.toLowerCase().trim())
        }
        nothingFound={<Text>검색결과가 없습니다.</Text>}
      />
    </form>
  );
};

const AutoCompleteItem = forwardRef(({ value, id, onMouseDown, ...rest }, ref) => {
  const navigate = useNavigate();

  const handleMouseDown = e => {
    onMouseDown(e);
    navigate(`${PATH.PRODUCTS}/${id}`);
  };

  return (
    <Text ref={ref} onMouseDown={handleMouseDown} value={value} {...rest}>
      {value}
    </Text>
  );
});

export default SearchBar;
