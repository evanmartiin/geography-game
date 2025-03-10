import React, { memo, useState } from "react";
import {
    ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography,
    Graticule,
    //   Marker,
    //   Line,
    //   Annotation
} from "react-simple-maps";
import Timer from "react-compound-timer";
import "./index.css";

import playImg from './assets/sound-play.png';
import pauseImg from './assets/sound-pause.png';

// const geoUrl =
//     "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
// const geoUrl =
//     "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";
import geoUrl from "./assets/geo.json";

// eslint-disable-next-line
Array.prototype.remove = function () {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

let usedCountryList = geoUrl.objects.countries.geometries.map((o) => { return [o.properties.name, o.properties.name_fr || o.properties.name] });

const MapChart = ({ setTooltipContent, setTooltipActive, setSound }) => {

    let firstRandomCountry = usedCountryList[Math.floor(Math.random() * usedCountryList.length)];

    const countryVerify = country => {
        if (country === randomCountry[0]) {
            if (score === 9) {
                if (isSoundActive) setSound('applause');
                setScore(score + 1);
                document.getElementById("timerStop").click();
                setStatus('win');
                let timeForComment = parseInt(document.getElementById("timerMinutes").textContent * 60 + document.getElementById("timerSeconds").textContent);
                if (timeForComment < 15) {
                    setComment('Du jamais vu.')
                } else if (timeForComment <= 30) {
                    setComment('Incroyable !')
                } else if (timeForComment <= 60) {
                    setComment('Super !')
                } else if (timeForComment <= 120) {
                    setComment('Pas mal !')
                } else if (timeForComment <= 300) {
                    setComment('Tu peux t\'améliorer.')
                } else if (timeForComment > 300) {
                    setComment('Euh.. merci d\'avoir joué.')
                }
                setTime(document.getElementById("timerScore").textContent);
            } else {
                if (isSoundActive) setSound('correct');
                usedCountryList.remove(randomCountry);
                updateCountry(usedCountryList[Math.floor(Math.random() * usedCountryList.length)]);
                setScore(score + 1);
            }
        } else {
            if (isSoundActive) setSound('incorrect');
        }
    }

    const nextCountry = () => {
        updateCountry(usedCountryList[Math.floor(Math.random() * usedCountryList.length)]);
    }

    const startGame = () => {
        document.getElementById("timerStart").click();
        setStatus('playing');
    }

    const restartGame = () => {
        document.getElementById("timerReset").click();
        document.getElementById("timerStart").click();
        usedCountryList = geoUrl.objects.countries.geometries.map((o) => { return [o.properties.name, o.properties.name_fr || o.properties.name] });
        updateCountry(usedCountryList[Math.floor(Math.random() * usedCountryList.length)]);
        setScore(0);
        setStatus('playing');
    }

    const soundButton = () => {
        setIsSoundActive(!isSoundActive);
    }

    const [randomCountry, updateCountry] = useState(firstRandomCountry);
    const [score, setScore] = useState(0);
    const [status, setStatus] = useState('start');
    const [time, setTime] = useState('');
    const [comment, setComment] = useState('');
    const [isSoundActive, setIsSoundActive] = useState(true);

    return (
        <>
            <div className={status === 'start' ? "startDiv" : "hide"}>
                <p>Le but du jeu: placer 10 pays donnés aléatoirement, en un temps record.<br /><br />Tu peux passer un pays si tu es trop nul, mais tu perds du temps.<br /><br /><span>Bon courage.</span></p>
                <button onClick={startGame}>Jouer</button>
            </div>
            <div className={status === 'win' ? "startDiv" : "hide"}>
                <h3>{time}</h3>
                <p><span>{comment}</span></p>
                <button onClick={restartGame}>Rejouer</button>
            </div>
            <div className={status === 'playing' ? "hide" : "backgroundDiv"}></div>

            <div className="infos">
                <div className="countryInfos">
                    <h1>{randomCountry[1]}</h1>
                    <button onClick={nextCountry}>Passer</button>
                </div>
                <h2><span className="bold">{score}</span>/10</h2>
            </div>

            <div className="sound">
                <button onClick={soundButton}>
                    <img src={isSoundActive ? playImg : pauseImg} alt="Start/Stop le son" />
                </button>
            </div>

            <div className="timer">
                <h2><Timer startImmediately={false}>
                    {({ start, stop, reset }) => (
                        <React.Fragment>
                            <div id="timerScore">
                                <span id="timerMinutes"><Timer.Minutes formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`} /></span>:
                                <span id="timerSeconds"><Timer.Seconds formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`} /></span>
                            </div>
                            <div className="hide">
                                <button id="timerStart" onClick={start}>Start</button>
                                <button id="timerStop" onClick={stop}>Stop</button>
                                <button id="timerReset" onClick={reset}>Reset</button>
                            </div>
                        </React.Fragment>
                    )}
                </Timer></h2>
            </div>

            <ComposableMap data-tip="" projectionConfig={{ scale: 200 }} className="map">
                <ZoomableGroup maxZoom={30}>
                    <Graticule stroke="#CCC" />
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map((geo) => {
                                const d = geo.properties.continent;
                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        onMouseEnter={() => {
                                            setTooltipActive(true);
                                            setTooltipContent(randomCountry[1]);
                                        }}
                                        onMouseLeave={() => {
                                            setTooltipActive(false);
                                            setTooltipContent("");
                                        }}
                                        onClick={() => {
                                            const { name } = geo.properties;
                                            countryVerify(name);
                                        }}
                                        fill={
                                            {
                                                'Europe': '#FF9E9E',
                                                'Asia': '#FFCE96',
                                                'Africa': '#FFEF9E',
                                                'South America': '#D1FF96',
                                                'North America': '#96FFC2',
                                                'Oceania': '#96FFFD',
                                                'Antarctica': '#96D2FF'
                                            }[d] || '#DDDDDD'
                                        }
                                        stroke={
                                            '#000000'
                                        }
                                        strokeWidth={
                                            '0.2px'
                                        }
                                        style={{
                                            hover: {
                                                fill: "#F53",
                                                outline: "none",
                                                cursor: "pointer"
                                            },
                                            default: {
                                                outline: "none"
                                            },
                                            focus: {
                                                outline: "none"
                                            }
                                        }}
                                    />
                                );
                            })
                        }
                    </Geographies>
                    {/* <Marker coordinates={[-74.006, 40.7128]}>
            <circle r={8} fill="#F53" />
        </Marker>
        <Line
            from={[2.3522, 48.8566]}
            to={[-74.006, 40.7128]}
            stroke="#FF5533"
            strokeWidth={4}
            strokeLinecap="round"
        />
        <Annotation
          subject={[2.3522, 48.8566]}
          dx={-90}
          dy={-30}
          connectorProps={{
            stroke: "#FF5533",
            strokeWidth: 3,
            strokeLinecap: "round"
          }}
        >
          <text x="-8" textAnchor="end" alignmentBaseline="middle" fill="#F53">
            {"Paris"}
          </text>
        </Annotation> */}
                </ZoomableGroup>
            </ComposableMap>
        </>
    );
};

export default memo(MapChart);
