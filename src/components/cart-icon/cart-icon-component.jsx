
import { useContext } from 'react';
import * as S from './cart-icon-styles'; //S - Styled Components
import { CartContext } from '../../contexts/cart-context';


const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

    return (
        <S.CartIconContainer onClick={toggleIsCartOpen}>
            <S.CartIcon className='shopping-icon' />
            <S.ItemCount>{cartCount}</S.ItemCount>
        </S.CartIconContainer>
    )
}

export default CartIcon;