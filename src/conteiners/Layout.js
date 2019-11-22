import React from "react";
import './Layout.css';
import SearchContainer from "../components/SearchContainer/SearchContainer";
import RoomUsersInfo from '../components/RoomUsersInfo/RoomUsersInfo';
import UsersList from "../components/UsersList/UsersList";
import NewRoomCreator from "../components/NewRoomCreator/NewRoomCreator";
import ChatTitle from '../components/ChatTitle/ChatTitle';
import ChatMessageList from '../components/ChatMessageList/ChatMessageList';
import ChatInputForm from "../components/ChatInputForm/ChatInputForm";
import RoomsList from "../components/RoomsList/RoomsList";
import { connect } from 'react-redux';


const Layout = ({ themeColor }) => (
    <div className='chat-container' style={{ background: themeColor, color: themeColor }}>
        <SearchContainer />
        <RoomUsersInfo />
        <UsersList />
        <NewRoomCreator />
        <ChatTitle />
        <RoomsList />
        <ChatMessageList />
        <ChatInputForm />
    </div>
);

const mapStateToProps = state => {
    return {
        themeColor: state.chat.themeColor
    };
};

export default connect(mapStateToProps)(Layout);