import { all, call, put, takeLatest, takeEvery } from 'redux-saga/effects'
import {
  createWallet,
  createWalletSuccess,
  createWalletFailure,
} from './walletSlice'
import { getRequestAuth, postRequestAuth } from '../axiosClientAuth'

function* createWalletApi(action) {
  console.log('geerrr', action)
  try {
    const response = yield call(() =>
      postRequestAuth('wallets/wallet/', action.payload),
    )
    yield put(createWalletSuccess(response.data))
  } catch (error) {
    yield put(createWalletFailure(error))
  }
}

export default function* rootSaga() {
  yield all([takeLatest(createWallet, createWalletApi)])
}
