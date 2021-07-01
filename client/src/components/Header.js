
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return(
        <header>
            <Link to="/">
                <h1>Tiny Town!</h1>
            </Link>
            <div>
                <Link to="/login">
                    <h3>Login</h3>
                </Link>
            </div>

        </header>
    )
}

export default Header;