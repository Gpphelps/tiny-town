
import React, {useState} from 'react';
import { useQuery, useMutation } from '@apollo/client';
import PlotPopUp from '../components/PlotPopUp';


const Home = () => {


    //HERE WILL BE ALL PLOTS QUERY 
    //textarea text content will immedietly be set to the data from the query

    const handleButton = (e) => {
        console.log('HEY')
        console.log(e.target)

        let id = e.target.getAttribute('id');

        //city engine scripts store the new plot coords in local storage
        let newX = localStorage.getItem('plotX')
        let newZ = localStorage.getItem('plotZ')
        console.log(newX,newZ)

    }

    const handleDivClick = (e) => {
        console.log('yuh')
        setPopupX(e.clientX)
        setPopupY(e.clientY)
        setPopupDisplay('flex')
    }


    const [ popupDisplay, setPopupDisplay ] = useState('none')
    const [ popupX, setPopupX ] = useState(0)
    const [ popupY, setPopupY ] = useState(0)

    console.log(PlotPopUp)

    return (
        <div>
            <textarea style={{display:'none'}} id="plotData"></textarea>
            <p style={{display:'none'}} id="runModeProxy">city</p>
            <PlotPopUp handleButton={handleButton} popupX={popupX} popupY={popupY} display={popupDisplay}/>
            <div onClick={handleDivClick}  id="canvCont"></div>
        </div>
    )
}

export default Home;