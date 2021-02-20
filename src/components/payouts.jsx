import React from "react";

function Payouts(props) {
  const { pool, payout, buyin, currency, full_buyins, guaranteed } = props;

  function getPayouts() {
    let total = guaranteed > pool ? guaranteed : pool;
    let remaining = total;

    if (full_buyins) {
      total /= buyin;
      remaining /= buyin;
    }

    const pays = payout.map((x) => {
      let p = Math.round(x.payout / 100 * total);
      p = p < remaining ? p : remaining;
      remaining -= p;
      p = full_buyins ? p * buyin : p;
      return {id: x.id, payout: p};
    });
    return pays;
  }

  return (
    <div className="payouts">
      <h3 style={{textAlign:"center"}}>Pool: {pool>=guaranteed?pool:guaranteed} {currency}</h3>

      <div className="overflow-container">
        {getPayouts().map((p) => (
          <div key={p.id} className="payout"><span>{p.id+1}.</span><span>{p.payout} {currency}</span></div>
        ))}
      </div>
    </div>
  );
}

export default Payouts;
