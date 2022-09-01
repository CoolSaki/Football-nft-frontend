import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  tokenExpired: false,
  isCreatePlayerError: '',
  isCreatePlayerSuccess: '',
  isGetPlayerError: '',
  isGetPlayerSuccess: '',
  isFetchPlayerSuccess: '',
  playerData: {
    artistname: '',
    dateofbirth: '',
    email: '',
    givenname: '',
    nationality: '',
    surname: '',
  },
  isUpdatePlayerProfileError: '',
  isUpdatePlayerProfileSuccess: '',
  allPlayersData: [],
  allPlayersList: [],
  playersTableData: [],
  isFetchListPlayerError: '',
  playersListData: [],
  isFetchListPlayerSuccess: '',
  playersBannerData: [],
  playersDraftsData: [],
  totalPlayersCount: 0,
  nextPlayerListUrl: '',
  previousPlayerListUrl: '',
  isGetAllPlayerError: '',
  isFetchAllPlayerError: '',
  getPlayerDetailsErrorMsg: '',
  getPlayerDetailsSuccessData: null,
  newPlayerId: null,
  tempAlteration: false,
  playerDetailStatus: 'initial',
  playerActivationStatus: 'deployed',
  // fetchPlayerStatsError: '',
  // fetchPlayerStatsData: [],
  // fetchPlayerStatsRateData: '',
}

