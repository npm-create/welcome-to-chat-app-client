import React from 'react';
import './Message.css';
import { connect } from 'react-redux';

const Message = ({ user, text, time, userName, themeColor }) => {

  const yourMessage = (
    <div className="message-row your-message" >
      <div className="message-text " style={{ background: themeColor }}>
        {text}
        <div className="message-time">
          {time}
        </div>
      </div>
    </div>
  );

  let colorUserName = themeColor;
  if (user === 'admin') colorUserName = 'tomato';
  const otherMessage = (
    <div className="message-row other-message ">
      <div className="message-text ">
        <p style={{ color: colorUserName }}>{user}</p>
        {text}
        <div className="message-time">
          {time}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {userName === user ? yourMessage : otherMessage}
    </>
  );
};

const mapStateToProps = state => {
  return {
    userName: state.chat.userName,
    themeColor: state.chat.themeColor
  };
};

export default connect(mapStateToProps)(Message);
