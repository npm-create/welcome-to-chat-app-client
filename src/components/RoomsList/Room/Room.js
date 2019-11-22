import React from 'react';
import './Room.css';

const Room = ({ title, isActive, clicked, close }) => {
  return (
    <div className={isActive ? 'room-list-title active' : 'room-list-title'}>
      <div
        onClick={clicked}
      >
        {title}
      </div>
      <div>
        <div className="room-close" onClick={close}>
          <i className="far fa-times-circle"></i>
        </div>
      </div>
    </div>
  );
};

export default Room;
