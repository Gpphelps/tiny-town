
import React from 'react';

const InfoModal = ({message,display,setDisplay}) => {

    const style = {
        display: display
    }

    const handleExitButton = () => {
        setDisplay('none')
    }
}

export default InfoModal;