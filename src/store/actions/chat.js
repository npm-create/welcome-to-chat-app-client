import * as actionTypes from './actionTypes';
import io from 'socket.io-client';

// const socketURL = 'http://localhost:5000/';
const socketURL = 'https://welcome-to-chat-app.herokuapp.com';
export const socket = io(socketURL);
socket.on('connect', () => {
  logout();
  console.log('connected to server', socketURL)
});

export const listener = () => {
  return dispatch => {

    socket.on('message', ({ message, roomId }) => {
      dispatch(setMessages({ message, roomId }));
    });

    socket.on(actionTypes.UPDATE_USERS_IN_ROOM, ({ usersInRoom, roomId }) => {
      dispatch(updateUsersInRoom({ usersInRoom, roomId }));
    });

    socket.on('disconnect', () => {
      socket.off();
      dispatch(logout());
      dispatch(disconnect());
    });
  };
};

export const disconnect = () => {
  return () => {
    socket.on('disconnect', () => {
      socket.disconnect()
      socket.off();
    })
  }
};

export const diconnectedUserFromRoom = ({ userId, roomId }) => {
  return dispatch => {
    socket.emit(actionTypes.DISCONNECT_USER_FROM_ROOM, { userId, roomId });
    dispatch(deleteRoom(roomId));
  };
};


export const verifyUser = (user) => {
  return {
    type: actionTypes.VERIFY_USER,
    user
  };
};

export const connetUserToRoom = (room) => {
  return {
    type: actionTypes.CONNECT_USER_TO_ROOM,
    room
  };
};

export const deleteRoom = (roomId) => {
  return {
    type: actionTypes.DELETE_ROOM,
    roomId
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT
  };
};

export const applyOptions = ({ themeColor, iconColor, statusText }) => {
  return {
    type: actionTypes.APPLY_OPTIONS,
    themeColor, iconColor, statusText
  };
};


export const changeActiveRoom = (roomId) => {
  return {
    type: actionTypes.CHANGE_ACTIVE_ROOM,
    roomId
  };
};

export const updateUsersInRoom = ({ usersInRoom, roomId }) => {
  return {
    type: actionTypes.UPDATE_USERS_IN_ROOM,
    usersInRoom,
    roomId
  };
};

export const setMessages = ({ message, roomId }) => {
  return {
    type: actionTypes.SET_MESSAGES,
    roomId, message
  };
};

export const setLoading = (loading) => {
  return {
    type: actionTypes.LOADING,
    loading
  }
}

export const errorReset = () => {
  return {
    type: actionTypes.ERROR_RESET
  };
};

export const setError = (errorMessage) => {
  return {
    type: actionTypes.SET_ERROR,
    errorMessage
  };
};

export const searchString = (value) => {
  return {
    type: actionTypes.SEARCH_STRING,
    value
  };
};

export const orderRoomsLeft = () => {
  return {
    type: actionTypes.ORDER_ROOMS_LEFT
  };
};

export const orderRoomsRight = () => {
  return {
    type: actionTypes.ORDER_ROOMS_RIGHT
  };
};

export const handleError = (userName) => {
  return dispatch => {
    if (userName.length === 0) {
      dispatch(setError('Enter nickname with letters! Please...'));
      return true;
    } else if (!(userName[0].match(/[a-zA-Zа-яА-Я]/))) {
      dispatch(setError('First symbol without spaces in nickname must be a letter.'));
      return true;
    } else if (userName.length < 4 || userName.length > 15) {
      dispatch(setError('Please enter nickname more then 3 symbols and less then 16!'));
      return true;
    };
    return false;
  };
};

export const verifyUserOnServer = ({ userName }) => {
  return dispatch => {
    socket.emit(actionTypes.VERIFY_USER, { userName }, (callback) => {
      const { errorMessage, user } = callback;
      if (errorMessage) {
        dispatch(setError(errorMessage));
      } else {
        dispatch(verifyUser(user));
      };
    });
  };
};

export const connectUserToRoomOnServer = ({ userName, roomName, roomId }) => {
  return dispatch => {
    socket.emit(actionTypes.CONNECT_USER_TO_ROOM, ({ userName, roomName, roomId }), callback => {
      const { room, errorMessage } = callback;
      if (errorMessage) {
        dispatch(setError(errorMessage));
        dispatch(setLoading(false));
      } else {
        dispatch(connetUserToRoom(room));
        dispatch(setLoading(false));

      };
    });
  };
};



export const logoutOnServer = () => {
  return dispatch => {
    socket.emit(actionTypes.LOGOUT)
    dispatch(logout());
  };
};
