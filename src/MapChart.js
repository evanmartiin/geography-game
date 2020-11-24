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

const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

// const rounded = num => {
//     if (num > 1000000000) {
//         return Math.round(num / 100000000) / 10 + "Bn";
//     } else if (num > 1000000) {
//         return Math.round(num / 100000) / 10 + "M";
//     } else {
//         return Math.round(num / 100) / 10 + "K";
//     }
// };

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

const countryList = [
    ["Afghanistan", "Afghanistan"],
    ["Albania", "Albanie"],
    ["Algeria", "Algérie"],
    ["Angola", "Angola"],
    ["Antarctica", "Antarctique"],
    ["Argentina", "Argentine"],
    ["Armenia", "Arménie"],
    ["Australia", "Australie"],
    ["Austria", "Autriche"],
    ["Azerbaijan", "Azerbaïdjan"],
    ["Bahamas", "Bahamas"],
    ["Bangladesh", "Bangladesh"],
    ["Belarus", "Biélorussie"],
    ["Belgium", "Belgique"],
    ["Belize", "Belize"],
    ["Benin", "Bénin"],
    ["Bhutan", "Bhoutan"],
    ["Bolivia", "Bolivie"],
    ["Bosnia and Herzegovina", "Bosnie-Herzégovine"],
    ["Botswana", "Botswana"],
    ["Brazil", "Brésil"],
    ["Brunei Darussalam", "Brunei"],
    ["Bulgaria", "Bulgarie"],
    ["Burkina Faso", "Burkina Faso"],
    ["Burundi", "Burundi"],
    ["Cambodia", "Cambodge"],
    ["Cameroon", "Cameroun"],
    ["Canada", "Canada"],
    ["Central African Republic", "République Centrafricaine"],
    ["Chad", "Tchad"],
    ["Chile", "Chili"],
    ["China", "Chine"],
    ["Colombia", "Colombie"],
    ["Costa Rica", "Costa Rica"],
    ["Croatia", "Croatie"],
    ["Cuba", "Cuba"],
    ["Cyprus", "Chypre"],
    ["Czech Republic", "République Tchèque"],
    ["Côte d'Ivoire", "Côte d'Ivoire"],
    ["Denmark", "Danemark"],
    ["Dem. Rep. Korea", "Corée du Nord"],
    ["Democratic Republic of the Congo", "République démocratique du Congo"],
    ["Djibouti", "Djibouti"],
    ["Dominican Republic", "République Dominicaine"],
    ["Ecuador", "Équateur"],
    ["Egypt", "Égypte"],
    ["El Salvador", "El Salvador"],
    ["Equatorial Guinea", "Guinée Équatoriale"],
    ["Eritrea", "Érythrée"],
    ["Estonia", "Estonie"],
    ["Ethiopia", "Éthiopie"],
    ["Falkland Islands", "Îles Falkland"],
    ["Fiji", "Fidji"],
    ["Finland", "Finlande"],
    ["France", "France"],
    ["French Southern and Antarctic Lands", "Terres Australes et Antarctiques Françaises"],
    ["Gabon", "Gabon"],
    ["Georgia", "Géorgie"],
    ["Germany", "Allemagne"],
    ["Ghana", "Ghana"],
    ["Greece", "Grèce"],
    ["Greenland", "Groenland"],
    ["Guatemala", "Guatemala"],
    ["Guinea", "Guinée"],
    ["Guinea-Bissau", "Guinée-Bissau"],
    ["Guyana", "Guyane"],
    ["Haiti", "Haïti"],
    ["Honduras", "Honduras"],
    ["Hungary", "Hongrie"],
    ["Iceland", "Islande"],
    ["India", "Inde"],
    ["Indonesia", "Indonésie"],
    ["Iran", "Iran"],
    ["Iraq", "Irak"],
    ["Ireland", "Irlande"],
    ["Israel", "Israël"],
    ["Italy", "Italie"],
    ["Jamaica", "Jamaïque"],
    ["Japan", "Japon"],
    ["Jordan", "Jordanie"],
    ["Kazakhstan", "Kazakhstan"],
    ["Kenya", "Kenya"],
    ["Kosovo", "Kosovo"],
    ["Kuwait", "Koweït"],
    ["Kyrgyzstan", "Kirghizistan"],
    ["Lao PDR", "Laos"],
    ["Latvia", "Lettonie"],
    ["Lebanon", "Liban"],
    ["Lesotho", "Lesotho"],
    ["Liberia", "Libéria"],
    ["Libya", "Libye"],
    ["Lithuania", "Lituanie"],
    ["Luxembourg", "Luxembourg"],
    ["Macedonia", "Macédoine du Nord"],
    ["Madagascar", "Madagascar"],
    ["Malawi", "Malawi"],
    ["Malaysia", "Malaisie"],
    ["Mali", "Mali"],
    ["Mauritania", "Mauritanie"],
    ["Mexico", "Mexique"],
    ["Moldova", "Moldavie"],
    ["Mongolia", "Mongolie"],
    ["Montenegro", "Monténégro"],
    ["Morocco", "Maroc"],
    ["Mozambique", "Mozambique"],
    ["Myanmar", "Birmanie"],
    ["Namibia", "Namibie"],
    ["Nepal", "Népal"],
    ["Netherlands", "Pays-Bas"],
    ["New Caledonia", "Nouvelle-Calédonie"],
    ["New Zealand", "Nouvelle-Zélande"],
    ["Nicaragua", "Nicaragua"],
    ["Niger", "Niger"],
    ["Nigeria", "Nigéria"],
    ["Norway", "Norvège"],
    ["Northern Cyprus", "Chypre du Nord"],
    ["Oman", "Oman"],
    ["Pakistan", "Pakistan"],
    ["Palestine", "Palestine"],
    ["Panama", "Panama"],
    ["Papua New Guinea", "Papouasie-Nouvelle-Guinée"],
    ["Paraguay", "Paraguay"],
    ["Peru", "Pérou"],
    ["Philippines", "Philippines"],
    ["Poland", "Pologne"],
    ["Portugal", "Portugal"],
    ["Puerto Rico", "Porto Rico"],
    ["Qatar", "Qatar"],
    ["Republic of Korea", "Corée du Sud"],
    ["Republic of the Congo", "République du Congo"],
    ["Romania", "Roumanie"],
    ["Russian Federation", "Russie"],
    ["Rwanda", "Rwanda"],
    ["Saudi Arabia", "Arabie Saoudite"],
    ["Senegal", "Sénégal"],
    ["Serbia", "Serbie"],
    ["Sierra Leone", "Sierra Leone"],
    ["Slovakia", "Slovaquie"],
    ["Slovenia", "Slovénie"],
    ["Solomon Islands", "Îles Salomon"],
    ["Somalia", "Somalie"],
    ["Somaliland", "Somaliland"],
    ["South Africa", "Afrique du Sud"],
    ["South Sudan", "Soudan du Sud"],
    ["Spain", "Espagne"],
    ["Sri Lanka", "Sri Lanka"],
    ["Sudan", "Soudan"],
    ["Suriname", "Suriname"],
    ["Sweden", "Suède"],
    ["Swaziland", "Eswatini"],
    ["Switzerland", "Suisse"],
    ["Syria", "Syrie"],
    ["Taiwan", "Taïwan"],
    ["Tajikistan", "Tadjikistan"],
    ["Tanzania", "Tanzanie"],
    ["Thailand", "Thaïlande"],
    ["The Gambia", "Gambie"],
    ["Timor-Leste", "Timor Oriental"],
    ["Togo", "Togo"],
    ["Trinidad and Tobago", "Trinité-et-Tobago"],
    ["Tunisia", "Tunisie"],
    ["Turkey", "Turquie"],
    ["Turkmenistan", "Turkménistan"],
    ["Uganda", "Ouganda"],
    ["Ukraine", "Ukraine"],
    ["United Arab Emirates", "Émirats Arabes Unis"],
    ["United Kingdom", "Royaume-Uni"],
    ["United States", "États-Unis"],
    ["Uruguay", "Uruguay"],
    ["Uzbekistan", "Ouzbékistan"],
    ["Vanuatu", "Vanuatu"],
    ["Venezuela", "Vénézuela"],
    ["Vietnam", "Vietnam"],
    ["Western Sahara", "Sahara Occidental"],
    ["Yemen", "Yémen"],
    ["Zambia", "Zambie"],
    ["Zimbabwe", "Zimbabwe"]
];

