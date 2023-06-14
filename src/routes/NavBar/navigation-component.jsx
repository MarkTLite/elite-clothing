import { Fragment, useContext } from 'react'
import { Outlet, Link } from "react-router-dom";

import { ReactComponent as EliteLogo } from '../../assets/elite.svg';
import { signOutUser } from '../../utils/firebase/firebase-utils';
import CartIcon from '../../components/cart-icon/cart-icon-component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown-component';

import * as S from './nav-styles' //Styled Components
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user-selector';
import { selectCartToggle } from '../../store/cart/cart-selector';
import { setSignOutStart } from '../../store/user/user-actions';

const Navigation = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectCartToggle);

    const signOutHandler = () => dispatch(setSignOutStart());
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