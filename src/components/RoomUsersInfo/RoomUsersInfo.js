import React from 'react';
import { connect } from 'react-redux';
import './RoomUsersInfo.css';

const RoomUsersInfo = (props) => {

  const { usersInRoom, roomName } = props.rooms[props.activeRoomId];


  let infoText = <>Now {usersInRoom.length} users in "{roomName}" room. </>;

  if (usersInRoom.length === 1) {
    infoText = <>You are alone in "{roomName}" room</>
  }

  if (props.searchString !== '') {
    const searchResult = usersInRoom.filter(user => user.userName.toLowerCase().includes(props.searchString.toLowerCase())).length;
    let userOrUsers = searchResult === 1 ? 'user' : 'users';
    infoText = <>Found {searchResult} {userOrUsers} in "{roomName}" room. </>
  }

  return (
    <div className='room-users-container'>
      <div className='room-users-info'>
        {infoText}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    rooms: state.chat.rooms,
    activeRoomId: state.chat.activeRoomId,
    searchString: state.chat.searchString
  }
}

export default connect(mapStateToProps)(RoomUsersInfo);
