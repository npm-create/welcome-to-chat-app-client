import React, { useState, useRef } from 'react';
import './ChatInputForm.css';
import Btn from '../UI/Btn/Btn';
import { socket } from '../../store/actions/';
import { connect } from 'react-redux';

const ChatInputForm = ({ activeRoomId }) => {

  const inputEl = useRef('');
  const [message, setMessage] = useState('');


  const submitHandler = (e) => {
    e.preventDefault();
    setMessage(inputEl.current.value);
    if (message.trim()) {
      socket.emit('SEND_MESSAGE', { message, activeRoomId }, () => {
        inputEl.current.value = '';
      });
      setMessage('')
    };
  };

  const changeHandler = () => {
    setMessage(inputEl.current.value)
  };



  return (
    <div className="chat-form">
      <form onSubmit={(e) => submitHandler(e)}>
        <input
          ref={inputEl}
          onChange={changeHandler}
          type="text"
          placeholder="Type a message" />
        <Btn onClick={(e) => submitHandler(e)}>Send</Btn>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    activeRoomId: state.chat.activeRoomId,
  };
};



export default connect(mapStateToProps)(ChatInputForm);
