import React from "react";
import CryptoRow from "./CryptoRow";

export default function CryptoTable({ coins = [] }) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-lg bg-slate-800 border border-slate-700">
      <table className="min-w-full">
        <thead className="sticky top-0 bg-slate-900 text-slate-300">
          <tr>
            <th className="p-3 text-left">#</th>
            <th className="p-3 text-left">Coin</th>
            <th className="p-3 text-right">Price</th>
            <th className="p-3 text-right">24h %</th>
            <th className="p-3 text-right hidden md:table-cell">7d %</th>
            <th className="p-3 text-right hidden lg:table-cell">Market Cap</th>
            <th className="p-3 text-right hidden lg:table-cell">Volume</th>
            <th className="p-3 text-right">7d</th>
          </tr>
        </thead>

        <tbody>
          {coins.map((coin, idx) => (
            <CryptoRow coin={coin} index={idx} key={coin.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
