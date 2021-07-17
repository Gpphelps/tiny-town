import React, {useState} from 'react';


const Modal = ({message,display,setDisplay}) => {

    const style = {
        display: display
    }

    const handleExitButton = () => {
        setDisplay('none')
    }

    return(
        <div style={style} className="modalCont">
            <div className="modal">
                <div className="modalHeader">
                    <div className="flexSpacer"></div>
                    <button onMouseDown={handleExitButton} className="modalQuit">X</button>
                </div>
                <p>{message}</p>
            </div>
        </div>
    )

}

export default Modal;