const playerCoinsSlice = createSlice({
  name: 'playercoins',
  initialState,
  reducers: {
    createPlayer(state, action) {
      state.isLoading = true
      state.isCreatePlayerError = ''
      state.playerData = action.payload
      state.newPlayerId = null
    },
    createPlayerSuccess(state, action) {
      console.log('CPS---', action)
      state.isLoading = false
      state.isCreatePlayerSuccess = action.payload.message
      state.newPlayerId = action.payload.data.id
    },
    createPlayerFailure(state, action) {
      const { payload } = action
      state.isLoading = false
      state.isCreatePlayerError =
        action.payload.response.data.message || 'Something went wrong'
      state.playerData = {
        artistname: '',
        dateofbirth: '',
        email: '',
        givenname: '',
        nationality: '',
        surname: '',
      }
    },
    getPlayerData(state) {
      state.isLoading = true
      state.isGetPlayerError = ''
      // state.allPlayersData = []
    },
    getPlayerDataSuccess(state, action) {
      console.log('wwee---', action)
      state.isLoading = false
      state.isGetPlayerSuccess = action.payload.message
      state.allPlayersData = action.payload.data
    },
    getPlayerDataFailure(state, action) {
      const { payload } = action
      console.log('JJooop---', action.payload.response)
      state.isLoading = false
      state.isGetPlayerError = action.payload.response.data.message
      if (
        action.payload.response.status === '403' ||
        action.payload.response.status === 403
      ) {
        state.tokenExpired = true
      }
    },
    getAllPlayers(state) {
      state.isLoading = true
      state.isGetAllPlayerError = ''
      state.allPlayersList = []
      // state.totalPlayersCount = ''
      state.nextPlayerListUrl = ''
      state.previousPlayerListUrl = ''
    },
    getAllPlayersSuccess(state, action) {
      console.log({ action })
      state.isLoading = false
      state.totalPlayersCount = action.payload.count
      state.nextPlayerListUrl = action.payload.next
      state.previousPlayerListUrl = action.payload.previous
      state.isGetPlayerSuccess = action.payload.message
      state.allPlayersList = action.payload.results
    },
    getAllPlayersFailure(state, action) {
      const { payload } = action
      state.isLoading = false
      state.totalPlayersCount = 0
      state.isGetAllPlayerError = action.payload.response.data.detail
      if (
        action.payload.response.status === '403' ||
        action.payload.response.status === 403
      ) {
        state.tokenExpired = true
      }
    },
    fetchAllPlayers(state, action) {
      state.isLoading = true
      state.isFetchAllPlayerError = ''
      state.playersTableData = []
      // state.totalPlayersCount = ''
      state.previousPlayerListUrl = ''
    },
    fetchListPlayers(state, action) {
      state.isLoading = true
      state.isFetchListPlayerError = ''
      state.playersListData = []
      // state.totalPlayersCount = ''
      state.previousPlayerListUrl = ''
    },
    resetAllPlayers(state) {
      state.playersTableData = []
    },
    fetchTickerBanner(state, action) {
      state.isLoading = true
      state.isFetchAllPlayerError = ''
      state.playersBannerData = []
      // state.totalPlayersCount = ''
      state.previousPlayerListUrl = ''
    },
    fetchDraftPlayers(state, action) {
      state.isLoading = true
      state.isFetchAllPlayerError = ''
      state.playersDraftsData = []
      // state.totalPlayersCount = ''
      state.previousPlayerListUrl = ''
    },
    fetch(state, action) {
      state.isLoading = true
      state.isFetchAllPlayerError = ''
      state.playersTableData = []
      // state.totalPlayersCount = ''
      state.previousPlayerListUrl = ''
    },
    fetchAllPlayersSuccess(state, action) {
      state.isLoading = false
      state.totalPlayersCount = action.payload.count
      state.nextPlayerListUrl = action.payload.next
      state.previousPlayerListUrl = action.payload.previous
      state.isFetchPlayerSuccess = action.payload.message
      state.playersTableData = action.payload.results
    },
    fetchListPlayersSuccess(state, action) {
      state.isLoading = false
      state.totalPlayersCount = action.payload.count
      state.nextPlayerListUrl = action.payload.next
      state.previousPlayerListUrl = action.payload.previous
      state.isFetchListPlayerSuccess = action.payload.message
      state.playersListData = action.payload.results
    },
    fetchAllPlayersFailure(state, action) {
      const { payload } = action
      state.isLoading = false
      state.totalPlayersCount = 0
      state.isFetchAllPlayerError = action.payload.response.data.detail
      if (
        action.payload.response.status === '403' ||
        action.payload.response.status === 403
      ) {
        state.tokenExpired = true
      }
    },
    fetchTickerBannerSuccess(state, action) {
      state.isLoading = false
      state.totalPlayersCount = action.payload.count
      state.nextPlayerListUrl = action.payload.next
      state.previousPlayerListUrl = action.payload.previous
      state.isFetchPlayerSuccess = action.payload.message
      state.playersBannerData = action.payload.results
    },
    fetchTickerBannerFailure(state, action) {
      const { payload } = action
      state.isLoading = false
      state.totalPlayersCount = 0
      state.isFetchAllPlayerError = action.payload.response.data.detail
      if (
        action.payload.response.status === '403' ||
        action.payload.response.status === 403
      ) {
        state.tokenExpired = true
      }
    },
    fetchDraftPlayersSuccess(state, action) {
      state.isLoading = false
      state.totalPlayersCount = action.payload.count
      state.nextPlayerListUrl = action.payload.next
      state.previousPlayerListUrl = action.payload.previous
      state.isFetchPlayerSuccess = action.payload.message
      state.playersDraftsData = action.payload.results
    },
    fetchDraftPlayersFailure(state, action) {
      const { payload } = action
      state.isLoading = false
      state.totalPlayersCount = 0
      state.isFetchListPlayerError = action.payload.response.data.detail
      if (
        action.payload.response.status === '403' ||
        action.payload.response.status === 403
      ) {
        state.tokenExpired = true
      }
    },
    fetchListPlayersFailure(state, action) {
      const { payload } = action
      state.isLoading = false
      state.totalPlayersCount = 0
      state.isFetchListPlayerError = action.payload.response.data.detail
      if (
        action.payload.response.status === '403' ||
        action.payload.response.status === 403
      ) {
        state.tokenExpired = true
      }
    },

    // fetchPlayersStats(state, action) {
    //   state.isLoading = true
    //   state.fetchPlayerStatsError = ''
    //   // state.fetchPlayerStatsData = ''
    // },
    // fetchPlayersStatsSuccess(state, action) {
    //   console.log('FPSS---', action)
    //   state.isLoading = false
    //   state.fetchPlayerStatsError = ''
    //   state.fetchPlayerStatsData = action.payload.data.list
    //   state.fetchPlayerStatsRateData = action.payload.data.exchangeRateUSD
    // },
    // fetchPlayersStatsError(state, action) {
    //   console.log('FPSE---', action.payload.response)
    //   state.isLoading = false
    //   state.fetchPlayerStatsError = 'Error Occured'
    //   state.fetchPlayerStatsData = ''
    //   state.fetchPlayerStatsRateData = ''
    // },
    updatePlayerProfile(state, action) {
      state.isLoading = true
      state.isUpdatePlayerProfileError = ''
      // state.playerData = ''
    },
    updatePlayerProfileSuccess(state, action) {
      console.log('UPPED---', action.payload)
      state.isLoading = false
      state.isUpdatePlayerProfileSuccess = action.payload.message
    },
    updatePlayerProfileFailure(state, action) {
      const { payload } = action
      console.log('UPPE---', action.payload.response)
      state.isLoading = false
      state.isUpdatePlayerProfileError = 'Some error occured'
      // state.playerData = null
    },
    resetPlayerData(state) {
      state.allPlayersData = []
      state.isLoading = false
      state.isGetPlayerError = ''
      state.isGetPlayerSuccess = ''
      state.isCreatePlayerError = ''
      ;(state.isCreatePlayerSuccess = ''),
        (state.isUpdatePlayerProfileError = ''),
        (state.isUpdatePlayerProfileSuccess = ''),
        (state.playerData = {
          artistname: '',
          dateofbirth: '',
          email: '',
          givenname: '',
          nationality: '',
          surname: '',
        })
    },
    getPlayerDetails(state, action) {
      state.isLoading = true
      state.getPlayerDetailsErrorMsg = ''
      // state.getPlayerDetailsSuccessData = null
    },
    getPlayerDetailsSuccess(state, action) {
      console.log('GPDS---', action)
      state.isLoading = false
      state.getPlayerDetailsSuccessData = action.payload.data[0]
    },
    resetPlayerDetails(state) {
      state.isLoading = false
      state.getPlayerDetailsSuccessData = null
      state.getPlayerDetailsErrorMsg = ''
    },
    getPlayerDetailsError(state, action) {
      console.log('GPDE---', action)
      state.isLoading = false
      state.getPlayerDetailsErrorMsg = action.payload.response.data.detail
    },
    setGoLive(state) {
      if (state.allPlayersData.length > 0) {
        const temp = state.allPlayersData[0]
        temp.playerstatusid = { id: 4, playerstatusname: 'Subscription' }
        state.tempAlteration = true
        // allPlayersData[0] = temp
        state.allPlayersData = [temp]
      }
    },
    setDeployed(state) {
      if (state.allPlayersData.length > 0) {
        const temp = state.allPlayersData[0]
        temp.playerstatusid = { id: 3, playerstatusname: 'Deployed' }
        // allPlayersData[0] = temp
        state.tempAlteration = true
        state.allPlayersData = [temp]
      }
    },
    handleGoLive(state) {
      state.playerDetailStatus = 'live'
      state.playerActivationStatus = 'subscription'
    },
  },
})

export const {
  createPlayer,
  createPlayerSuccess,
  createPlayerFailure,
  getPlayerData,
  getPlayerDataSuccess,
  getPlayerDataFailure,
  resetPlayerData,
  updatePlayerProfile,
  updatePlayerProfileSuccess,
  updatePlayerProfileFailure,
  getAllPlayers,
  getAllPlayersSuccess,
  getAllPlayersFailure,
  fetchTickerBanner,
  fetchTickerBannerSuccess,
  fetchTickerBannerFailure,
  fetchDraftPlayers,
  fetchDraftPlayersSuccess,
  fetchDraftPlayersFailure,
  fetchAllPlayers,
  fetchAllPlayersSuccess,
  fetchAllPlayersFailure,
  fetchListPlayers,
  fetchListPlayersSuccess,
  fetchListPlayersFailure,
  fetchPlayersStats,
  fetchPlayersStatsSuccess,
  fetchPlayersStatsError,
  getPlayerDetails,
  getPlayerDetailsSuccess,
  getPlayerDetailsError,
  resetPlayerDetails,
  setGoLive,
  setDeployed,
  handleGoLive,
  resetAllPlayers,
} = playerCoinsSlice.actions
export default playerCoinsSlice.reducer
