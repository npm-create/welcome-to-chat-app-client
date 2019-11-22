import React, { useRef, useEffect, useState } from 'react';
import './Welcome.css';
import Btn from '../UI/Btn/Btn';
import * as actions from '../../store/actions/';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';

const Welcome = (props) => {

  const inputEl = useRef(null);
  const [roomName, setRoomName] = useState('Main');
  const [roomId, setRoomId] = useState('MAIN_ROOM');

  let location = useLocation();
  let invitedTo;

  useEffect(() => {
    if (location.pathname === ('/chat/')) {
      //eslint-disable-next-line
      invitedTo = location.search.split('&name=')[1];
      if (invitedTo) {
        setRoomId('/chat/' + location.search);
        setRoomName(invitedTo);
      }
    }
  }, [location]);


  let randomUserName = Math.round(Math.random() * 1e9).toString(36);
  randomUserName = '-' + randomUserName[0].toLocaleUpperCase() + randomUserName.slice(1);

  useEffect(() => {
    inputEl.current.focus()

    //eslint-disable-next-line
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userName = inputEl.current.value.trim();
    if (props.handleError(userName)) {
      inputEl.current.value = '';
      return;
    };


    //Try to verifyUserOnServer userName to 'Main' chat room
    props.verifyUserOnServer({ userName });
    props.connectUserToRoomOnServer({ userName, roomName, roomId });
  };

  const randomUser = () => {
    const userName = 'user' + randomUserName;
    props.verifyUserOnServer({ userName });
    props.connectUserToRoomOnServer({ userName, roomName, roomId });
  }

  return (
    <>

      <div className='welcome'>
        <div>
          <h2>Welcome To Chat!</h2>
          <form onSubmit={(e) => { handleSubmit(e) }}>
            <input ref={inputEl} type="text" placeholder='Enter your nickname' />
            <Btn type='submit' onClick={(e) => handleSubmit(e)}>Go</Btn>
          </form>
          <div className='random-user-name '>
            <Btn onClick={randomUser}>Enter with random user name</Btn>
          </div>
        </div>
      </div>
    </>
  );
};


const mapDispatchToProps = dispatch => {
  return {
    verifyUserOnServer: ({ userName }) => dispatch(actions.verifyUserOnServer({ userName })),
    connectUserToRoomOnServer: ({ userName, roomName, roomId }) => dispatch(actions.connectUserToRoomOnServer({ userName, roomName, roomId })),
    handleError: (userName) => dispatch(actions.handleError(userName)),
  };
};


export default connect(null, mapDispatchToProps)(Welcome);
