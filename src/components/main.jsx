import React, { useEffect } from "react";

function Main(props) {
  const { title, subtitle } = props.titles;
  const { time, formatTime, togglePlay } = props;
  const setTime = props.setTime;
  const blinds = props.blinds;
  const buyin = props.buyin;
  const currency = props.currency;

  useEffect(() => {
    const interval = setInterval(() => {
        if (time.start) {
          const c = new Date().getTime() / 1000;
          const p = c - time.start + time.offset;
          let f = Math.floor((time.playtime) / (blinds.interval * 60));
          if (f<0) f = 0;
          if (f>23) f = 23;
          const next = {...time, playtime: p, level: f}
          setTime(next);
          localStorage.setItem("time", JSON.stringify(next));
        }
      }, 1000);
    return () => clearInterval(interval);
  }, [ time, setTime, blinds ]);


  function replaceHolders(text) {
    let newText = text;
    newText = newText.replace("%buyin", buyin+currency);
    return newText
  }


  const getBlinds = (blinds, offset=0) => {
    if (time.playtime < 0 && offset===0) return "countdown"
    if (time.playtime < 0 && offset===1) offset=0;
    const small = blinds.small[time.level + offset];
    return small + " / " + (small * 2);
  }

  return (
    <div className="main">
      <h1>{replaceHolders(title)}</h1>
      <h3>{replaceHolders(subtitle)}</h3>
      <div className="time" onClick={togglePlay}>{formatTime(time.playtime)}{time.start ? "" : <span style={{fontSize:"0.5em"}}> (paused)</span>}</div>
      <div className="blinds">{getBlinds(blinds)}</div>
      <div className="next-blinds">next: {getBlinds(blinds, 1)}</div>
    </div>
  );
}

export default Main;
