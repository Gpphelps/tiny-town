
import React from 'react';

const InfoModal = ({message,display,setDisplay}) => {

    const style = {
        display: display
    }

    const handleExitButton = () => {
        setDisplay('none')
    }

    return (
        <div style={style} className="infoModalCont">
            <div>
                <h5>INFO</h5>
                <h5 onClick={handleExitButton}>X</h5>
            </div>
            <p>{message}</p>
        </div>
    )
}

export default InfoModal;