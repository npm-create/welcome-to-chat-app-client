import React, { useState } from 'react';
import './ChatTitle.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/';
import Modal from '../UI/Modal/Modal';
import Btn from '../UI/Btn/Btn';
import ChatOptions from '../ChatOptions/ChatOptions';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const ChatTitle = (props) => {

  const [toggler, setToggler] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);

  const door = toggler ? 'fas fa-door-open' : 'fas fa-door-closed';

  const onLogout = () => {
    setShowLogout(false);
    props.onLogoutOnServer();
  };

  const addUser = props.activeRoomId === 'MAIN_ROOM' ?
    <div></div> :
    <div style={{ height: '20px' }}
      onClick={() => setShowAddUser(true)}>
      <i className="fas fa-user-plus"></i>
    </div>;

  const addUserString = 'welcome-to-chat-app.netlify.com' + props.activeRoomId;

  return (
    <>
      <Modal top='40%' show={showLogout} modalClosed={() => setShowLogout(false)}>Are you sure you want to quit?
      <div className='logout-modal-buttons'>
          <Btn onClick={() => onLogout()}>Yes</Btn>
          <Btn onClick={() => setShowLogout(false)}>No</Btn>
        </div>
      </Modal>

      <Modal top='40%' show={showAddUser} modalClosed={() => setShowAddUser(false)}>
        <div className='copy-add-user-container'>

          <input type="text" value={addUserString} onChange={() => { }} />
          <CopyToClipboard text={addUserString}>
            <Btn>Copy</Btn>
          </CopyToClipboard>
        </div>
      </Modal>

      <div className='chat-title' style={{ color: props.themeColor }}>
        <span>Welcome {props.userName}!</span>
        {addUser}
        <div style={{ height: '20px' }}>
          <i className="fas fa-cog" onClick={() => setShowOptions(prev => !prev)} ></i>
          <ChatOptions show={showOptions} clicked={() => setShowOptions(false)} />
        </div>
        <div
          style={{ height: '20px' }}
          onClick={() => setShowLogout(true)}
          onMouseOver={() => setToggler(true)}
          onMouseOut={() => setToggler(false)}>
          <i className={door}></i>
        </div>
      </div>

    </>
  );
};


const mapStateToProps = state => {
  return {
    activeRoomId: state.chat.activeRoomId,
    rooms: state.chat.rooms,
    userName: state.chat.userName,
    themeColor: state.chat.themeColor
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogoutOnServer: () => dispatch(actions.logoutOnServer())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatTitle);
