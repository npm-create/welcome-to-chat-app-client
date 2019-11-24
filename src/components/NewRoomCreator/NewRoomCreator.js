import React, { useState, useRef } from 'react';
import './NewRoomCreator.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/';

const NewRoomCreator = ({ onConnectUserToRoomOnServer, userName, userId, rooms, setError, themeColor }) => {

  const [show, setShow] = useState(false);

  const inputEl = useRef(null);

  const inputButtonClass = show ? 'new-room-input-button show' : 'new-room-input-button';

  const clickHandler = () => {
    setShow(prev => !prev);
    inputEl.current.focus();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const roomName = inputEl.current.value.trim();
    const roomId = `/?room=${userId}&name=${roomName}`;
    if (Object.keys(rooms).includes(roomId)) {
      setError('You already have room with same name');
    } else if (roomName.length < 3 || roomName.length > 16) {
      setError('Please enter room name at least 3 symbols and less 16 symbols.');
    } else if (roomName.includes(' ')) {
      setError('Please name room with one word.');
    } else {
      onConnectUserToRoomOnServer({ userName, roomName, roomId });
      inputEl.current.value = '';
      setShow(false);
    }
  };

  return (
    <div className="new-room-creator">
      <button
        style={{ color: themeColor }}
        className="new-room-creator-button"
        onClick={clickHandler} >+</button>
      <div className='new-room-input-container'>
        <form
          className={inputButtonClass}
          onSubmit={(e) => submitHandler(e)}>
          <input
            ref={inputEl}
            className='new-room-input'
            type="text"
            placeholder='Enter new room name' />
          <button
            onClick={(e) => submitHandler(e)}
            className='new-room-create-button'>Create</button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    rooms: state.chat.rooms,
    userName: state.chat.userName,
    userId: state.chat.userId,
    themeColor: state.chat.themeColor
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setError: (err) => dispatch(actions.setError(err)),
    onConnectUserToRoomOnServer: ({ userName, roomName, roomId }) => dispatch(actions.connectUserToRoomOnServer({ userName, roomName, roomId }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewRoomCreator);
