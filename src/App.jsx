

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssets } from "./redux/cryptoSlice";
import { LineChart, Line, ResponsiveContainer } from "recharts";

export default function App() {
  const dispatch = useDispatch();
  const { assets, status } = useSelector((state) => state.crypto);

  useEffect(() => {
    dispatch(fetchAssets());
    const interval = setInterval(() => {
      dispatch(fetchAssets());
    }, 10000); 
    return () => clearInterval(interval);
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Failed to load data</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Crypto Tracker</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Price (USD)</th>
            <th className="border p-2">Market Cap</th>
            <th className="border p-2">Change (24h)</th>
            <th className="border p-2">7d Chart</th> {/* New column */}
          </tr>
        </thead>
        <tbody>
          {assets.map((coin) => (
            <tr key={coin.id}>
              <td className="border p-2">{coin.name}</td>
              <td className="border p-2">${coin.current_price.toLocaleString()}</td>
              <td className="border p-2">
                ${Number(coin.market_cap / 1e9).toFixed(2)}B
              </td>
              <td
                className={`border p-2 ${
                  coin.price_change_percentage_24h >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </td>
              
            <td className="border p-2 w-32 h-16">
  {coin.sparkline_in_7d?.price ? (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={coin.sparkline_in_7d.price.map((p, i) => ({ t: i, p }))}>
        <Line
          type="monotone"
          dataKey="p"
          stroke={coin.price_change_percentage_24h >= 0 ? "#16a34a" : "#dc2626"}
          dot={false}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  ) : (
    <span>No data</span>
  )}
</td>



            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
