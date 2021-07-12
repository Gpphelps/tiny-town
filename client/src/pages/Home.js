
import React, {useState} from 'react';
import { useQuery, useMutation } from '@apollo/client';
import PlotPopUp from '../components/PlotPopUp';
import {GET_CITY} from '../utils/queries'


const Home = () => {


    //HERE WILL BE ALL PLOTS QUERY 
    //textarea text content will immedietly be set to the data from the query
    const { data } = useQuery(GET_CITY);
    console.log(data)

    return (
        <div>
            <textarea style={{display:'none'}} id="plotData"></textarea>
            <textarea style={{display:'none'}} id="plotData"></textarea>
            <p style={{display:'none'}} id="runModeProxy">city</p>
            <PlotPopUp />
            <div id="canvCont"></div>
        </div>
    )
}

export default Home;