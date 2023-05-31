import { Fragment, useContext } from 'react'
import { Outlet, Link } from "react-router-dom";

import { ReactComponent as EliteLogo } from '../../assets/elite.svg';
import { UserContext } from '../../contexts/user-context';
import { CartContext } from '../../contexts/cart-context';
import { signOutUser } from '../../utils/firebase/firebase-utils';
import CartIcon from '../../components/cart-icon/cart-icon-component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown-component';

import * as S from './nav-styles' //Styled Components

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);

    const signOutHandler = async () => {
        await signOutUser();
    }
    return (
        <Fragment>
            <S.Navigation>
                <S.LogoContainer to='/'>
                    <EliteLogo className='logo' />
                </S.LogoContainer>
                <S.NavLinksContainer>
                    <S.NavLink to='/shop'>
                        SHOP
                    </S.NavLink>
                    {
                        currentUser 
                        ? 
                        <S.NavLink as={'span'} onClick={signOutHandler}>
                            SIGN OUT
                        </S.NavLink> 
                        :
                        <S.NavLink to='/auth'>
                        SIGN IN
                        </S.NavLink>
                    }
                    <CartIcon />
                </S.NavLinksContainer>
                {isCartOpen && <CartDropdown/>}
            </S.Navigation>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;