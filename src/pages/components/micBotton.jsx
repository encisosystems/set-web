import  "./../css/voice.module.css"

export const MicButton = ({ isRecording, handleClick }) => (
    <div id="micButton" className="mic-container" onClick={handleClick}>
      <span className="material-symbols-outlined">{isRecording ? 'mic' : 'mic_off'}</span>
    </div>
  );