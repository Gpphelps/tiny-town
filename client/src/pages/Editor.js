
import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import UserTool from '../components/userTool'
import { SAVE_PLOT } from '../utils/mutations'


import InputModal from '../components/InputModal'

const Editor = () => {

    const [mode, setMode] = useState('place-residential');

    const [savePlot, { error }] = useMutation(SAVE_PLOT)

    const [plotName, setPlotName] = useState('')

    const [modalDisplay, setModalDisplay] = useState('flex')

    const handlePlotSave = async () => {
        let plotX = localStorage.getItem('plotX');
        let plotZ = localStorage.getItem('plotZ');

        console.log(plotX,plotZ)

        try {
            await savePlot({
                variables: {plot_position_x: plotX, plot_position_z: plotZ}
            })
        } catch (err){
            console.log(err)
        }
    }

    const handleNameInput = (e) => {
        let value = e.target.value;
        setPlotName(value)
    }

    const renameButton = (e) => {
        setModalDisplay('flex')
    }

    return(
        <div>
            <InputModal header={"Name this Neighborhood"} inputFunction={handleNameInput} buttonText={'Submit'} display={modalDisplay} setModalDisplay={setModalDisplay} otherFunction={handlePlotSave}/>
            <p style={{display:'none'}} id="runModeProxy">editor</p>
            {/* textarea is a hidden textarea that static scripts exports the buildings to so react can use graphQL */}
            <textarea style={{display:'none'}} id='saveText'></textarea>
            <div id="canvCont"></div>
            <button onClick={renameButton}>Rename this plot</button>
            <div id="userTools">
            </div>
            <div id="userSave">
                <button onClick={handlePlotSave}>Save Plot</button>
            </div>
        </div>
    )
}


export default Editor;