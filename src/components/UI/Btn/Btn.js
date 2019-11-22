import React from 'react';
import './Btn.css';

const Btn = (props) => {
  return (
    <div className='btn' {...props}>
      {props.children}
    </div>
  );
}

export default Btn;
