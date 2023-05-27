import { useEffect, useMemo, useState } from 'react';

import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { Container, Flex } from '@mantine/core';

import { FiltersContainer, Header, ResultProducts } from 'components/Category';
import { filteredProductsQuery } from 'api/query';
import { useMediaQuery } from 'hooks';
import { filteredProducts, getDecodeSearch, sortProducts, setSessionStorage, getSessionStorage } from 'utils';
import { MEDIAQUERY_WIDTH, FILTER, SESSION_KEY } from 'constants';

const { PRICES, SIZES, COLORS, GENDER, BRANDS } = FILTER;

const INITIAL_FILTERS = {
  priceFilters: Array.from({ length: PRICES.length }, () => false),
  sizeFilters: Array.from({ length: SIZES.length }, () => false),
  colorFilters: Array.from({ length: COLORS.length }, () => false),
  genderFilters: Array.from({ length: GENDER.length }, () => false),
  brandFilters: Array.from({ length: BRANDS.length }, () => false),
};

const INITIAL_SORT = 'favorite';

const Category = () => {
  const matches = useMediaQuery(`(min-width: ${MEDIAQUERY_WIDTH}px)`);

  const { search: rawSearch } = useLocation();
  const { search, searchValue } = getDecodeSearch(rawSearch);
  const { data: products } = useQuery(filteredProductsQuery(search, searchValue));

  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [sortOption, setSortOption] = useState(INITIAL_SORT);

  const newProducts = useMemo(
    () => sortProducts(filteredProducts(products, filters), sortOption),
    [products, filters, sortOption]
  );

  const handleResetFiltersClick = () => {
    setFilters(INITIAL_FILTERS);
    setSortOption(INITIAL_SORT);

    setSessionStorage(SESSION_KEY.FILTERS, INITIAL_FILTERS);
    setSessionStorage(SESSION_KEY.SORT_OPTION, INITIAL_SORT);
  };

  const handleSelectSortOptionClick = selectedSortOption => {
    setSortOption(selectedSortOption);

    setSessionStorage(SESSION_KEY.SORT_OPTION, selectedSortOption);
  };

  const handleCheckFiltersClick =
    ({ rangeIdx, size, color, gender, brand }) =>
    () => {
      const newFilters = {
        priceFilters: filters.priceFilters.map((filter, i) => (rangeIdx === PRICES[i].rangeIdx ? !filter : filter)),
        sizeFilters: filters.sizeFilters.map((filter, i) => (size === SIZES[i] ? !filter : filter)),
        colorFilters: filters.colorFilters.map((filter, i) => (color === COLORS[i].en ? !filter : filter)),
        genderFilters: filters.genderFilters.map((filter, i) => (gender === GENDER[i].en ? !filter : filter)),
        brandFilters: filters.brandFilters.map((filter, i) => (brand === BRANDS[i].en ? !filter : filter)),
      };

      setFilters({ ...filters, ...newFilters });

      setSessionStorage(SESSION_KEY.FILTERS, { ...filters, ...newFilters });
    };

  useEffect(() => {
    setSortOption(getSessionStorage(SESSION_KEY.SORT_OPTION) ?? sortOption);
    setFilters(getSessionStorage(SESSION_KEY.FILTERS) ?? filters);
  }, [filters, sortOption]);

  return (
    <Container left="0" size="150rem" top="0">
      <Header
        handleSelectSortOptionClick={handleSelectSortOptionClick}
        productCount={newProducts.length}
        searchValue={searchValue}
        sortOption={sortOption}
      />

      <Flex direction={matches ? 'row' : 'column'}>
        <FiltersContainer
          filters={filters}
          handleCheckFiltersClick={handleCheckFiltersClick}
          handleResetFiltersClick={handleResetFiltersClick}
        />
        <ResultProducts cols={matches ? 3 : 2} products={newProducts} />
      </Flex>
    </Container>
  );
};

export default Category;
