import React from "react";

function Blinds(props) {
  const { blinds, time } = props;

  const rows = [];
  for (var i=0 ; i<24 ; i++) {
    let small = blinds.small[i];
    rows.push(<div key={i} className="payout" style={i===time.level&&time.playtime>0?{color:"red"}:{}}><span>{i+1}.</span><span>{small} / {small*2}</span></div>);
  }

  return (
    <div className="blindslist">
      <h3 style={{textAlign:"center"}}>Blinds</h3>
      <div className="overflow-container">
        { rows }
      </div>
    </div>
  );
}

export default Blinds;
