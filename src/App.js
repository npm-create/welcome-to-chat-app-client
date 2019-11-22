import React, { useEffect } from "react";
import Welcome from './components/Welcome/Welcome';
import Layout from "./conteiners/Layout";
import Modal from './components/UI/Modal/Modal';
import { connect } from 'react-redux';
import * as actions from './store/actions/';

const App = ({ listener, disconnect, userName, activeRoomId, error, errorReset, errorMessage }) => {

    useEffect(() => {
        listener();
        disconnect();
    }, [listener, disconnect]);

    return (
        <>
            <Modal show={error} modalClosed={errorReset}>{errorMessage}</Modal>
            {!userName || !activeRoomId ?
                <Welcome /> :
                <Layout />
            }
        </>
    );
};

const mapStateToProps = state => {
    return {
        error: state.chat.error,
        errorMessage: state.chat.errorMessage,
        activeRoomId: state.chat.activeRoomId,
        userName: state.chat.userName
    };
};

const mapDispatchToProps = dispatch => {
    return {
        disconnect: () => dispatch(actions.disconnect()),
        listener: () => dispatch(actions.listener()),
        errorReset: () => dispatch(actions.errorReset()),
        setError: (msg) => dispatch(actions.setError(msg))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
