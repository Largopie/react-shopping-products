import * as S from './style';

import { useContext, useEffect, useState } from 'react';
import { CartItemsContext } from '../../context/CartItemProvider';

import { ADD_TO_CART, REMOVE_TO_CART } from '../../assets/images';

import Spinner from '../common/Spinner';

interface ProductItemProps {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  cartItemId: number | undefined;
}

const ProductItem = ({ id, imageUrl, name, price, cartItemId }: ProductItemProps) => {
  const { addCart, deleteCart } = useContext(CartItemsContext);
  const [loading, setLoading] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  const TOGGLE_BUTTON_ICON = isInCart ? REMOVE_TO_CART : ADD_TO_CART;
  const BUTTON_TEXT = isInCart ? '빼기' : '담기';

  const onToggle = async () => {
    setLoading(true);
    if (cartItemId) {
      try {
        await deleteCart(cartItemId);
        setIsInCart(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        await addCart(id);
        setIsInCart(true);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    setIsInCart(Boolean(cartItemId));
  }, [cartItemId]);

  return (
    <S.ProductItem>
      <S.Image src={imageUrl} alt={name + '상품 사진'} />
      <S.InformationContainer>
        <S.Information>
          <S.Name>{name}</S.Name>
          <S.Price>{price.toLocaleString('ko-KR')}원</S.Price>
        </S.Information>
        <S.ButtonContainer>
          <S.ToggleButton
            disabled={loading}
            $loading={loading}
            onClick={onToggle}
            $isInCart={isInCart}
          >
            {loading ? (
              <Spinner isInCart={isInCart} />
            ) : (
              <>
                <S.ButtonImage src={TOGGLE_BUTTON_ICON} />
                <span>{BUTTON_TEXT}</span>
              </>
            )}
          </S.ToggleButton>
        </S.ButtonContainer>
      </S.InformationContainer>
    </S.ProductItem>
  );
};

export default ProductItem;
