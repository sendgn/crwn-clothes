import { Outlet, Link } from 'react-router-dom';
import { useContext } from 'react';

import './navigation.styles.scss';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { UserContext } from '../../contexts/user.context';

const Navigation = () => {
    const { currentUser } = useContext(UserContext);

    return (
        <>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <CrwnLogo className='logo' />
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/shop'>
                        SHOP
                    </Link>
                    <Link className='nav-link' to='/auth'>
                        {`${currentUser ? 'SIGN OUT' : 'SIGN IN'}`}
                    </Link>
                </div>
            </div>
            <Outlet />
        </>
    );
}

export default Navigation;
