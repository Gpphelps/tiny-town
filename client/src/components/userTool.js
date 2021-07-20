import React from 'react';

const UserTool = ({click,value,name}) => {

    return (
        <button onClick={click} value={value}>{name}
        {/* <span className='tooltiptext'>"hello"</span> */}
        </button>
    )
};

export default UserTool;