import Button from "../button/button-component";
import CartItem from "../cart-item/cart-item-component";
import { useNavigate } from "react-router";

import * as S from "./cart-dropdown-styles"; //Styled Components
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart-selector";

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  const goToCheckout = () => navigate("/checkout");

  return (
    <S.CartDropdownContainer>
      <S.CartItems>
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))
        ) : (
          <S.EmptyMessage>Your cart is empty</S.EmptyMessage>
        )}
      </S.CartItems>
      <Button onClick={goToCheckout}>CHECKOUT</Button>
    </S.CartDropdownContainer>
  );
};

export default CartDropdown;
