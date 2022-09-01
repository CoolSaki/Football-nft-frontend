import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loader: false,
  purchaseAction: '',
  purchasePlayerId: 0,
  showPurchaseForm: false,
  isPurchaseReceiptSuccess: '',
  isPurchaseReceiptFailure: '',
}

const purchaseSlice = createSlice({
  name: 'purchases',
  initialState,
  reducers: {
    setPurchaseMode(state, action) {
      state.purchaseAction = action.payload
    },
    setPurchasePlayerId(state, action) {
      if (action.payload.toString().includes('/')) {
        state.purchasePlayerId = parseInt(action.payload.split('/')[1]) - 1
      } else {
        state.purchasePlayerId = action.payload
      }
    },
    setPurchaseShow(state, action) {
      console.log({ action })
      state.showPurchaseForm = action.payload
    },
    getPurchaseReceipt(state, action) {
      state.loader = true
    },
    getPurchaseReceiptSuccess(state, action) {
      console.log('GPRS--', action)
      state.loader = false
      state.isPurchaseReceiptSuccess = action.payload.message
    },
    getPurchaseReceiptFailure(state, action) {
      console.log('GPRF--', action)
      state.loader = false
      state.isPurchaseReceiptFailure = 'failure'
    },
    clearLastTransaction(state) {
      state.isPurchaseReceiptSuccess = ''
      state.isPurchaseReceiptFailure = ''
      state.loader = false
    },
  },
})

export const {
  setPurchaseMode,
  setPurchasePlayerId,
  setPurchaseShow,
  getPurchaseReceipt,
  getPurchaseReceiptSuccess,
  getPurchaseReceiptFailure,
  clearLastTransaction,
} = purchaseSlice.actions
export default purchaseSlice.reducer
