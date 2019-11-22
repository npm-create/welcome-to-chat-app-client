import React from 'react';
import { connect } from 'react-redux';
import './User.css';

const User = ({ name, id, active, imUser, themeColor, iconColor }) => {

  const starImUser = imUser ? <i className="fas fa-star"></i> : null;
  return (
    <div
      className='user'
      active={active}
    >
      <div className='user-img' style={{ color: themeColor, background: iconColor }}>{name[0].toUpperCase()}</div>
      <div>
        <div className='user-title'>{name} {starImUser}  </div>
        <div className="user-title-message">

          <div>id: {id}</div>
        </div>
      </div>
    </div>

  );
};

const mapStateToProps = state => {
  return {
    rooms: state.chat.rooms,
    themeColor: state.chat.themeColor,
    iconColor: state.chat.iconColor
  }
}

export default connect(mapStateToProps)(User);
