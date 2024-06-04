import styled from '@emotion/styled';
import { Container } from './layouts/GlobalLayout/style';

import { useContext, useRef } from 'react';

import Header from './components/common/Header';
import Main from './components/common/Main';
import Dropdown from './components/common/Dropdown';
import Title from './components/common/Title';
import Loading from './components/common/Loading';

import CartButton from './components/CartButton';
import HomeButton from './components/HomeButton';
import ProductsContainer from './components/ProductsContainer';
import FilterContainer from './components/FilterContainer';
import ProductsContent from './components/ProductsContent';
import ProductItem from './components/ProductItem';

import useFetchProducts from './hooks/useFetchProducts';

import { CartItemsContext } from './context/CartItemProvider';

import { CATEGORIES, PRICE_SORT } from './constants/filter';
import { Category, Order } from './types/product';
import useIntersectionObserver from './hooks/useIntersectionObserver';

function App() {
  const observerRef = useRef<HTMLDivElement | null>(null);
  const { cartItems } = useContext(CartItemsContext);
  const { products, category, sort, loading, error, fetchNextPage, filterByCategory, setSorting } =
    useFetchProducts();

  const selectedCategoryOption = CATEGORIES.find(({ value }) => value === category)!.label;
  const selectedSortOption = PRICE_SORT.find(({ value }) => value === sort.price)!.label;

  const handleCategoryChange = (option: Category) => {
    filterByCategory(option);
  };

  const handlePriceSortChange = (option: Order) => {
    setSorting('price', option);
  };

  useIntersectionObserver({ loading, error }, observerRef, fetchNextPage, { threshold: 0.8 });

  return (
    <Container>
      <Header>
        <HomeButton onClick={() => {}} />
        <CartButton count={cartItems.length} onClick={() => {}} />
      </Header>
      <Main>
        <ProductsContainer>
          <Title />
          <FilterContainer>
            <Dropdown
              options={CATEGORIES}
              selectedOption={selectedCategoryOption}
              optionChange={handleCategoryChange}
            />
            <Dropdown
              options={PRICE_SORT}
              selectedOption={selectedSortOption}
              optionChange={handlePriceSortChange}
            />
          </FilterContainer>
          <ProductsContentContainer>
            <ProductsContent>
              {products.map((product) => (
                <ProductItem
                  key={product.id}
                  cartItemId={cartItems.find((cartItem) => product.id === cartItem.product.id)?.id}
                  {...product}
                />
              ))}
              <div ref={observerRef} id="observer" style={{ height: '10px' }}></div>
            </ProductsContent>
            {loading && <Loading />}
          </ProductsContentContainer>
        </ProductsContainer>
      </Main>
    </Container>
  );
}

export default App;

const ProductsContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  overflow-y: scroll;
`;
