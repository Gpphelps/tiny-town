
import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className='cont'>
            <form>
                <h3>Login</h3>
                <input placeholder="Username"></input>
                <input placeholder="Password"></input>
                <button>Login</button>
                <Link to="/createaccount">
                    <p>Don't have an account? Create one here</p>
                </Link>

            </form>
        </div>
    )
}



export default Login