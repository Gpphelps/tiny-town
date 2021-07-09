import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { SAVE_PLOT } from '../utils/mutations';

const PlotPopUp = ({handleButton, hidden, popupX, popupY, display}) => {

    const [savePlot, { error }] = useMutation(SAVE_PLOT)

    const styles = {
        left: `${popupX}px`,
        top: `${popupY}px`,
        display: display
    }

    return(
        <div style={styles} id="newPlotPopUp">
            <div className="plotPopUpSpacer"></div>
            {/* <Link to='/editor'> */}
                <div onClick={handleButton} id="plotMinusZ" className='plotOption'></div>
            {/* </Link> */}
            <div className="plotPopUpSpacer"></div>
            {/* <Link to='/editor'> */}
                <div onClick={handleButton} id="plotMinusX" className='plotOption'></div>
            {/* </Link> */}
            <div className="plotPopUpSpacer"></div>
            {/* <Link to='/editor'> */}
                <div onClick={handleButton} id="plotPlusX" className='plotOption'></div>  
            {/* </Link> */}
  
            <div className="plotPopUpSpacer"></div>
            {/* <Link to='/editor'> */}
                <div onClick={handleButton} id="plotPlusZ" className='plotOption'></div>
            {/* </Link> */}
            <div className="plotPopUpSpacer"></div>
        </div>
    )
}

export default PlotPopUp;