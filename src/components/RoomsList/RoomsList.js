import React, { useState, useEffect } from 'react';
import './RoomsList.css';
import Room from './Room/Room';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/';

const RoomsList = (props) => {
  let rooms = Object.keys(props.rooms);
  const [activeArrows, setActiveArrows] = useState(false);

  useEffect(() => {
    checkArrows();
    //eslint-disable-next-line
  });

  const onClose = (roomId) => {
    props.onDiconnectedUserFromRoom({ roomId, userId: props.userId });
  };


  const roomsRow = props.roomsOrder.slice(0, 3).map(room => (
    <React.Fragment key={room}>
      <Room
        clicked={() => props.onChangeActiveRoom(room)}
        close={() => onClose(room)}
        title={props.rooms[room].roomName}
        isActive={room === props.activeRoomId} />
    </React.Fragment>
  ));

  const checkArrows = () => {
    if (rooms.length < 3) {
      setActiveArrows(false);
      return;
    };
    setActiveArrows(true);
  };

  const goLeft = () => {
    checkArrows();
    if (!activeArrows) { return; };
    props.orderRoomsLeft();
  };

  const goRight = () => {
    checkArrows();
    if (!activeArrows) { return; };
    props.orderRoomsRight();
  };

  const arrowClass = activeArrows ? 'rooms-list-arrow' : 'rooms-list-arrow disable';

  return (
    <div className='rooms-list' >
      <button
        style={{ borderColor: props.themeColor }}
        className={arrowClass}
        onClick={goLeft}>{'<'}</button>
      <div className='rooms-list-row'>
        {roomsRow}
      </div>
      <button
        style={{ borderColor: props.themeColor }}
        className={arrowClass}
        onClick={goRight}>{'>'}</button>
    </div>

  );
};

const mapStateToProps = state => {
  return {
    userId: state.chat.userId,
    activeRoomId: state.chat.activeRoomId,
    roomsOrder: state.chat.roomsOrder,
    rooms: state.chat.rooms,
    themeColor: state.chat.themeColor
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChangeActiveRoom: (roomId) => dispatch(actions.changeActiveRoom(roomId)),
    orderRoomsLeft: () => dispatch(actions.orderRoomsLeft()),
    orderRoomsRight: () => dispatch(actions.orderRoomsRight()),
    onDiconnectedUserFromRoom: ({ userId, roomId }) => dispatch(actions.diconnectedUserFromRoom({ userId, roomId }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomsList);
