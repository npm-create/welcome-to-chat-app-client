import React, { useState } from 'react';
import './ChatOptions.css';
import ChatOption from './ChatOption/ChatOption';
import Btn from '../UI/Btn/Btn';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/';

const ChatOptions = ({ show, themeColor, iconColor, applyOptions, clicked }) => {

  const [themeColorsActive, setThemeColorsActive] = useState(themeColor);
  const themeColors = ['#1b6a1b', '#0028aa', '#a01d1d'];
  const [iconColorsActive, setIconColorsActive] = useState(iconColor);
  const iconColors = ['lightgreen', '#fff', 'lightcoral'];

  const submitHandler = (e) => {
    e.preventDefault()
    applyOptions({
      themeColor: themeColorsActive,
      iconColor: iconColorsActive,
    });
    clicked();
  };

  return (
    <div style={{ visibility: show ? 'visible' : 'hidden' }}>
      <div className='chat-options-delta'></div>
      <div className='chat-options'>
        <div className='chat-options-container'>
          <form onSubmit={(e) => submitHandler(e)}>
            <hr />
            <div className='chat-option'>
              <div style={{ alignSelf: 'center' }}>Theme:</div>
              {
                themeColors.map((color) => (
                  <ChatOption
                    key={color + '-chat-option-theme'}
                    clicked={() => setThemeColorsActive(color)}
                    color={color}
                    active={themeColorsActive === color}
                  />
                ))
              }

            </div>
            <hr />
            <div className='chat-option'>
              <div style={{ alignSelf: 'center' }}>Icon color:</div>
              {
                iconColors.map((color) => (
                  <ChatOption
                    key={color + '-chat-option-theme'}
                    clicked={() => setIconColorsActive(color)}
                    icon={true}
                    color={color}
                    active={iconColorsActive === color}
                  />
                ))
              }

            </div>
            <hr />
            <Btn
              onClick={(e) => submitHandler(e)}
              style={{ height: '40px', background: '#eee' }}>Apply options</Btn>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    themeColor: state.chat.themeColor,
    iconColor: state.chat.iconColor,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    applyOptions: ({ themeColor, iconColor }) => dispatch(actions.applyOptions({ themeColor, iconColor }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatOptions);
