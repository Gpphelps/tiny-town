import { useMutation } from '@apollo/client';
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loginUser, { error }] = useMutation(LOGIN_USER);

    const handleInput = (e) => {
        const {name, value} = e.target

        switch(name) {
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
        }

    }

    const handleFormSubmit = async (e) => {
        
        e.preventDefault();

        const { data } = await loginUser({
            variables: { email: email, password: password }
        });


        Auth.login(data.login.token)

        if (error) {
            console.log(error.message)
        }
        console.log(data)

        setEmail('');
        setPassword('');
    }

    return (
        <div className='cont'>
            <form>
                <h3>Login</h3>
                <input onChange={handleInput} name="email" placeholder="Email"></input>
                <input onChange={handleInput} name="password" placeholder="Password"></input>
                <button onClick={handleFormSubmit}>Login</button>
                <Link to="/createaccount">
                    <p>Don't have an account? Create one here</p>
                </Link>

            </form>
        </div>
    )
}



export default Login