import React from 'react';
import './Backdrop.css';
import PropTypes from 'prop-types';

const Backdrop = ({ show, clicked }) => {
    return (
        show ? <div
            onClick={clicked}
            className='Backdrop'></div> : null
    );
};

Backdrop.propTypes = {
    show: PropTypes.bool,
    clicked: PropTypes.func,
};

export default Backdrop;
