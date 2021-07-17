import React from 'react';
import ReactTooltip from 'react-tooltip';

const UserTool = ({click,value,name}) => {

    return (
        <button onClick={click} value={value}>{name}</button>
    )
}

export default UserTool;