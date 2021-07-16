
import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import UserTool from '../components/userTool'
import { SAVE_PLOT } from '../utils/mutations'


import InputModal from '../components/InputModal'
import Tip from '../components/Tip'

const Editor = () => {

    const [mode, setMode] = useState('place-residential');

    const [savePlot, { plotError }] = useMutation(SAVE_PLOT)

    const [savedYet, setSavedYet ] = useState(false)

    const [plotName, setPlotName] = useState('')

    const [modalDisplay, setModalDisplay] = useState('flex')

    const [tipPosition, setTipPosition] = useState({top:0,left:0})
    const [tipDisplay, setTipDisplay] =  useState('none')
    const [tipOver, setTipOver] = useState('none')

    //gets plotX and plotZ data from local storage
        //saves new plot, SAVE_PLOT resolver returns the entire user
        //iterates through all of the users plots to find the one with the same x and z coords and saves that plots id for later
    const handlePlotSave = async () => {
        let plotX = JSON.parse(localStorage.getItem('plotX'));
        let plotZ = JSON.parse(localStorage.getItem('plotZ'));

        console.log(plotX,plotZ)

        let buildingData = document.querySelector('#saveText').value

        const { data } = await savePlot({
            variables: {plot_position_x: plotX, plot_position_z: plotZ, buildings: buildingData, plotName: plotName}
        });

        console.log(data)
        if(plotError){
            console.log(plotError)
        }

        let plots = data.savePlot.plot;
        plots.forEach(plot => {
            if(plotX == plot.plot_position_x && plotZ == plot.plot_position_z){
                localStorage.setItem('currentPlot',plot._id)
            }
        })
    }

    const handleBuildingSave = async () => {
        //retrieves exported building data stored in dom element from static scripts
        let cityEngineData = document.querySelector('#saveText').value
        console.log(cityEngineData)
    }

    const handleNameInput = (e) => {
        let value = e.target.value;
        setPlotName(value)
    }

    const renameButton = (e) => {
        setModalDisplay('flex')
    }



    const handleHover = (e) => {
        setTipPosition({top:e.clientY+20,left:e.clientX+20})
    }

    const tipIsOver = (e) => {

    }

    return(
        <div onMouseMove={handleHover}>
            {/* <InputModal header={"Name this Neighborhood"} inputFunction={handleNameInput} buttonText={'Submit'} display={modalDisplay} setModalDisplay={setModalDisplay} otherFunction={handlePlotSave} savedYet={savedYet} setSavedYet={setSavedYet}/> */}
            <div>
                <p style={{display:'none'}} id="runModeProxy">editor</p>
                <textarea style={{display:'none'}} id='saveText'></textarea>
                <textarea style={{display:'none'}} id='edgeRoadBoolean'></textarea>
            </div>

            <div id="canvCont">

            </div>
            <button onClick={renameButton}>Rename this plot</button>
            <div onMouseMove={tipIsOver} id="userTools">
            </div>
            <div id="userSave">
                <button onClick={handlePlotSave}>Save Plot</button>
            </div>
        </div>
    )
}


export default Editor;