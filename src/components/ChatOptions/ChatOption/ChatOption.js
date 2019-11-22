import React from 'react';

const ChatOption = ({ color, active, clicked, icon }) => {

  let clazz = active ? 'option-circle active' : 'option-circle';

  if (icon) {
    clazz = clazz + ' icon'
  }

  return (
    <div
      onClick={clicked}
      className={clazz}
      style={{ background: color }}>
    </div>
  );
};

export default ChatOption;
