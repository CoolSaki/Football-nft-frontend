import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loader: false,
  isProgress: false,
  fetchPlayerStatsError: '',
  fetchPlayerStatsData: [],
  fetchPlayerStatsRateData: '',
  fetchSinglePlayerStatsError: '',
  fetchSinglePlayerStatsData: [],
  fetchSinglePlayerStatsRateData: '',
}

const playerStatsSlice = createSlice({
  name: 'playerstats',
  initialState,
  reducers: {
    fetchPlayersStats(state, action) {
      state.loader = true
      //   state.fetchPlayerStatsError = ''
      // state.fetchPlayerStatsData = ''
    },
    fetchPlayersStatsSuccess(state, action) {
      state.loader = false
      state.fetchPlayerStatsError = ''
      state.fetchPlayerStatsData = action.payload.data.list
      state.fetchPlayerStatsRateData = action.payload.data.exchangeRateUSD
    },
    fetchPlayersStatsError(state, action) {
      state.loader = false
      state.fetchPlayerStatsError = 'Error Occured'
      state.fetchPlayerStatsData = ''
      state.fetchPlayerStatsRateData = ''
    },
    fetchSinglePlayerStats(state, action) {
      // state.loader = true
      state.isProgress = true
      //   state.fetchPlayerStatsError = ''
      // state.fetchPlayerStatsData = ''
    },
    fetchSinglePlayersStatsSuccess(state, action) {
      state.isProgress = false
      state.fetchSinglePlayerStatsError = ''
      state.fetchSinglePlayerStatsData = action.payload.data.list
      state.fetchSinglePlayerStatsRateData = action.payload.data.exchangeRateUSD
    },
    fetchSinglePlayersStatsError(state, action) {
      state.isProgress = false
      state.fetchSinglePlayerStatsError = 'Error Occured'
      state.fetchSinglePlayerStatsData = ''
      state.fetchSinglePlayerStatsRateData = ''
    },
  },
})

export const {
  fetchPlayersStats,
  fetchPlayersStatsSuccess,
  fetchPlayersStatsError,
  fetchSinglePlayerStats,
  fetchSinglePlayersStatsSuccess,
  fetchSinglePlayerStatsError,
} = playerStatsSlice.actions
export default playerStatsSlice.reducer
