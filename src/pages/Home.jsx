import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssets } from "../redux/cryptoSlice";
import CryptoTable from "../components/CryptoTable";

export default function Home() {
  const dispatch = useDispatch();
  const { assets, status, error, lastUpdated } = useSelector((s) => s.crypto);
  const perPage = 50;

  useEffect(() => {
    
    dispatch(fetchAssets(perPage));

   
    const interval = setInterval(() => {
      dispatch(fetchAssets(perPage));
    }, 1500000); 

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div>
      <header className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center font-bold text-black">CT</div>
            <div>
              <div className="text-lg font-semibold">Crypto Tracker</div>
              <div className="text-xs text-slate-400">Real market data · updates every 15s</div>
            </div>
          </div>

          <div className="text-sm text-slate-400">
            {lastUpdated ? `Last updated: ${new Date(lastUpdated).toLocaleTimeString()}` : ""}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {status === "loading" && (
          <div className="py-12 text-center text-slate-400">Loading market data…</div>
        )}

        {status === "failed" && (
          <div className="py-6 text-center text-rose-400">Failed to load data: {error}</div>
        )}

        {status === "succeeded" && <CryptoTable coins={assets} />}
      </main>
    </div>
  );
}
