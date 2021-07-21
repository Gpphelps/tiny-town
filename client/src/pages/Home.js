
import React, {useState, useEffect} from 'react';
import { useQuery, useMutation } from '@apollo/client';
import PlotPopUp from '../components/PlotPopUp';
import {GET_CITY} from '../utils/queries'
import {GET_ME} from '../utils/queries'


const Home = () => {



    const { loading, error, meData, refetch } = useQuery(GET_ME);

    useEffect(() => {
        refetch();
    },[refetch]);

    
    const userData = meData?.me;
    //HERE WILL BE ALL PLOTS QUERY 
    //textarea text content will immedietly be set to the data from the query
    const { data } = useQuery(GET_CITY)
    console.log(data)

    let string = JSON.stringify(data)
 
    useEffect(() => {
        document.querySelector('#plotData').value = string
    })

    return (
        <div>
            <textarea style={{display:'none'}} id="plotData"></textarea>
            <p style={{display:'none'}} id="runModeProxy">city</p>
            {
                userData ?
                    <PlotPopUp />
                    :
                    <div></div>
            }

            <div id="canvCont"></div>
        </div>
    )
}

export default Home;