import { all, call, put, takeLatest } from 'redux-saga/effects'
import { getRequestAuth } from '../axiosClientAuth'
import {
  getPurchaseReceipt,
  getPurchaseReceiptFailure,
  getPurchaseReceiptSuccess,
  setPurchaseMode,
} from './purchaseSlice'

export interface ResponseGenerator {
  config?: any
  data?: any
  headers?: any
  request?: any
  status?: number
  statusText?: string
}

function* createPurchaseMode(action: any) {
  try {
    yield put(setPurchaseMode('buy'))
  } catch (e) {
    yield put(setPurchaseMode('sell'))
  }
}

function* getPurchaseReceiptApi(action: any) {
  try {
    const response: ResponseGenerator = yield call(() =>
      getRequestAuth('wallets/transaction-receipt/?txn_hash=' + action.payload),
    )
    yield put(getPurchaseReceiptSuccess(response.data))
  } catch (error) {
    yield put(getPurchaseReceiptFailure(error))
  }
}

export default function* rootSaga() {
  yield all([setPurchaseMode])
  yield all([takeLatest(getPurchaseReceipt, getPurchaseReceiptApi)])
}
