
import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import UserTool from '../components/userTool'
import { SAVE_PLOT } from '../utils/mutations'


import InputModal from '../components/InputModal'

const Editor = () => {

    const [mode, setMode] = useState('place-residential');

    const [savePlot, { error }] = useMutation(SAVE_PLOT)

    const [savedYet, setSavedYet ] = useState(false)

    const [plotName, setPlotName] = useState('')

    const [modalDisplay, setModalDisplay] = useState('flex')

    const handlePlotSave = async () => {
        let plotX = JSON.parse(localStorage.getItem('plotX'));
        let plotZ = JSON.parse(localStorage.getItem('plotZ'));

        console.log(plotX,plotZ)

        const { data } = await savePlot({
            variables: {plot_position_x: plotX, plot_position_z: plotZ}
        });

        if(error){
            console.log(error)
        }
        let plots = data.savePlot.plot;
        plots.forEach(plot => {
            if(plotX == plot.plot_position_x && plotZ == plot.plot_position_z){
                localStorage.setItem('currentPlot',plot._id)
            }
        })
    }

    const handleBuildingSave = async () => {

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
            <InputModal header={"Name this Neighborhood"} inputFunction={handleNameInput} buttonText={'Submit'} display={modalDisplay} setModalDisplay={setModalDisplay} otherFunction={handlePlotSave} savedYet={savedYet} setSavedYet={setSavedYet}/>
            <p style={{display:'none'}} id="runModeProxy">editor</p>
            {/* textarea is a hidden textarea that static scripts exports the buildings to so react can use graphQL */}
            <textarea style={{display:'none'}} id='saveText'></textarea>
            <div id="canvCont"></div>
            <button onClick={renameButton}>Rename this plot</button>
            <div id="userTools">
            </div>
            <div id="userSave">
                <button onClick={handleBuildingSave}>Save Plot</button>
            </div>
        </div>
    )
}


export default Editor;