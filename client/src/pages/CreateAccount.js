import { useMutation } from '@apollo/client';
import { tsRestType } from '@babel/types';
import React, { useState } from 'react';
import { ADD_USER } from '../utils/mutations'
import Auth from '../utils/auth';
import ReCAPTCHA from "react-google-recaptcha";

const siteKey = process.env.SITE_KEY

const CreateAccount = () => {

    
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [addUser, { error }] = useMutation(ADD_USER);

    const handleInput = (e) => {
        const { name, value } = e.target

        switch (name) {
            case 'email':
                setEmail(value);
                break;
            case 'username':
                setUsername(value);
                break;
            case 'password':
                setPassword(value);
                break;
        }

    }

    const handleFormSubmit = async (e) => {

        e.preventDefault();


        const { data } = await addUser({
            variables: { username: username, email: email, password: password }
        });

        Auth.login(data.addUser.token);

        if (error) {
            console.log(error.message)
        }


        setEmail('')
        setUsername('')
        setPassword('')
    }

    function onChange(value) {
        console.log("Captcha value:", value);
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

    return (
        <div className='cont'>
            <form>
                <h3 style={textStyle}>Create New Account</h3>
                <input style={loginStyle} onChange={handleInput} name="email" placeholder="Email"></input>
                <input style={loginStyle} onChange={handleInput} name="username" placeholder="Username"></input>
                <input style={loginStyle} onChange={handleInput} name="password" placeholder="Password" type="password"></input>
                <button style={buttonStyle} onClick={handleFormSubmit}>Sign Up</button>
                <ReCAPTCHA
                    sitekey="6LeLISQcAAAAAPKFBlBuufjv27p6GDalCPPXEPR1"
                    onChange={onChange}
                />
            </form>
        </div>
    )
}

export default CreateAccount;