let usedCountryList = [];
countryList.forEach(element => usedCountryList.push(element));

const MapChart = ({ setTooltipContent, setTooltipActive, setSound }) => {

    let firstRandomCountry = usedCountryList[Math.floor(Math.random() * usedCountryList.length)];

    const countryVerify = country => {
        if (country === randomCountry[0]) {
            if (score === 10) {
                setSound('applause');
                setScore(score + 1);
                document.getElementById("timerStop").click();
                setStatus('win');
                let timeForComment = parseInt(document.getElementById("timerMinutes").textContent * 60 + document.getElementById("timerSeconds").textContent);
                if (timeForComment < 15) {
                    setComment('Du jamais vu.')
                } else if (timeForComment < 30) {
                    setComment('Incroyable !')
                } else if (timeForComment < 60) {
                    setComment('Super !')
                } else if (timeForComment < 120) {
                    setComment('Pas mal !')
                } else if (timeForComment < 300) {
                    setComment('Tu peux t\'améliorer.')
                } else {
                    setComment('Euh.. merci d\'avoir joué.')
                }
                setTime(document.getElementById("timerScore").textContent);
            } else {
                setSound('correct');
                usedCountryList.remove(randomCountry);
                updateCountry(usedCountryList[Math.floor(Math.random() * usedCountryList.length)]);
                setScore(score + 1);
            }
        } else {
            setSound('incorrect');
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
        usedCountryList = [];
        countryList.forEach(element => usedCountryList.push(element));
        updateCountry(usedCountryList[Math.floor(Math.random() * usedCountryList.length)]);
        setScore(0);
        setStatus('playing');
    }

    const [randomCountry, updateCountry] = useState(firstRandomCountry);
    const [score, setScore] = useState(0);
    const [status, setStatus] = useState('start');
    const [time, setTime] = useState('');
    const [comment, setComment] = useState('');

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
                <ZoomableGroup>
                    <Graticule stroke="#CCC" />
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map((geo) => {
                                const d = geo.properties.CONTINENT;
                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        onMouseEnter={() => {
                                            // const { NAME_LONG, POP_EST, CONTINENT } = geo.properties;
                                            // setTooltipContent(`${NAME_LONG} (${CONTINENT}) — ${rounded(POP_EST)}`);
                                            setTooltipActive('true');
                                            setTooltipContent(randomCountry[1]);
                                        }}
                                        onMouseLeave={() => {
                                            setTooltipActive('false');
                                            setTooltipContent("");
                                        }}
                                        onClick={() => {
                                            const { NAME_LONG } = geo.properties;
                                            countryVerify(NAME_LONG);
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
