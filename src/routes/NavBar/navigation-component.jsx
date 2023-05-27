import {Fragment} from 'react'
import { Outlet, Link } from "react-router-dom";

import {ReactComponent as EliteLogo} from '../../assets/elite.svg';
import './nav-styles.scss'

const Navigation = () => {
    return(
        <Fragment>
        <nav className='navigation'>
            <Link className="logo-container" to='/'>
                <EliteLogo className='logo' />
            </Link>
            <div className="nav-links-container">
            <Link className="nav-link" to='/shop'>SHOP</Link>
            <Link className='nav-link' to='sign-in'>SIGN IN</Link>
            </div>
        </nav>
        <Outlet />
        </Fragment>
    )
}

export default Navigation;