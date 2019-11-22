import * as actionTypes from '../actions/actionTypes';

const initialState = {
  userName: null,
  userId: null,
  activeRoomId: null,
  rooms: {},
  roomsOrder: [],
  searchString: '',
  themeColor: '#0028aa',
  iconColor: '#fff',
  error: false,
  errorMessage: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.VERIFY_USER:
      let { userName, userId } = action.user;
      return {
        ...state,
        userName,
        userId
      };
    case actionTypes.CONNECT_USER_TO_ROOM:
      let { roomId, roomName, usersInRoom } = action.room;
      return {
        ...state,
        roomsOrder: [roomId, ...state.roomsOrder],
        rooms: {
          ...state.rooms,
          [roomId]: {
            ...state.rooms.roomId,
            roomName,
            usersInRoom,
            messagesInRoom: []
          }
        },
        activeRoomId: action.room.roomId,
      };
    case actionTypes.LOGOUT:
      return {
        ...initialState
      };
    case actionTypes.APPLY_OPTIONS:
      const { themeColor, iconColor } = action;
      return {
        ...state,
        themeColor, iconColor
      };
    case actionTypes.DELETE_ROOM:
      const idxRemovedRoom = state.roomsOrder.findIndex(room => room === action.roomId);
      const newRoomsOrder = [...state.roomsOrder.slice(0, idxRemovedRoom), ...state.roomsOrder.slice(idxRemovedRoom + 1)];
      const newActiveRoom = newRoomsOrder[0] || null;
      const newRooms = {};
      newRoomsOrder.forEach(room => newRooms[room] = state.rooms[room])
      return {
        ...state,
        roomsOrder: newRoomsOrder,
        rooms: newRooms,
        activeRoomId: newActiveRoom
      };

    case actionTypes.CHANGE_ACTIVE_ROOM:
      return {
        ...state,
        activeRoomId: action.roomId
      };
    case actionTypes.ORDER_ROOMS_RIGHT:
      const ordersR = [...state.roomsOrder];
      const lastOrder = ordersR.pop();
      return {
        ...state,
        roomsOrder: [lastOrder, ...ordersR]
      };
    case actionTypes.ORDER_ROOMS_LEFT:
      const ordersL = [...state.roomsOrder];
      const firstOrder = ordersL.shift();
      return {
        ...state,
        roomsOrder: [...ordersL, firstOrder]
      };
    case actionTypes.UPDATE_USERS_IN_ROOM:
      return {
        ...state,
        rooms: {
          ...state.rooms,
          [action.roomId]: {
            ...state.rooms[action.roomId],
            usersInRoom: [...action.usersInRoom]
          }
        }
      };
    case actionTypes.SET_MESSAGES:
      return {
        ...state,
        rooms: {
          ...state.rooms,
          [action.roomId]: {
            ...state.rooms[action.roomId],
            messagesInRoom: [...state.rooms[action.roomId].messagesInRoom, action.message]
          }
        }
      };

    case actionTypes.SEARCH_STRING:
      return {
        ...state,
        searchString: action.value
      };
    case actionTypes.SET_ERROR:
      return {
        ...state,
        error: true,
        errorMessage: action.errorMessage
      };
    case actionTypes.ERROR_RESET:
      return {
        ...state,
        error: false,
        errorMessage: ''
      };
    default:
      return state;
  };
};


