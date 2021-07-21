import { useMutation } from '@apollo/client';
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const [ loginUser ] = useMutation(LOGIN_USER);

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
            console.log(err);
            setShowAlert(true);
        }

        

        setEmail('');
        setPassword('');
    }
    
    const textStyle = {
        color: "#2D2D29",
        fontFamily: "'Chakra Petch', sans-serif",
        // textTransform: "lowercase",
        textAlign: "center",
        fontSize: "32px",
        fontWeight: "600",
    };

    const loginStyle = {
        border: "1px solid black",
        borderRadius: "5px",
        fontFamily: "'Chakra Petch', sans-serif",
        textTransform: "lowercase",
        backgroundColor: "rgb(50,50,50)",
        color: "#94e8ff",
    };

    const buttonStyle = {
        fontFamily: "'Chakra Petch', sans-serif",
        fontFamily: "Helvetica",
        fontWeight: 100,
        textTransform: "lowercase",
        fontSize: "20px",
        border: "2px solid black",
        borderRadius: "5px"
        // backgroundColor: '#7DC287',
        // borderRadius: '5px',
    };

    const pStyle = {
        fontFamily: "'Chakra Petch', sans-serif",
        textTransform: "lowercase",
        textAlign: "center",
        fontWeight: "300",
        color: "#2D2D29",
    };

    const errorStyle = {
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Chakra Petch', sans-serif",
        textTransform: "lowercase",
        textAlign: "center",
        color: "white",
        fontWeight: "300",
        fontSize: "14px",
        backgroundColor: "red",
        borderRadius: "10px",
        padding: "10px",

    };

    const xStyle = {
        border: "none",
        backgroundColor: "white",
        borderRadius: "5px",
        color: "red",
        maxWidth: "20px"

    };

    const bkgStyle = {
        backgroundColor: "#94e8ff"
    }

    return (
        <div className='cont'>
            <form>
                <h3 style={textStyle}>Login</h3>
                <input style={loginStyle} onChange={handleInput} name="email" placeholder="Email"></input>
                <input style={loginStyle} onChange={handleInput} name="password" placeholder="Password" type="password"></input>
                <button style={buttonStyle} onClick={handleFormSubmit}>Login</button>
                {showAlert && <div id="loginError" style={errorStyle}> <div  onClick={() => setShowAlert(false)} id="x" style={xStyle}>X</div>**Could not find a user with that email and/or password**</div>}
                <Link to="/createaccount">
                    <p style={pStyle}>Don't have an account? Create one here</p>
                </Link>
            </form>
        </div>
    )
}

export default Login;