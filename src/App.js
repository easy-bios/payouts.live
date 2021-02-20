import React, { useState } from "react";
import "./App.css";

import Main from "./components/main";
import Payouts from "./components/payouts";
import Blinds from "./components/blinds";
import Settings from "./components/settings";

import { Button, ButtonGroup, IconButton ,CssBaseline } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';

const StyledButton = withStyles({
  root: {
    color: 'white',
    fontSize: '1em',
    height: '1.67em',
    // borderColor: 'white',
    // width: '50%',
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    // borderRadius: 3,
    // border: 0,
    // height: 48,
    // padding: '0 30px',
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
})(Button);


const getDefault = (storageName, defaultValue) => {
  return JSON.parse(localStorage.getItem(storageName)) || defaultValue
}


const DEFAULTS = {
  title: getDefault("title", "%buyin - Homegame"),
  subtitle: getDefault("subtitle", "www.payouts.live"),
  interval: getDefault("interval", 15),
  buyin: getDefault("buyin", 5),
  currency: getDefault("currency", "€"),
  buyins: getDefault("buyins", 3),
  full_buyins: getDefault("full_buyins", 0),
  time: getDefault("time",
    {
      start: 0,
      offset: 0,
      playtime: 0,
      level: 0,
    }),
  payouts: getDefault("payouts",
    [{id: 0, payout:50}, {id: 1, payout:30}, {id: 2, payout:20}]),
  guaranteed: getDefault("minPayout", 0),
  blinds: getDefault("blinds", [25]),
};
if (DEFAULTS.blinds.length === 1) {
  for (var i=1 ; i<24 ; i++) {
    DEFAULTS.blinds.push(DEFAULTS.blinds[DEFAULTS.blinds.length-1] + DEFAULTS.blinds[0] * Math.pow(2, Math.floor(i/4)));
  }
}


function App() {
  const [titles, setTitles] = useState({
    title: DEFAULTS.title,
    subtitle: DEFAULTS.subtitle,
  });
  const [buyins, setBuyins] = useState(DEFAULTS.buyins);
  const [buyin, setBuyin] = useState(DEFAULTS.buyin);
  const [guaranteed, setGuaranteed] = useState(DEFAULTS.guaranteed);
  const [currency, setCurrency] = useState(DEFAULTS.currency);
  const [payout, setPayout] = useState(DEFAULTS.payouts);
  const [full_buyins, setFullBuyins] = useState(DEFAULTS.full_buyins);
  const [showSettings, setShowSettings] = useState(false);
  const [time, setTime] = useState(DEFAULTS.time);
  const [blinds, setBlinds] = useState({small: DEFAULTS.blinds, interval: DEFAULTS.interval});

  const pool = buyins * buyin;

  const toggleSettingsHandler = () => {
    setShowSettings(prev => !prev);
    return 0
  }

  const setBuyinsHandler = (d) => {
    setBuyins((prev) => {
      if (prev <= 0 && d < 0) return 0
      else {
        localStorage.setItem("buyins", JSON.stringify(prev+d));
        return prev+d
      }
    })
  }

  const formatTime = (time) => {
    const t = Math.abs(Math.round(time));
    const hours = Math.floor(t / (60*60));
    const minutes = Math.floor(t % (60*60) / 60);
    const seconds = t % 60;
    const prefix = (time < 0 ? "-" : "");
    return (prefix + hours + ":" + ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2));
  }

  const togglePlay = () => {
    if (time.start) {
      const next = {
        ...time,
        start: 0,
        offset: time.playtime,
      };
      setTime(next);
      localStorage.setItem("time", JSON.stringify(next));
    }
    else {
      const next = {
        ...time,
        start: new Date().getTime() / 1000,
      };
      setTime(next);
      localStorage.setItem("time", JSON.stringify(next));
    }
  }

  return (
    <>
      <CssBaseline />

      <div className="banner"></div>

      <Main
        titles={titles}
        time={time}
        setTime={setTime}
        blinds={blinds}
        buyin={buyin}
        currency={currency}
        formatTime={formatTime}
        togglePlay={togglePlay}
        guaranteed={guaranteed}
      ></Main>

      <Payouts
        pool={pool}
        payout={payout}
        buyin={buyin}
        currency={currency}
        full_buyins={full_buyins}
        setBuyins={setBuyins}
        guaranteed={guaranteed}
      ></Payouts>

      <Blinds
        blinds={blinds}
        time={time}
      />

      <ButtonGroup className="buyin-buttons">
        <StyledButton onClick={() => setBuyinsHandler(-1)}>-</StyledButton>
        <StyledButton disabled style={{color:"white"}}>Buyins ({buyins})</StyledButton>
        <StyledButton onClick={() => setBuyinsHandler(+1)}>+</StyledButton>
      </ButtonGroup>

      <IconButton style={{color:"white",position:"absolute",top:0,right:0,}} onClick={toggleSettingsHandler}>
        <SettingsIcon fontSize="large"/>
      </IconButton>

      {showSettings ? (
        <Settings
          full_buyins={full_buyins}
          setFullBuyins={setFullBuyins}
          payout={payout}
          setPayout={setPayout}
          setShowSettings={setShowSettings}
          titles={titles}
          setTitles={setTitles}
          time={time}
          setTime={setTime}
          formatTime={formatTime}
          togglePlay={togglePlay}
          guaranteed={guaranteed}
          setGuaranteed={setGuaranteed}
          blinds={blinds}
          setBlinds={setBlinds}
          buyin={buyin}
          setBuyin={setBuyin}
          currency={currency}
          setCurrency={setCurrency}
        ></Settings>
      ) : (
        ""
      )}
    </>
  );
}

export default App;
