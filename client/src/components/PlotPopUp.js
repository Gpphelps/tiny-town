import React from 'react';


const PlotPopUp = () => {
    return(
        <div id="newPlotPopUp">
            <div className="plotPopUpSpacer"></div>
            <div id="plotMinusZ" className='plotOption'></div>
            <div className="plotPopUpSpacer"></div>
            <div id="plotMinusX" className='plotOption'></div>
            <div className="plotPopUpSpacer"></div>
            <div id="plotPlusX" className='plotOption'></div>
            <div className="plotPopUpSpacer"></div>
            <div id="plotPlusZ" className='plotOption'></div>
            <div className="plotPopUpSpacer"></div>
        </div>
    )
}

export default PlotPopUp;