
import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';

import {useQuery} from '@apollo/client';
import { GET_ME } from '../utils/queries';


const Header = () => {

    const { loading, error, data, refetch } = useQuery(GET_ME);

    useEffect(() => {
        refetch();
    },[refetch]);


    const userData = data?.me;
    console.log(userData)

    return(
        <header>
            <Link to="/">
                <h1>Tiny Town</h1>
            </Link>
            <div>
                {
                    userData ? 
                        <h3></h3> :

                        <Link to="/login">
                            <h3>Login</h3>
                        </Link>
                }

            </div>

        </header>
    )
}

export default Header;