import { useMutation } from '@apollo/client';
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);

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
        try {
            const { data, error } = await loginUser({
                variables: { email: email, password: password }
            });

            Auth.login(data.login.token)

            if (error) {
                console.log(error.message)
            }
        }catch (err) {
            console.error(err);
            setShowAlert(true);
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
        border: "2px solid black",
        borderRadius: "2px"
    };

    const buttonStyle = {
        fontFamily: "'Inconsolata', monospace",
        fontSize: "20px",
        border: "2px solid black",
        borderRadius: "2px"
    };

    const pStyle = {
        fontFamily: "'Inconsolata', monospace",
        textAlign: "center",
        color: "#2D2D29",
    };

    const errorStyle = {
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Inconsolata', monospace",
        textAlign: "center",
        color: "red",
        fontSize: "25px",
        fontWeight: "bold",
        border: "2px solid black",
        borderRadius: "2px"
    };

    const xStyle = {
        width: "20px",
        fontFamily: "'Inconsolata', monospace",
        justifyContent: "right",
        color: "white",
        backgroundColor: "red",
        fontSize: "25px",
        fontWeight: "bold",
        textAlign: "right",
        borderRight: "1px solid black",
        borderBottom: "1px solid black",
        borderRadius: "2px",
        paddingRight: "3px"
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
                {showAlert && <div id="loginError" style={errorStyle}> <div  onClick={() => setShowAlert(false)} id="x" style={xStyle}>X</div>Could not find a user with that email or password</div>}
            </form>
        </div>
    )
}

export default Login;