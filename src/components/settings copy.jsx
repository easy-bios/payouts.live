import React from "react";
import SwipeableViews from 'react-swipeable-views';

import { Checkbox, Button, ButtonGroup, Tabs, Tab } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const StyledButton = withStyles({
  root: {
    color: 'white',
    fontSize: '0.67em',
  },
})(Button);

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
    formatTime,
    guaranteed,
    setGuaranteed,
  } = props;
  const { title, subtitle } = titles;

  const guaranteedHandler = (e) => {
    const minPayout = parseInt(e.target.value.replace(/[^0-9]/g, ""))
    localStorage.setItem("minPayout", minPayout);
    setGuaranteed(minPayout);
  };

  const setPayoutHandler = (e, key) => {
    const newPayout = [];
    payout.map((p) => newPayout.push({...p}))
    newPayout[key].payout = parseInt(e.target.value.replace(/[^0-9]/g, ""));
    setPayout(newPayout)
  };

  const removePayoutHandler = () => {
    const newPayout = [];
    payout.map((p) => newPayout.push({...p}))
    newPayout.pop();
    setPayout(newPayout)
  };

  const addPayoutHandler = () => {
    const newPayout = [];
    payout.map((p) => newPayout.push({...p}))
    newPayout.push({id: payout.length, payout: 0});
    setPayout(newPayout)
  };

  const setTitleHandler = (e) => {
    setTitles({ ...titles, title: e.target.value });
    localStorage.setItem("title", e.target.value);
  };

  const setSubtitleHandler = (e) => {
    setTitles({ ...titles, subtitle: e.target.value });
    localStorage.setItem("subtitle", e.target.value);
  };

  return (
    <div
      className="lightbox"
      onClick={(e) => {
        if (e.target.classList.contains("lightbox")) setShowSettings(false);
      }}
    >
      <div className="settings">
        <div className="tabs">
          <Tabs value={currentTab} onChange={changeTab} variant="fullWidth">
            <Tab label="Game" />
            <Tab label="Payouts" />
            <Tab label="Blinds" />
          </Tabs>
        </div>

        <SwipeableViews index={currentTab} onChangeIndex={setCurrentTab}>
        <div className="tab">
        {currentTab === 0 &&
          <div>
            <h5>Playtime:</h5>
            <div>{formatTime(time.playtime)}{time.start ? "" : <span style={{fontSize:"0.5em"}}> (paused)</span>}</div>
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

            <h5>Title:</h5>
            <input type="text" className="input-text" value={title} onChange={(e) => setTitleHandler(e)} />

            <h5>Subtitle:</h5>
            <input
              type="text"
              className="input-text"
              value={subtitle}
              onChange={(e) => setSubtitleHandler(e)}
            />
          </div>
        }
        </div>

<div className="tab">
{currentTab === 1 &&
<div>
  <h5>Guaranteed Prize Pool:</h5>
  <input value={guaranteed} onChange={(e) => guaranteedHandler(e)} />

  <h5>Payouts:</h5>
  <div>
    {payout.map((p) => (
      <div key={p.id}>
        <span>{p.id + 1}. </span>
        <input value={p.payout} onChange={(e) => setPayoutHandler(e, p.id)} />
        <span>%</span>
      </div>
      ))}
  </div>
  <ButtonGroup className="payout-buttons" aria-label="set blinds Button group">
    <StyledButton onClick={removePayoutHandler}>-</StyledButton>
    <StyledButton disabled style={{color:"white"}}>Payouts</StyledButton>
    <StyledButton onClick={addPayoutHandler}>+</StyledButton>
  </ButtonGroup>
  <h5>Options:</h5>
  <div>
    Round to full buyins:
    <Checkbox
      checked={full_buyins}
      onChange={() => setFullBuyins((prev) => !prev)}
    />
  </div>
</div>
}
</div>

<div className="tab">
{currentTab === 2 &&
<div>
  <h5>Guaranteed Prize Pool:</h5>
  <input value={guaranteed} onChange={(e) => guaranteedHandler(e)} />

  <h5>Payouts:</h5>
  <div>
    {payout.map((p) => (
      <div key={p.id}>
        <span>{p.id + 1}. </span>
        <input value={p.payout} onChange={(e) => setPayoutHandler(e, p.id)} />
        <span>%</span>
      </div>
      ))}
  </div>
  <ButtonGroup className="payout-buttons" aria-label="set blinds Button group">
    <StyledButton onClick={removePayoutHandler}>-</StyledButton>
    <StyledButton disabled style={{color:"white"}}>Payouts</StyledButton>
    <StyledButton onClick={addPayoutHandler}>+</StyledButton>
  </ButtonGroup>
  <h5>Options:</h5>
  <div>
    Round to full buyins:
    <Checkbox
      checked={full_buyins}
      onChange={() => setFullBuyins((prev) => !prev)}
    />
  </div>
</div>
}
</div>
        </SwipeableViews>
      </div>
    </div>
  );
};

export default Settings;
