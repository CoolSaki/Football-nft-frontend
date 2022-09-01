import { all, call, put, takeLatest } from 'redux-saga/effects'
import { postRequest } from '../axiosClient'
import { postRequestAuth } from '../axiosClientAuth'
import { contactUs, contactUsFailure, contactUsSuccess } from './careersSlice'

function* contactUsApi(action) {
  try {
    const response = yield call(() =>
      postRequest('accounts/contact-us/', action.payload),
    )
    yield put(contactUsSuccess(response.data))
  } catch (error) {
    yield put(contactUsFailure(error))
    // handleException(error)
  }
}

export default function* rootSaga() {
  yield all([takeLatest(contactUs, contactUsApi)])
}
