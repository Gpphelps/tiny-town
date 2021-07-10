import React, {useState, useEffect} from 'react'


const InputModal = ({ header, inputFunction, buttonText, display, setModalDisplay }) => {
    
    const style = {
        container: {
            display: display
        }
    }

    
    const submitName = () => {
        setModalDisplay('none')
    }

    return(
        <div style={style.container} className="modalCont">
            <div className="modal">
                <h5>{header}</h5>
                <input onChange={inputFunction}></input>
                <button onClick={submitName}>{buttonText}</button>
            </div>
        </div>

    )
}


export default InputModal