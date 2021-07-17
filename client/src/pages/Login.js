import { useMutation } from '@apollo/client';
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

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
            setErrorMessage(error.message);
        }
        

        setEmail('');
        setPassword('');
    }
    
    const textStyle = {
        color: "#2D2D29",
        fontFamily: "'VT323', monospace",
        textTransform: "uppercase",
        textAlign: "center",
        fontSize: "50px",
    };

    const loginStyle = {
        fontFamily: "'Inconsolata', monospace",
    };

    const buttonStyle = {
        fontFamily: "'Inconsolata', monospace",
        fontSize: "20px",
    };

    const pStyle = {
        fontFamily: "'Inconsolata', monospace",
        textAlign: "center",
        color: "#2D2D29",
    };

    return (
        <div className='cont'>
            <form>
                <h3 style={textStyle}>Login</h3>
                <input style={loginStyle} onChange={handleInput} name="email" placeholder="Email"></input>
                <input style={loginStyle} onChange={handleInput} name="password" placeholder="Password" type="password"></input>
                <button style={buttonStyle} onClick={handleFormSubmit}>Login</button>
                <Link to="/createaccount">
                    <p style={pStyle}>Don't have an account? Create one here</p>
                </Link>
                return (
        <div className='cont'>
            <form>
                <h3 style={textStyle}>Login</h3>
                <input style={loginStyle} onChange={handleInput} name="email" placeholder="Email"></input>
                <input style={loginStyle} onChange={handleInput} name="password" placeholder="Password" type="password"></input>
                <button style={buttonStyle} onClick={handleFormSubmit}>Login</button>
                <Link to="/createaccount">
                    <p style={pStyle}>Don't have an account? Create one here</p>
                </Link>
                {errorMessage && <div className="error"> {errorMessage} </div>}
            </form>
        </div>
    )
            </form>
        </div>
    )
}

export default Login;