
import React, {useState, useEffect} from 'react';
import { useQuery, useMutation } from '@apollo/client';
import PlotPopUp from '../components/PlotPopUp';
import {GET_CITY} from '../utils/queries'
import InfoModal from '../components/InfoModal';

const Home = () => {


    //HERE WILL BE ALL PLOTS QUERY 
    //textarea text content will immedietly be set to the data from the query
    const { data } = useQuery(GET_CITY)

    // if (data !== undefined) {
    //     let i =0;
    //     for (i = 0; i < data.city[0].plot.length; i++) {
    //         console.log(data.city[0].plot[i].plotName);
    //     }
    // }
    
    let string = JSON.stringify(data)
 
    useEffect(() => {
        document.querySelector('#plotData').value = string
    })

    const [infoModalDisplay,setInfoModalDisplay] = useState('block');

    const handleInfoModalExit = () => {
        setInfoModalDisplay('none')
    }

    const infoText = "Double Click on any neighborhood that you would like to build next to."

    return (
        <div className="canvasParent">
            <textarea style={{display:'none'}} id="plotData"></textarea>
            <p style={{display:'none'}} id="runModeProxy">city</p>
            <InfoModal message={infoText} display={infoModalDisplay} setDisplay={setInfoModalDisplay} />
            <PlotPopUp />
            <div id="canvCont"></div>
        </div>
    )
}

export default Home;