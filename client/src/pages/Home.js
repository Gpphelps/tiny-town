
import React from 'react';

const Home = () => {


    //HERE WILL BE ALL PLOTS QUERY 
    //textarea text content will immedietly be set to the data from the query

    return (
        <div>
            <textarea style={{display:'none'}} id="plotData"></textarea>
            <p style={{display:'none'}} id="runModeProxy">city</p>
            <div id="canvCont"></div>
            <div id="newPlotPopUp">
                <div className="plotPopUpSpacer"></div>
                <div id="plotPlusX" className='plotOption'></div>
                <div className="plotPopUpSpacer"></div>
                <div id="plotPlusZ" className='plotOption'></div>
                <div className="plotPopUpSpacer"></div>
                <div id="plotMinusX" className='plotOption'></div>
                <div className="plotPopUpSpacer"></div>
                <div id="plotMinusZ" className='plotOption'></div>
                <div className="plotPopUpSpacer"></div>
            </div>
        </div>
    )
}

export default Home;