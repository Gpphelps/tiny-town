import React, {useState} from 'react'


const InputModal = ({ header, inputFunction, buttonText }) => {
    
    const finished = () => {
        document.querySelector('.modal').style.display = "none"
    }
    
    return(
        <div className="modal">
            <h5>{header}</h5>
            <input onChange={inputFunction}></input>
            <button onClick={finished}>{buttonText}</button>
        </div>
    )
}


export default InputModal