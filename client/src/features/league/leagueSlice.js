import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLeagueStandings = createAsyncThunk(
  "league/fetchStandings",
  async (leagueId) => {
    const response = await axios.get(`/api/leagues/${leagueId}/table`);
    console.log(response.data.league);
    return response.data;
  }
);

const leagueSlice = createSlice({
  name: "league",
  initialState: {
    league: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeagueStandings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLeagueStandings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.league = action.payload;
      })
      .addCase(fetchLeagueStandings.rejected, (state, action) => {
        state.status = "succeeded";
        state.error = action.error.message;
      });
  },
});

export default leagueSlice.reducer;
