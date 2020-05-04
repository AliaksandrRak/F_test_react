import React from 'react';
import { connect } from 'react-redux';

import spinerIcon from '../img/Radio-0.9s-231px.svg'
import './Spinner.scss'

function SpinnerFunction(props) {
    return (
        <>
        { props.storeState.isSending &&
            <div className="spinner">
                <img src={spinerIcon} alt="Spiner" />
            </div>
        }
        </>
    );
}

const Spinner = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(SpinnerFunction);

export default Spinner;
