import React,{useState} from 'react';
import {ADD_USER} from '../utils/mutations'

const CreateAccount = () => {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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

    const handleFormSubmit = (e) => {
        e.preventDefault();


        

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
                <button>Sign Up</button>
            </form>
        </div>
    )
}

export default CreateAccount;