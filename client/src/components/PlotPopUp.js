import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { SAVE_PLOT } from '../utils/mutations';

const PlotPopUp = () => {

    const [savePlot, { error }] = useMutation(SAVE_PLOT)

    const handleButton = (e) => {
        console.log(e.target.getAttribute('id'))
    }

    return(
        <div id="newPlotPopUp">
            <div className="plotPopUpSpacer"></div>
            <Link to='/editor'>
                <div onClick={handleButton} id="plotMinusZ" className='plotOption'></div>
            </Link>
            <div className="plotPopUpSpacer"></div>
            <Link to='/editor'>
                <div onClick={handleButton} id="plotMinusX" className='plotOption'></div>
            </Link>
            <div className="plotPopUpSpacer"></div>
            <Link to='/editor'>
                <div onClick={handleButton} id="plotPlusX" className='plotOption'></div>  
            </Link>
  
            <div className="plotPopUpSpacer"></div>
            <Link to='/editor'>
                <div onClick={handleButton} id="plotPlusZ" className='plotOption'></div>
            </Link>
            <div className="plotPopUpSpacer"></div>
        </div>
    )
}

export default PlotPopUp;