
import { useContext } from 'react';
import { ReactComponent as CartSvg } from '../../assets/shopping-bag.svg';
import './cart-icon-styles.scss';
import { CartContext } from '../../contexts/cart-context';

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen } = useContext(CartContext);
    console.log(isCartOpen);
    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
    return (
        <div className='cart-icon-container' onClick={toggleIsCartOpen}>
            <CartSvg className='shopping-icon' />
            <span className='item-count'>0</span>
        </div>
    )
}

export default CartIcon;