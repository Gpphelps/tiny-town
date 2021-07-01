
import React, { useState } from 'react';

import UserTool from '../components/userTool'


const Editor = () => {

    const [mode, setMode] = useState('place-residential')

    const handleClick = (e) => {
        let value = e.currentTarget.value;
    }

    return(
        <div>
            <div id="canvCont"></div>
            <div id="userTools">
            </div>
        </div>
    )
}


export default Editor;