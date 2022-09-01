import { all, call, put, takeLatest } from 'redux-saga/effects'
import {
  getNotifications,
  getNotificationsSuccess,
  getNotificationsFailure,
} from './notificationSlice'
import { getRequest } from '../axiosClient'

function* getNotificationsAPI(action) {
  try {
    const response = yield call(() => getRequest('accounts/notifications/'))
    console.log(response)
    yield put(getNotificationsSuccess(response.data))
  } catch (error) {
    yield put(getNotificationsFailure(error))
    // handleException(error)
  }
}

export default function* rootSaga() {
  yield all([takeLatest(getNotifications, getNotificationsAPI)])
}
