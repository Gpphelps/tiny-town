
import React from 'react';

const InfoModal = ({message,display,setDisplay}) => {

    const style = {
        display: display
    }

    const handleExitButton = () => {
        setDisplay('none')
    }

    return (
        <div>
            <p>{message}</p>
        </div>
    )
}

export default InfoModal;