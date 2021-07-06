
import React, { useState } from 'react';

import UserTool from '../components/userTool'


const Editor = () => {

    const [mode, setMode] = useState('place-residential')

    const handleClick = (e) => {
        let value = e.currentTarget.value;
    }

    const textArea = (e) => {
        console.log(e.target);
        let textArea = document.querySelector('#saveText');
        console.log(textArea)
    }

    return(
        <div>
            {/* textarea is a hidden textarea that static scripts exports the buildings to so react can use graphQL */}
            <textarea style={{display:'none'}} id='saveText'></textarea>
            <div id="canvCont"></div>
            <div id="userTools">
            </div>
            <div id="userSave">

            </div>
        </div>
    )
}


export default Editor;