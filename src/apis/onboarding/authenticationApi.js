import { all, call, put, takeLatest, takeEvery } from 'redux-saga/effects'
import {
  login,
  loginSuccess,
  loginFailure,
  loginWithOtp,
  loginWithOtpSuccess,
  loginWithOtpFailure,
  loginWithWallet,
  loginWithWalletSuccess,
  loginWithWalletFailure,
  loadNft,
  getNft,
  getWalletDetails,
  signUp,
  signUpSuccess,
  signUpFailure,
  resendEmail,
  resendEmailSuccess,
  resendEmailFailure,
  forgotPassword,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  logout,
  logoutSuccess,
  logoutFailure,
  resetPassword,
  setLoading,
  changePassword,
  emailConfirmation,
  resendEmailConfirmation,
  refreshToken,
  refreshTokenSuccess,
  refreshTokenFailure,
  getUserDetails,
  getUserDetailsSuccess,
  getUserDetailsFailure,
  showSignupForm,
  resetPasswordSuccess,
  resetPasswordFailure,
  verifyEmail,
  verifyEmailSuccess,
  verifyEmailFailure,
  getWalletSuccess,
  getWalletFailure,
  createWalletSuccess,
  createWalletFailure,
  createWallet,
  changeNftValueSuccess,
  changeNftValueFailure,
  changeNftValue,
  sendMatics,
  sendMaticsSuccess,
  sendMaticsFailure,
  exportKey,
  exportKeySuccess,
  exportKeyError,
  getWalletAddress,
  getWalletAddressSuccess,
  getWalletAddressFailure,
  getCountriesSuccess,
  getCountriesFailure,
  getCountries,
  getNotificationSuccess,
  getNotificationFailure,
  getNotification,
  // createWalletSuccess,
  // createWalletFailure,
  // createWallet,
} from './authenticationSlice'
import { postRequest, getRequest } from '../axiosClient'
import { handleException } from '../apiHelper'
import history from '@utils/history'
import { getRequestAuth, postRequestAuth } from '../axiosClientAuth'

const tokenRefresh = localStorage.getItem('refreshToken')
function UserException(message) {
  this.response
  this.message = message
  this.name = 'UserException'
  this.status = 403
}

function* loginAPI(action) {
  try {
    const response = yield call(() =>
      postRequest('accounts/login/', action.payload),
    )
    yield put(loginSuccess(response.data))
    if (response?.data?.is_email_verified) {
      yield put(getUserDetails())
    }
  } catch (error) {
    yield put(loginFailure(error))
    // handleException(error)
  }
}

function* loginWithWalletAPI() {
  try {
    const address = localStorage.getItem('loginInfo')
    const response = yield call(() =>
      postRequest('accounts/login-metamask/', { address: address }),
    )
    console.log(response)
    yield put(loginWithWalletSuccess(response.data))
  } catch (error) {
    console.log(error)
    yield put(loginWithWalletFailure(error))
    // handleException(error)
  }
}

function* loginWithOtpAPI(action) {
  try {
    const response = yield call(() =>
      postRequest('accounts/login/', action.payload),
    )
    yield put(loginWithOtpSuccess(response.data))
    // refreshTokenSuccess(resp)
    yield put(refreshTokenSuccess(response.data))

    if (response?.data?.is_email_verified) {
      yield put(getUserDetails())
    }
  } catch (error) {
    yield put(loginWithOtpFailure(error))
    // handleException(error)
  }
}

function* loadNftAPI() {
  try {
    const response = yield call(() => getRequest('players/nft/'))
    yield put(getNft(response.data))
  } catch (error) {
    // handleException(error)
  }
}

function* signUpAPI(action) {
  try {
    const response = yield call(() =>
      postRequest('accounts/signup/', action.payload),
    )
    yield put(signUpSuccess(action.payload.email))
  } catch (error) {
    yield put(signUpFailure(error))
    // handleException(error)
  }
}

function* forgotPasswordAPI(action) {
  try {
    const response = yield call(() =>
      postRequest('accounts/forgotPassword/', action.payload),
    )
    yield put(forgotPasswordSuccess(response.data))
  } catch (error) {
    // handleException(error)
    yield put(forgotPasswordFailure(error))
  }
}
function* logoutAPI(action) {
  try {
    const response = yield call(() =>
      postRequestAuth('accounts/logout/', action.payload),
    )
    yield put(logoutSuccess(response.data))
  } catch (error) {
    yield put(logoutFailure(error))
    // handleException(error)
  }
}
function* resetPasswordAPI(action) {
  try {
    const response = yield call(() =>
      postRequest('accounts/resetPassword/', action.payload),
    )
    yield put(resetPasswordSuccess(response.data))
  } catch (error) {
    yield put(resetPasswordFailure(error))
    // handleException(error)
  }
}

function* changePasswordAPI(action) {
  try {
    const response = yield call(() =>
      postRequest('accounts/change-password', action.payload),
    )
    yield put(setLoading(false, response.data))
  } catch (error) {
    yield put(setLoading(false))
    // handleException(error)
  }
}

