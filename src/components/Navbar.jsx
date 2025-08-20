import React from "react";

export default function Navbar({ query, setQuery, perPage, setPerPage }){
  return (
    <header className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-md bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-black font-bold">CT</div>
          <div>
            <div className="text-lg font-semibold">Crypto Tracker</div>
            <div className="text-xs text-slate-400">Real-time markets</div>
          </div>
        </div>

        <div className="flex-1 px-4">
          <div className="max-w-2xl mx-auto">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search coin name or symbol (e.g. bitcoin, eth)"
              className="w-full bg-slate-800 text-sm placeholder:text-slate-400 border border-slate-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={perPage}
            onChange={(e) => setPerPage(Number(e.target.value))}
            className="bg-slate-800 text-sm border border-slate-700 rounded px-2 py-1"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <button className="bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded text-sm font-medium">Watchlist</button>
        </div>
      </div>
    </header>
  );
}
