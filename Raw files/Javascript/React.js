import React from "react";
//GLOBAL DECLARATIONS ↓
const SOUNDS1 = [
  {
    "letter": "Q"
    , "instrument": "Heater-1"
    , "url": "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
  },
  {
    "letter": "W"
    , "instrument": "Heater-2"
    , "url": "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
  },
  {
    "letter": "E"
    , "instrument": "Heater-3"
    , "url": "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
  },
  {
    "letter": "A"
    , "instrument": "Heater-4"
    , "url": "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
  },
  {
    "letter": "S"
    , "instrument": "Clap"
    , "url": "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
  },
  {
    "letter": "D"
    , "instrument": "Open-HH"
    , "url": "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
  },
  {
    "letter": "Z"
    , "instrument": "Kick-n'-Hat"
    , "url": "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
  },
  {
    "letter": "X"
    , "instrument": "Kick"
    , "url": "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
  },
  {
    "letter": "C"
    , "instrument": "Closed-HH"
    , "url": "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
  }
]
const SOUNDS2 = [
  {
    "letter": "Q"
    , "instrument": "Chord-1"
    , "url": "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
  },
  {
    "letter": "W"
    , "instrument": "Chord-2"
    , "url": "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
  },
  {
    "letter": "E"
    , "instrument": "Chord-3"
    , "url": "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
  },
  {
    "letter": "A"
    , "instrument": "Shaker"
    , "url": "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
  },
  {
    "letter": "S"
    , "instrument": "Open-HH"
    , "url": "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
  },
  {
    "letter": "D"
    , "instrument": "Closed-HH"
    , "url": "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
  },
  {
    "letter": "Z"
    , "instrument": "Punchy-Kick"
    , "url": "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
  },
  {
    "letter": "X"
    , "instrument": "Side-Stick"
    , "url": "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
  },
  {
    "letter": "C"
    , "instrument": "Snare"
    , "url": "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
  }
]
//GLOBAL DECLARATIONS ↑

export const Presentational = (props) => {
  return (
    <DrumMachine propys={props}/>
  );
}

class DrumMachine extends React.Component {
  
  handleKey = (L) => {
    let key = (
      L.length === 1
      ? L
      : L.key
      );
    key = /^[qweasdzxc]$/i.test(key) && key.toUpperCase();
    
    if (key) {
      const propys = this.props.propys;
      propys.handleKey(key);
      let audio = new Audio(document.getElementById(key).src);
      audio.volume = propys.volume/100;
      audio.play();
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKey.bind(this))
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKey.bind(this))
  }
    
  render() {
    const power = this.props.propys.power
    const propys = power ? this.props.propys: {};
    const SOUNDS = propys.bank ? SOUNDS2: SOUNDS1;
    return (
      <div id="drum-machine" className="DrumMachine">
        <DrumPads 
          handleKey = {power ? this.handleKey : ()=>{}} 
          sounds={SOUNDS} 
        />
        <div className="Controls">
          <Switch 
            className="Power" 
            name="Power"
            state={propys.power}
            handleSwitch={this.props.propys.handlePower}
          /> {/*END Switch*/}
          <Display 
          sounds={SOUNDS}
          currentAction={propys.currentAction}
          /> {/*END Display*/}
          <SlideBar
            volume={power ? propys.volume : ""}
            handleVol={power ? propys.handleVol : ()=>{}}
          />
          <Switch 
            className="Bank" 
            name="Bank"
            handleSwitch={propys.handleBank} 
            state={propys.bank}
          /> {/*END Switch*/}
        </div>
      </div>
    );
  }
}

//DrumPads ↓
const DrumPads = (props) => {
  const SOUNDS = props.sounds
  const drumPads = SOUNDS.map((sound)=>{
    return (
      <DrumPad 
      key={sound["letter"]}
      handleKey={props.handleKey}
      letter={sound["letter"]}
      src={sound["url"]}
      instrument={sound["instrument"]}
      />
    );
  })
  return (
    <div className="DrumPads">
      {drumPads}
    </div>
  );
}

const DrumPad = (props) => {
  const L = props.letter;
  const src = props.src;
  const instrument = props.instrument;
  return (
    <div 
      className="DrumPad drum-pad"
      id={instrument}
      onClick={props.handleKey.bind(this, L)}
    >
      {L}
    <audio 
    id={L}
    className="clip"
    src={src}
    />
    </div>
  );
}
//DrumPads ↑

// CONTROLS ↓
const Display = (props) => {
  const currentAction = (
    props.currentAction
    ? (
      props.currentAction.length === 1
      ? props.sounds.find((sound)=>sound["letter"]===props.currentAction)["instrument"]
      : props.currentAction
      )
    : ""
  );
  return (
    <div id="display" className="Display">
      {currentAction}
    </div>
  );
}
 
const Switch = (props) => {
  const buttonStyle = props.name === "Power"
                ? props.state
                  ? {justifyContent: "flex-end", background:"rgb(0, 187, 62)"}
                  : {justifyContent: "flex-start", background:"rgb(200, 0, 15)"}
                : props.state
                  ? {justifyContent: "flex-end"}
                  : {justifyContent: "flex-start"}
  
  return (
    <div className={props.className}>
      <div>
        {props.name}
      </div>
      <div style={buttonStyle}>
        <div onClick={props.handleSwitch}>
        </div>
      </div>
    </div>
  );
}

const SlideBar = (props) => {
  return (
    <div className="SlideBar">
      <input 
      type="range"
      value={props.volume}
      onChange={props.handleVol.bind(this)}
      name="volume"
      min="0"
      max="100"
      step="1"
      />
    </div>
  );
}
// CONTROLS ↑