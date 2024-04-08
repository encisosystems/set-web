import React from 'react'
import ActiveMicIcon from './../images/micOn.svg';
//import DisableMicIcon from './../images/micOff.svg';

function Micro() {
  return(
    <div className="Micro">
      <header className="App-header">
        <img src={ActiveMicIcon} className="micro" alt="ActiveMicIcon" />
      </header>
    </div>
  );
}
export default Micro;


