import { all, call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import {
  createPlayer,
  createPlayerSuccess,
  createPlayerFailure,
  getPlayerData,
  getPlayerDataSuccess,
  getPlayerDataFailure,
  updatePlayerProfile,
  updatePlayerProfileSuccess,
  updatePlayerProfileFailure,
  getAllPlayers,
  getAllPlayersSuccess,
  getAllPlayersFailure,
  getPlayerDetailsSuccess,
  getPlayerDetailsError,
  getPlayerDetails,
  fetchAllPlayers,
  fetchTickerBanner,
  fetchTickerBannerSuccess,
  fetchTickerBannerFailure,
  fetchDraftPlayers,
  fetchDraftPlayersSuccess,
  fetchDraftPlayersFailure,
  fetchAllPlayersSuccess,
  fetchAllPlayersFailure,
  fetchPlayersStats,
  fetchPlayersStatsSuccess,
  fetchPlayersStatsError,
  fetchListPlayers,
  fetchListPlayersSuccess,
  fetchListPlayersFailure,
} from './playerCoinsSlice'
import {
  getRequestAuth,
  postRequestAuth,
  putRequestAuth,
} from '../axiosClientAuth'
import { getRequest } from '../axiosClient'
import { handleException } from '../apiHelper'
import { API_CONSTANTS as constants } from '@root/constants'

function* createPlayerAPI(action) {
  try {
    const response = yield call(() =>
      postRequestAuth('players/player/', action.payload),
    )
    yield put(createPlayerSuccess(response.data))
  } catch (error) {
    yield put(createPlayerFailure(error))
    // handleException(error)
  }
}

function* getPlayerAPI(action) {
  try {
    const response = yield call(() => getRequestAuth('players/player/'))
    yield put(getPlayerDataSuccess(response.data))
  } catch (error) {
    yield put(getPlayerDataFailure(error))
    // handleException(error)
  }
}

function* updatePlayerProfileAPI(action) {
  try {
    const response = yield call(() =>
      putRequestAuth('players/player/', action.payload),
    )
    yield put(updatePlayerProfileSuccess(response.data))
    yield put(getPlayerData())
  } catch (error) {
    yield put(updatePlayerProfileFailure(error))
  }
}

function* getAllPlayersAPI(action) {
  try {
    const response = yield call(() => getRequest('players/player-list/'))
    yield put(getAllPlayersSuccess(response.data))
  } catch (error) {
    yield put(getAllPlayersFailure(error))
    // handleException(error)
  }
}

function* fetchAllPlayersAPI(action) {
  let response
  try {
    if (action.payload) {
      const url = new URL(constants.HOST_URL + '/players/player-list/')
      const searchParams = url.searchParams
      const paramSet = Object.keys(action.payload)
      for (let i = 0; i < paramSet.length; i++) {
        searchParams.set(paramSet[i], action.payload[paramSet[i]])
      }
      response = yield call(() =>
        // getRequest(
        //   `players/player-list/?limit=${action.payload.limit}&offset=${action.payload.offset}`,
        // ),
        axios.get(url.toString()),
      )
    } else {
      response = yield call(() => getRequest('players/player-list/'))
    }
    yield put(fetchAllPlayersSuccess(response.data))
  } catch (error) {
    yield put(fetchAllPlayersFailure(error))
    // handleException(error)
  }
}

function* fetchListPlayersAPI(action) {
  let response
  try {
    if (action.payload) {
      const url = new URL(constants.HOST_URL + '/players/player-list/')
      const searchParams = url.searchParams
      const paramSet = Object.keys(action.payload)
      for (let i = 0; i < paramSet.length; i++) {
        searchParams.set(paramSet[i], action.payload[paramSet[i]])
      }
      response = yield call(() =>
        // getRequest(
        //   `players/player-list/?limit=${action.payload.limit}&offset=${action.payload.offset}`,
        // ),
        axios.get(url.toString()),
      )
    } else {
      response = yield call(() => getRequest('players/player-list/'))
    }
    yield put(fetchListPlayersSuccess(response.data))
  } catch (error) {
    yield put(fetchListPlayersFailure(error))
    // handleException(error)
  }
}

function* fetchTickerBannerAPI(action) {
  let response
  try {
    response = yield call(() => getRequest('players/ticker-banner/'))
    yield put(fetchTickerBannerSuccess(response.data))
  } catch (error) {
    yield put(fetchTickerBannerFailure(error))
  }
}

function* fetchDraftPlayersAPI(action) {
  let response
  try {
    response = yield call(() => getRequest('players/draft-players/'))
    yield put(fetchDraftPlayersSuccess(response.data))
  } catch (error) {
    yield put(fetchDraftPlayersFailure(error))
  }
}

function* getPlayerDetailsAPI(action) {
  try {
    const response = yield call(() =>
      getRequest('players/player-detailpage/?detailpageurl=' + action.payload),
    )
    yield put(getPlayerDetailsSuccess(response.data))
  } catch (error) {
    yield put(getPlayerDetailsError(error))
  }
}

// function* fetchPlayerStatsAPI(action) {
//   try {
//     const response = yield call(() =>
//       getRequest('players/player-retrieve/?player_list=' + action.payload),
//     )
//     yield put(fetchPlayersStatsSuccess(response.data))
//   } catch (error) {
//     yield put(fetchPlayersStatsError(error))
//   }
// }

export default function* rootSaga() {
  yield all([takeLatest(createPlayer, createPlayerAPI)])
  yield all([takeLatest(getPlayerData, getPlayerAPI)])
  yield all([takeLatest(updatePlayerProfile, updatePlayerProfileAPI)])
  yield all([takeLatest(getAllPlayers, getAllPlayersAPI)])
  yield all([takeLatest(fetchAllPlayers, fetchAllPlayersAPI)])
  yield all([takeLatest(fetchListPlayers, fetchListPlayersAPI)])
  yield all([takeLatest(fetchTickerBanner, fetchTickerBannerAPI)])
  yield all([takeLatest(fetchDraftPlayers, fetchDraftPlayersAPI)])
  yield all([takeLatest(getPlayerDetails, getPlayerDetailsAPI)])
  // yield all([takeLatest(fetchPlayersStats, fetchPlayerStatsAPI)])
}
