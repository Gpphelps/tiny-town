
import React from 'react';

const InfoModal = ({message,display,setDisplay,top,left,title,errorMode}) => {

    const style = {
        display: display,
        top: top,
        left: left,

    }

    if(errorMode){
        style.backgroundColor = 'rgba(255,0,0,0.3)';
    }

    const handleExitButton = () => {
        setDisplay('none')
    }

    return (
        <div style={style} className="infoModalCont">
            <div>
                <h5>{title}</h5>
                <h5 onClick={handleExitButton}>X</h5>
            </div>
            <p>{message}</p>
        </div>
    )
}

export default InfoModal;