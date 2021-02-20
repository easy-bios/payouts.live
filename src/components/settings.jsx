import React from "react";
import SwipeableViews from 'react-swipeable-views';

import { Checkbox, Button, ButtonGroup, Tabs, Tab, OutlinedInput, InputAdornment, Select, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const StyledButton = withStyles({
  root: {
    color: 'white',
    height: '1.67em',
    marginTop: '0.5em',
    // borderColor: 'white',
  },
})(Button);

const StyledInput = withStyles({
  root: {
    color: 'white',
    height: '1.67em',
    marginTop: '0.5em',
    // '& .MuiOutlinedInput-notchedOutline': {
    //   borderColor: 'white',
    // },
  },
})(OutlinedInput);

const Settings = (props) => {
  const [currentTab, setCurrentTab] = React.useState(0);

  const changeTab = (event, newTab) => {
    setCurrentTab(newTab);
  };

  const {
    full_buyins,
    setFullBuyins,
    payout,
    setPayout,
    setShowSettings,
    titles,
    setTitles,
    time,
    setTime,
    togglePlay,
    formatTime,
    guaranteed,
    setGuaranteed,
    blinds,
    setBlinds,
    buyin,
    setBuyin,
    currency,
    setCurrency,
  } = props;
  const { title, subtitle } = titles;

  const currencyHandler = (e) => {
    const newCurrency = e.target.value;
    setCurrency(newCurrency);
    localStorage.setItem("currency", JSON.stringify(newCurrency));
  };

  const intervalHandler = (e) => {
    const newInterval = parseInt(e.target.value.replace(/[^0-9]/g, ""));
    setBlinds({...blinds, interval: newInterval});
    localStorage.setItem("interval", JSON.stringify(newInterval));
  };

  const blindsHandler = (e) => {
    const newBlinds = [parseInt(e.target.value.replace(/[^0-9]/g, ""))];
    for (var i=1 ; i<24 ; i++) {
      newBlinds.push(newBlinds[newBlinds.length-1] + newBlinds[0] * Math.pow(2, Math.floor(i/4)));
    }
    setBlinds({...blinds, small: newBlinds});
    localStorage.setItem("blinds", JSON.stringify(newBlinds));
  };

  const buyinHandler = (e) => {
    const newBuyin = parseInt(e.target.value.replace(/[^0-9]/g, ""))
    localStorage.setItem("buyin", JSON.stringify(newBuyin));
    setBuyin(newBuyin);
  };

  const guaranteedHandler = (e) => {
    const minPayout = parseInt(e.target.value.replace(/[^0-9]/g, ""))
    localStorage.setItem("minPayout", JSON.stringify(minPayout));
    setGuaranteed(minPayout);
  };

  const setPayoutHandler = (e, key) => {
    const newPayout = [];
    payout.map((p) => newPayout.push({...p}))
    newPayout[key].payout = parseInt(e.target.value.replace(/[^0-9]/g, ""));
    setPayout(newPayout)
    localStorage.setItem("payouts", JSON.stringify(newPayout));
  };

  const removePayoutHandler = () => {
    const newPayout = [];
    payout.map((p) => newPayout.push({...p}))
    newPayout.pop();
    setPayout(newPayout)
    localStorage.setItem("payouts", JSON.stringify(newPayout));
  };

  const addPayoutHandler = () => {
    const newPayout = [];
    payout.map((p) => newPayout.push({...p}))
    newPayout.push({id: payout.length, payout: 0});
    setPayout(newPayout)
    localStorage.setItem("payouts", JSON.stringify(newPayout));
  };

  const setTitleHandler = (e) => {
    setTitles({ ...titles, title: e.target.value });
    localStorage.setItem("title", JSON.stringify(e.target.value));
  };

  const setSubtitleHandler = (e) => {
    setTitles({ ...titles, subtitle: e.target.value });
    localStorage.setItem("subtitle", JSON.stringify(e.target.value));
  };

  return (
    <div
      className="lightbox"
      onClick={(e) => {
        if (!e.target.classList) return
        if (e.target.classList.contains("lightbox")) setShowSettings(false);
      }}
    >
      <div className="settings">
        <div className="tabs">
          <Tabs value={currentTab} onChange={changeTab} variant="fullWidth">
            <Tab label="Gameplay" />
            <Tab label="Payouts" />
            <Tab label="About" />
          </Tabs>
        </div>

        <SwipeableViews index={currentTab} onChangeIndex={setCurrentTab} style={{height:"100%"}}>
        <div className="tab">
          <h3>Playtime:</h3>
          <div onClick={togglePlay} style={{fontSize:"2em", cursor:"pointer"}}>{formatTime(time.playtime)}{time.start ? "" : <span style={{fontSize:"0.5em"}}> (paused)</span>}</div>
          <ButtonGroup className="time-buttons">
            <StyledButton onClick={() => {
              const next = {
                ...time,
                offset: time.offset-60,
                playtime: time.playtime-60,
              };
              setTime(next);
              localStorage.setItem("time", JSON.stringify(next));
            }}>-</StyledButton>
            <StyledButton onClick={() => {
              const next = {
                start: 0,
                offset: 0,
                playtime: 0,
                level: 0,
              };
              setTime(next);
              localStorage.setItem("time", JSON.stringify(next));
            }}>reset</StyledButton>
            <StyledButton onClick={() => {
              const next = {
                ...time,
                offset: time.offset+60,
                playtime: time.playtime+60,
              };
              setTime(next);
              localStorage.setItem("time", JSON.stringify(next));
            }}>+</StyledButton>
          </ButtonGroup>

          <h3>First Small-Blind:</h3>
          <StyledInput
            value={blinds.small[0] || ""}
            onChange={(e) => blindsHandler(e)}
            />
          <h3>Blinds Interval:</h3>
          <StyledInput
            value={blinds.interval || ""}
            onChange={(e) => intervalHandler(e)}
            endAdornment={<InputAdornment position="end"><span style={{color:"white"}}>min</span></InputAdornment>}
            />
        </div>

        <div className="tab">
          <h3>Buyin:</h3>
          <StyledInput
            value={buyin || ""}
            onChange={(e) => buyinHandler(e)}
            endAdornment={<InputAdornment position="end"><span style={{color:"white"}}>{currency}</span></InputAdornment>}
            />

          <br/><h3 style={{display:"inline-block"}}>Currency: </h3>
          <Select className="currency-select" value={currency} onChange={currencyHandler} 
            style={{color:"white", minWidth:"3em"}}>
            <MenuItem value="€">€</MenuItem>
            <MenuItem value="$">$</MenuItem>
            <MenuItem value="£">£</MenuItem>
            <MenuItem value="₽">₽</MenuItem>
            <MenuItem value="元">元</MenuItem>
            <MenuItem value="¥">¥</MenuItem>
          </Select>

          <h3>Guaranteed Prize Pool:</h3>
          <StyledInput
            value={guaranteed || ""}
            onChange={(e) => guaranteedHandler(e)}
            endAdornment={<InputAdornment position="end"><span style={{color:"white"}}>{currency}</span></InputAdornment>}
            />

          <h3>Payouts:</h3>
          <div>
            {payout.map((p) => (
              <div key={p.id}>
                {/* <span>{p.id + 1}. </span> */}
                <StyledInput
                  value={p.payout || ""}
                  onChange={(e) => setPayoutHandler(e, p.id)}
                  startAdornment={<InputAdornment position="start"><span style={{color:"white"}}>{p.id + 1}. </span></InputAdornment>}
                  endAdornment={<InputAdornment position="end"><span style={{color:"white"}}>%</span></InputAdornment>}
                />
              </div>
              ))}
          </div>
          <ButtonGroup className="payout-buttons" aria-label="set blinds Button group">
            <StyledButton onClick={removePayoutHandler}>-</StyledButton>
            <StyledButton disabled style={{color:"white"}}>Payouts</StyledButton>
            <StyledButton onClick={addPayoutHandler}>+</StyledButton>
          </ButtonGroup>

          <h3>Options:</h3>
          <div>
            Round to full buyins:
            <Checkbox
              checked={full_buyins}
              onChange={() => setFullBuyins((prev) => {localStorage.setItem("full_buyins", JSON.stringify(!prev)); return !prev})}
            />
          </div>
        </div>

        <div className="tab">
          <h3>Title:</h3>
          <StyledInput
            className="input-text"
            value={title} onChange={(e) => setTitleHandler(e)}
            />

          <h3>Subtitle:</h3>
          <StyledInput
            className="input-text"
            value={subtitle}
            onChange={(e) => setSubtitleHandler(e)}
          />
        </div>
        </SwipeableViews>
      </div>
    </div>
  );
};

export default Settings;
