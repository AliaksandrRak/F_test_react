import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './Header.scss'


function HeaderFunction(props) {

    return (
        <div className="header">
            <div className="header-block">
                <Link to={'/'}>Home</Link>
                <Link to={'/result'}>Result</Link>
                <Link to={'/history'}>History</Link>
            </div>
        </div>
    );
}

const Header = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(HeaderFunction);

export default Header;
