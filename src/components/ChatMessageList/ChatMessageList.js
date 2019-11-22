import React from 'react';
import './ChatMessageList.css';
import { connect } from 'react-redux';
import Message from './Message/Message';
import uuid from 'uuid/v4';

const ChatMessageList = ({ rooms, activeRoomId }) => {

  const messagesInRoom = rooms[activeRoomId].messagesInRoom;

  return (
    <div className='chat-message-list'>
      <div className='chat-message-box'>
        {messagesInRoom.map(msg => (
          <Message
            key={uuid()}
            user={msg.user}
            text={msg.text}
            time={msg.time} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    rooms: state.chat.rooms,
    activeRoomId: state.chat.activeRoomId,
  };
};

export default connect(mapStateToProps)(ChatMessageList);
