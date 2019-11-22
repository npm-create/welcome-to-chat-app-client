import React from 'react';
import './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

const Modal = ({ children, show, modalClosed, top }) => {
    return (
        <>
            <Backdrop show={show} clicked={modalClosed} />
            <div
                style={{
                    transform: show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: show ? '1' : '0',
                    top: top
                }}
                className='Modal'>
                {children}
            </div>
        </>
    );
};

Modal.defaultProps = {
    top: '10%'
};

export default Modal;
