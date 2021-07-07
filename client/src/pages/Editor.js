
import React, { useState } from 'react';

import UserTool from '../components/userTool'


const Editor = () => {

    const [mode, setMode] = useState('place-residential');

    const save = () => {
        if(document.querySelector('#saveText').value.length >= 2);{
            console.log('long enough')
            let data = JSON.parse(document.querySelector('#saveText').value);
        }

    }


    return(
        <div>
            <p style={{display:'none'}} id="runModeProxy">editor</p>
            {/* textarea is a hidden textarea that static scripts exports the buildings to so react can use graphQL */}
            <textarea style={{display:'none'}} id='saveText'></textarea>
            <div id="canvCont"></div>
            <div id="userTools">
            </div>
            <div id="userSave">
                <button onClick={save}>Save Plot</button>
            </div>
        </div>
    )
}


export default Editor;