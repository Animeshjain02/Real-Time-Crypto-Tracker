

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const fetchAssets = createAsyncThunk(
  "crypto/fetchAssets",
  async (perPage = 50) => {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=1&sparkline=true`
    );
    if (!res.ok) throw new Error("Failed to fetch assets");
    return await res.json(); 
  }
);



const cryptoSlice = createSlice({
  name: "crypto",
  initialState: {
    assets: [],
    status: "idle",
    error: null,
    lastUpdated: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssets.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAssets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.assets = action.payload;
        state.lastUpdated = Date.now();
      })
      .addCase(fetchAssets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default cryptoSlice.reducer;

