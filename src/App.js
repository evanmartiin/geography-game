import React, { useState } from "react";
import ReactDOM from "react-dom";
import ReactTooltip from "react-tooltip";

import "./index.css";

import MapChart from "./MapChart";

function App() {
  const [content, setContent] = useState("");
  const [active, setActive] = useState("false");
  if (active === 'true') {
    return (
      <div>
        <MapChart setTooltipContent={setContent} setTooltipActive={setActive}/>
        <ReactTooltip>Est-ce "<span className="bold">{content}</span>" ?</ReactTooltip>
      </div>
    );
  }
  else if (active === 'false') {
    return (
      <div>
        <MapChart setTooltipContent={setContent} setTooltipActive={setActive}/>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);


export default App;
