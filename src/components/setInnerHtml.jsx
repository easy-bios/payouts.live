import React, { useState } from "react";

function Main(props) {
  const { title, subtitle } = props.titles;
  const [ hContent, setHContent ] = useState(`<h1>test</h1>
test123
<p class="pTest">whattoto</p>

<style>.pTest{ color:#f00;}</style>`);

  return (
    <div className="main">
      <h1>{title}</h1>
      <h3>{subtitle}</h3>
      <textarea value={hContent} style={{width: "320px", height: "180px"}} onChange={(e) => {
        setHContent(e.target.value);
        }}/>
      <div dangerouslySetInnerHTML={{__html: hContent}}></div>
    </div>
  );
}

export default Main;
