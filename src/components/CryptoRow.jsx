import React, { useMemo } from "react";
import MiniChart from "./MiniChart";

export default function CryptoRow({ coin, index }) {

  const isUp = coin.current_price >= (coin.prevPrice ?? coin.current_price);

  const change24 = coin.price_change_percentage_24h ?? 0;
  const change7d = coin.price_change_percentage_7d_in_currency ?? coin.price_change_percentage_7d ?? 0;

  const priceClass = useMemo(() => (isUp ? "price-flash-green" : "price-flash-red"), [isUp]);

  const fmt = (n) => {
    if (n === null || n === undefined) return "—";
    if (Math.abs(n) >= 1e12) return (n / 1e12).toFixed(2) + "T";
    if (Math.abs(n) >= 1e9) return (n / 1e9).toFixed(2) + "B";
    if (Math.abs(n) >= 1e6) return (n / 1e6).toFixed(2) + "M";
    if (Math.abs(n) >= 1e3) return (n / 1e3).toFixed(2) + "K";
    return Number(n).toLocaleString();
  };

  return (
    <tr className="border-t border-slate-700 hover:bg-slate-800 transition-colors">
      <td className="p-3 w-12">{index + 1}</td>

      <td className="p-3 flex items-center gap-3">
        <img src={coin.image} alt={coin.name} className="h-8 w-8 rounded-full object-cover" />
        <div>
          <div className="font-medium">{coin.name}</div>
          <div className="text-xs text-slate-400 uppercase">{coin.symbol}</div>
        </div>
      </td>

      <td className={`p-3 text-right font-medium ${priceClass}`}>
        ${Number(coin.current_price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}
      </td>

      <td className={`p-3 text-right font-medium ${change24 >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
        {Number(change24).toFixed(2)}%
      </td>

      <td className="p-3 text-right hidden md:table-cell">{Number(change7d).toFixed(2)}%</td>

      <td className="p-3 text-right hidden lg:table-cell">${fmt(coin.market_cap)}</td>

      <td className="p-3 text-right hidden lg:table-cell">${fmt(coin.total_volume)}</td>

      <td className="p-3 text-right w-36">
        <MiniChart data={coin.sparkline_in_7d?.price ?? []} positive={coin.current_price >= (coin.sparkline_in_7d?.price?.[0] ?? coin.current_price)} />
      </td>
    </tr>
  );
}
