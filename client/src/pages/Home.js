
import React from 'react';

const Home = () => {


    //HERE WILL BE ALL PLOTS QUERY 
    //textarea text content will immedietly be set to the data from the query

    return (
        <div>
            <textarea style={{display:'none'}} id="plotData"></textarea>
            <p style={{display:'none'}} id="runModeProxy">city</p>
            <div id="canvCont"></div>
        </div>
    )
}

export default Home;