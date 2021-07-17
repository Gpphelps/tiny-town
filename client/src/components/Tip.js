import React, {useState} from 'react'



const Tip = ({ position }) =>{

    const style = {
        tip: {
            top: position.top,
            left: position.left,
        }
    }

    return(

        <div style={style.tip} className="tipContainer">
            <p className="tipText">Hey there</p>
        </div>
    )
}


export default Tip