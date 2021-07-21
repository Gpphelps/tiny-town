
import React from 'react';

const InfoModal = ({message,display,setDisplay}) => {

    const style = {
        display: display
    }

    const handleExitButton = () => {
        setDisplay('none')
    }

    return (
        <div className="infoModalCont">
            <div>
                <h5>INFO</h5>
                <p onClick={handleExitButton}>X</p>
            </div>
            <p>{message}</p>
        </div>
    )
}

export default InfoModal;