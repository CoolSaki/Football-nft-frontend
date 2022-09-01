import { all, call, put, takeLatest } from 'redux-saga/effects'
import {
  fetchPlayersStats,
  fetchPlayersStatsSuccess,
  fetchPlayersStatsError,
  fetchSinglePlayersStatsSuccess,
  fetchSinglePlayerStatsError,
  fetchSinglePlayerStats,
} from './playerStatsSlice'

import { getRequest } from '../axiosClient'

function* fetchPlayerStatsAPI(action) {
  try {
    const response = yield call(() =>
      getRequest('players/player-retrieve/?player_list=' + action.payload),
    )
    yield put(fetchPlayersStatsSuccess(response.data))
  } catch (error) {
    yield put(fetchPlayersStatsError(error))
  }
}

function* fetchSinglePlayerStatsAPI(action) {
  try {
    const response = yield call(() =>
      getRequest('players/player-retrieve/?player_list=' + action.payload),
    )
    yield put(fetchSinglePlayersStatsSuccess(response.data))
  } catch (error) {
    yield put(fetchSinglePlayerStatsError(error))
  }
}

export default function* rootSaga() {
  yield all([takeLatest(fetchPlayersStats, fetchPlayerStatsAPI)]),
    yield all([takeLatest(fetchSinglePlayerStats, fetchSinglePlayerStatsAPI)])
}
