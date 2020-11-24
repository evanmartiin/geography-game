import React, { useState } from "react";
import ReactDOM from "react-dom";
import ReactTooltip from "react-tooltip";
import useSound from 'use-sound';

import "./index.css";

import correctSound from './assets/correct.mp3';
import incorrectSound from './assets/incorrect.mp3';
import applauseSound from './assets/applause.mp3';

import MapChart from "./MapChart";

function App() {
  const [content, setContent] = useState("");
  const [active, setActive] = useState(false);
  const [sound, setSound] = useState('');
  const [soundActive, setSoundActive] = useState('true');

  const [playCorrect] = useSound(correctSound, { volume: 0.3 })
  const [playIncorrect] = useSound(incorrectSound, { volume: 0.5 })
  const [playApplause] = useSound(applauseSound, { volume: 0.5 })

  if(soundActive === 'true') {
    if (sound === 'correct') {
      playCorrect();
      setSound('');
    } else if (sound === 'incorrect') {
      playIncorrect();
      setSound('');
    } else if (sound === 'applause') {
      playApplause();
      setSound('');
    }
  }

  if (active) {
    return (
      <div>
        <MapChart setTooltipContent={setContent} setTooltipActive={setActive} setSound={setSound} setSoundActive={setSoundActive}/>
        <ReactTooltip>Est-ce "<span className="bold">{content}</span>" ?</ReactTooltip>
      </div>
    );
  }
  else if (!active) {
    return (
      <div>
        <MapChart setTooltipContent={setContent} setTooltipActive={setActive} />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);


export default App;