function* emailConfirmationAPI(action) {
  try {
    const response = yield call(() =>
      postRequest('accounts/change-password', action.payload),
    )
    yield put(setLoading(false, response))
  } catch (error) {
    yield put(setLoading(false))
    // handleException(error)
  }
}

function* emailVerification(action) {
  try {
    const response = yield call(() =>
      postRequest('accounts/verify/email/', action.payload),
    )
    yield put(verifyEmailSuccess(response.data))
  } catch (error) {
    yield put(verifyEmailFailure(error))
    // handleException(error)
  }
}

function* buyNftEstimation(action) {
  try {
    const response = yield call(() =>
      postRequest('accounts/verify/email/', action.payload),
    )
    yield put(changeNftValueSuccess(response.data))
  } catch (error) {
    yield put(changeNftValueFailure(error))
    // handleException(error)
  }
}

function* resendEmailAPI(action) {
  try {
    const response = yield call(() =>
      getRequest(
        `accounts/resend/verificatonEmail/?email=${encodeURIComponent(
          action.payload.email,
        )}`,
      ),
    )
    yield put(resendEmailSuccess(response.data))
  } catch (error) {
    yield put(resendEmailFailure(error))
  }
}
function* refreshTokenAPI(action) {
  try {
    const response = yield call(() =>
      postRequest('accounts/api/token/refresh/', action.payload),
    )
    yield put(refreshTokenSuccess(response.data))
  } catch (e) {
    yield put(refreshTokenFailure())
    yield put(logout())
  }
}
function* getUserDetailsAPI() {
  try {
    const response = yield call(() => getRequest('users/me'))
    yield put(getUserDetailsSuccess(response.data))
  } catch (e) {
    // handleException(e)
    yield put(getUserDetailsFailure())
  }
}

function* getWalletDetailsApi() {
  try {
    const response = yield call(() => getRequestAuth('wallets/wallet/'))
    yield put(getWalletSuccess(response.data))
    // throw new UserException('token_not_valid')
  } catch (e) {
    yield put(getWalletFailure(e))
    // handleException(e)
  }
}

function* getCountriesApi() {
  try {
    const response = yield call(() => getRequest('wallets/country/'))
    yield put(getCountriesSuccess(response.data))
  } catch (e) {
    yield put(getCountriesFailure(e))
  }
}

function* getNotificationApi() {
  try {
    const response = yield call(() => getRequest('accounts/get-notification/'))
    yield put(getNotificationSuccess(response.data))
  } catch (e) {
    yield put(getNotificationFailure(e))
  }
}

function* getWalletAddressApi(action) {
  try {
    const response = yield call(() =>
      getRequest('wallets/address-detail/?address=' + action.payload),
    )
    yield put(getWalletAddressSuccess(response.data))
  } catch (error) {
    yield put(getWalletAddressFailure(error))
  }
}

function* createWalletApi(action) {
  try {
    const response = yield call(() =>
      postRequestAuth('wallets/wallet/', action.payload),
    )
    yield put(createWalletSuccess(response.data))
  } catch (error) {
    yield put(createWalletFailure(error))
  }
}

function* sendMaticApi(action) {
  try {
    const response = yield call(() =>
      postRequestAuth('wallets/send-crypto/', action.payload),
    )
    yield put(sendMaticsSuccess(response.data))
  } catch (error) {
    yield put(sendMaticsFailure(error))
  }
}

function* exportPrivateKeyApi(action) {
  try {
    const response = yield call(() =>
      postRequestAuth('wallets/privatekey/', action.payload),
    )
    yield put(exportKeySuccess(response.data))
  } catch (error) {
    yield put(exportKeyError(error))
  }
}

function* setSignupFormVisible() {
  // yield put(showSignupForm(true))
}

export default function* rootSaga() {
  yield all([
    takeLatest(login, loginAPI),
    takeLatest(loginWithWallet, loginWithWalletAPI),
    takeLatest(loginWithOtp, loginWithOtpAPI),
    takeLatest(loadNft, loadNftAPI),
    takeLatest(signUp, signUpAPI),
    takeLatest(resendEmail, resendEmailAPI),
    takeLatest(forgotPassword, forgotPasswordAPI),
    takeLatest(logout, logoutAPI),
    takeLatest(resetPassword, resetPasswordAPI),
    takeLatest(changePassword, changePasswordAPI),
    takeLatest(emailConfirmation, emailConfirmationAPI),
    takeLatest(verifyEmail, emailVerification),
    takeLatest(refreshToken, refreshTokenAPI),
    takeLatest(getUserDetails, getUserDetailsAPI),
    takeEvery(getWalletDetails, getWalletDetailsApi),
    takeEvery(getCountries, getCountriesApi),
    takeLatest(getNotification, getNotificationApi),
    takeLatest(showSignupForm, setSignupFormVisible),
    takeLatest(createWallet, createWalletApi),
    takeLatest(changeNftValue, buyNftEstimation),
    takeLatest(sendMatics, sendMaticApi),
    takeLatest(exportKey, exportPrivateKeyApi),
    takeLatest(getWalletAddress, getWalletAddressApi),
  ])
}
