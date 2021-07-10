import { useMutation } from '@apollo/client';
import { tsRestType } from '@babel/types';
import React,{useState} from 'react';
import {ADD_USER} from '../utils/mutations'

const CreateAccount = () => {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [addUser, { error }] = useMutation(ADD_USER);

    const handleInput = (e) => {
        const {name, value} = e.target

        switch(name) {
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
            variables:{ username: username, email: email, password: password}
        });

        console.log(data)
        if (error) {
            console.log(error.message)
        }


        setEmail('')
        setUsername('')
        setPassword('')
    }

    return (
        <div className='cont'>
            <form>
                <h3>Create New Account</h3>
                <input onChange={handleInput} name="email" placeholder="Email"></input>
                <input onChange={handleInput} name="username" placeholder="Username"></input>
                <input onChange={handleInput} name="password" placeholder="Password"></input>
                <button onClick={handleFormSubmit}>Sign Up</button>
            </form>
        </div>
    )
}

export default CreateAccount;