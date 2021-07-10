
import React from 'react';
import { Link } from 'react-router-dom';

import {useQuery} from '@apollo/client';
import { GET_ME } from '../utils/queries';


const Header = () => {



    return(
        <header>
            <Link to="/">
                <h1>Tiny Town</h1>
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