
import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
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
    if (data !== undefined) {
        console.log(data.city[0].plot[0].plotName);
    }
    

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
            {data && <div>{data.city[0].plot[0].plotName}</div>}
        </div>
    )
}

export default Home;