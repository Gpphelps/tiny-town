import Auth from '../utils/auth';
import React, {useState} from 'react';

const Logout = () => {
    
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        Auth.logout();
    };

    const textStyle = {
        color: "#2D2D29",
        fontFamily: "'VT323', monospace",
        textTransform: "uppercase",
        textAlign: "center",
        fontSize: "50px",
    };

    const buttonStyle = {
        fontFamily: "'Inconsolata', monospace",
        fontSize: "20px",
    };

    return (
        <div className='cont'>
            <form>
            <h3 style={textStyle} >Are you sure that you want to logout?</h3>
            <button style={buttonStyle} onClick={handleFormSubmit}>Yes, log me out of Tiny Town</button>
            </form>
        </div>
    )
}

export default Logout;