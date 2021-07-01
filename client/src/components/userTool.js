import React from 'react';

const UserTool = ({click,value,name}) => {

    return (
        <button onClick={click} value={value}>{name}</button>
    )
}

export default UserTool;