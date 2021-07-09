import React from 'react';
import { Link } from 'react-router-dom';

const PlotPopUp = () => {
    return(
        <div id="newPlotPopUp">
            <div className="plotPopUpSpacer"></div>
            <Link to='/editor'>
                <div id="plotMinusZ" className='plotOption'></div>
            </Link>
            <div className="plotPopUpSpacer"></div>
            <Link to='/editor'>
                <div id="plotMinusX" className='plotOption'></div>
            </Link>
            <div className="plotPopUpSpacer"></div>
            <Link to='/editor'>
                <div id="plotPlusX" className='plotOption'></div>  
            </Link>
  
            <div className="plotPopUpSpacer"></div>
            <Link to='/editor'>
                <div id="plotPlusZ" className='plotOption'></div>
            </Link>
            <div className="plotPopUpSpacer"></div>
        </div>
    )
}

export default PlotPopUp;