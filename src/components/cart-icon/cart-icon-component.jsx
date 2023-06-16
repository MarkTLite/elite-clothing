import * as S from "./cart-icon-styles"; //S - Styled Components
import { useDispatch, useSelector } from "react-redux";
import { setIsCartOpen } from "../../store/cart/cart-reducer";
import {
  selectCartToggle,
  selectCartCount,
} from "../../store/cart/cart-selector";

const CartIcon = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectCartToggle);
  const cartCount = useSelector(selectCartCount);
  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <S.CartIconContainer onClick={toggleIsCartOpen}>
      <S.CartIcon className="shopping-icon" />
      <S.ItemCount>{cartCount}</S.ItemCount>
    </S.CartIconContainer>
  );
};

export default CartIcon;
