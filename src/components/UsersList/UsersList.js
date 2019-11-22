import React from 'react';
import './UsersList.css';
import { connect } from 'react-redux';
import User from './User/User';


const UsersList = (props) => {

  const { usersInRoom } = props.rooms[props.activeRoomId] || [];

  const users = props.searchString === '' ?
    usersInRoom :
    usersInRoom.filter(user => user.userName.toLowerCase().includes(props.searchString.toLowerCase()));


  return (
    <div className='users-list'>
      {users.map(user => (
        <User
          imUser={user.userName === props.userName}
          key={user.userId}
          name={user.userName}
          id={user.userId}
        />
      ))}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    rooms: state.chat.rooms,
    userName: state.chat.userName,
    activeRoomId: state.chat.activeRoomId,
    searchString: state.chat.searchString
  };
};


export default connect(mapStateToProps)(UsersList);
