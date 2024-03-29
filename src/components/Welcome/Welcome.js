import React, { useRef, useEffect, useState } from 'react';
import './Welcome.css';
import Btn from '../UI/Btn/Btn';
import * as actions from '../../store/actions/';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Spinner from '../UI/Spinner/Spinner';

const Welcome = (props) => {

  const inputEl = useRef(null);
  const [roomName, setRoomName] = useState('Main');
  const [roomId, setRoomId] = useState('MAIN_ROOM');

  let location = useLocation();
  let invitedTo;

  useEffect(() => {
    if (location.pathname.search !== '') {
      //eslint-disable-next-line
      invitedTo = location.search.split('&name=')[1];
      if (invitedTo) {
        setRoomId('/' + location.search);
        setRoomName(invitedTo);
      }
    }
  }, [location]);


  let randomUserName = Math.round(Math.random() * 1e9).toString(36);
  randomUserName = '-' + randomUserName[0].toLocaleUpperCase() + randomUserName.slice(1);

  useEffect(() => {
    if (!props.loading) {
      inputEl.current.focus()

    }

    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (props.userName) {
      props.connectUserToRoomOnServer({ userName: props.userName, roomName, roomId })
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    const userName = inputEl.current.value.trim();
    if (props.handleError(userName)) {
      inputEl.current.value = '';
      return;
    };

    props.setLoading(true);
    //Try to verifyUserOnServer userName to 'Main' chat room
    props.verifyUserOnServer({ userName });
  };

  const randomUser = () => {
    const userName = 'user' + randomUserName;
    props.setLoading(true);
    props.verifyUserOnServer({ userName });
  }

  if (props.loading) {
    return <Spinner />
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

const mapStateToProps = state => {
  return {
    loading: state.chat.loading,
    userName: state.chat.userName
  }
}


const mapDispatchToProps = dispatch => {
  return {
    setLoading: (loading) => dispatch(actions.setLoading(loading)),
    verifyUserOnServer: ({ userName }) => dispatch(actions.verifyUserOnServer({ userName })),
    connectUserToRoomOnServer: ({ userName, roomName, roomId }) => dispatch(actions.connectUserToRoomOnServer({ userName, roomName, roomId })),
    handleError: (userName) => dispatch(actions.handleError(userName)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
