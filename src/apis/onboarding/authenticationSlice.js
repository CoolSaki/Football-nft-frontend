import { createSlice } from '@reduxjs/toolkit'
import { asyncLocalStorage } from '@utils/helpers'

const loginId = localStorage.getItem('loginId')

const initialState = {
  isAuthenticated: false,
  loader: false,
  nftVisible: true,
  blogVisible: true,
  nft: [],
  curTab: 'profile',
  passphraseLoader: false,
  exportKeyLoader: false,
  isEmailVerified: false,
  isSentEmailVerificationMail: false,
  companyDetails: {},
  refreshingToken: false,
  userId: '',
  email: '',
  address: '',
  name: '',
  userType: '',
  isOtpSent: false,
  activeTab: '',
  isAccessToken: '',
  isLoggedOut: false,
  isRefreshToken: '',
  userName: loginId,
  isSignupFormVisible: false,
  isWalletFormVisible: false,
  isPlayerDashboardFormVisible: false,
  defaultTab: 'Register',
  defaultWalletTab: 'Balance',
  isLoginError: '',
  isGetWalletError: '',
  isSignupError: '',
  isOtpLoginError: '',
  isOtpLoginSuccess: '',
  otpAttempts: 3,
  isEmailResendError: '',
  isEmailResent: '',
  passwordResetError: '',
  passwordResetSuccess: '',
  resetPasswordSuccess: '',
  resetPasswordError: '',
  isVerifyEmailSuccess: '',
  isVerifyEmailError: '',
  isWalletCreatedSuccess: '',
  isWalletCreatedError: '',
  stateAccessToken: '',
  userWalletData: '',
  isCreateWalletDisabled: false,
  isSendMaticSuccess: '',
  sendMaticTxnId: '',
  isSendMaticError: '',
  isExportKeySuccess: '',
  isExportKeyError: '',
  exportSecretAttempts: 5,
  isGetAddressWalletError: '',
  isGetAddressWalletSuccess: '',
  isGetCountriesError: '',
  countriesData: [],
  delay: 0,
  secretInputAttempts: 5,
}

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    login(state, action) {
      state.loader = true
      state.isLoginError = ''
    },
    loginSuccess(state, action) {
      state.loader = false
      state.isEmailVerified = action.payload.is_email_verified
      state.isAuthenticated = action.payload.is_email_verified
      state.companyDetails = action.payload.company_details
      state.userType = action.payload.type
      state.isOtpSent = true
    },
    emailConfirmReset(state) {
      state.isEmailVerified = true
    },
    loginFailure(state, action) {
      const { payload } = action
      state.loader = false
      state.isAuthenticated = false
      state.isOtpSent = false
      state.userName = ''
      state.isLoginError =
        payload?.response?.data?.detail || payload?.response?.data?.message
    },
    loginReset(state) {
      state.loader = false
      state.isAuthenticated = false
      state.isOtpSent = false
      state.userName = ''
      state.isLoginError = ''
    },
    loginWithOtp(state, action) {
      state.loader = true
      state.isOtpLoginError = ''
    },
    loginWithOtpSuccess(state, action) {
      const { payload } = action
      state.loader = false
      state.isEmailVerified = action.payload.is_email_verified
      state.isAuthenticated = action.payload.is_email_verified
      state.isOtpLoginSuccess = payload.message
      state.isOtpLoginError = ''
      state.otpAttempts = 3
      state.stateAccessToken = payload.data.access
      state.userName = payload.data.user
      localStorage.setItem('loginId', payload.data.user)
      localStorage.setItem('accessToken', payload.data.access)
      localStorage.setItem('refreshToken', payload.data.refresh)
    },
    loginWithWallet(state) {
      state.loader = true
      state.isLoginError = ''
      state.isLoggedOut = false
    },
    loginWithWalletSuccess(state, action) {
      const { payload } = action
      state.loader = false
      state.stateAccessToken = payload.token
      localStorage.setItem('accessToken', payload.token)
    },
    loginWithWalletFailure(state, action) {
      const { payload } = action
      state.loader = false
      state.isLoginError = payload.response.data.detail
    },
    loadNft(state) {
      state.nftVisible = false
    },
    getNft(state, action) {
      const { payload } = action
      state.nftVisible = payload.data.is_nft_visible
      state.nft = payload.data.nft_list
      state.blogVisible = payload.data.is_blog_visible
      console.log(state.nftVisible)
    },
    setCurTab(state, action) {
      const { payload } = action
      state.curTab = payload.curTab
    },
    getWalletDetails(state) {
      state.loader = true
      state.isGetWalletError = ''
      state.isCreateWalletDisabled = false
    },
    getWalletSuccess(state, action) {
      state.loader = false
      state.userWalletData = action.payload.message
      state.isGetWalletError = ''
    },
    getWalletFailure(state, action) {
      state.loader = false
      state.isWalletCreatedSuccess = ''
      if (action.payload.response?.status === 500) {
        state.isGetWalletError = 'Network Error'
        state.isCreateWalletDisabled = true
      } else {
        if (action.payload.response?.status === 404) {
          state.isGetWalletError = ' '
        } else {
          state.isGetWalletError = 'Some error occured'
          state.isCreateWalletDisabled = true
        }
      }
    },
    getCountries(state) {
      state.loader = true
      state.isGetCountriesError = ''
    },
    getCountriesSuccess(state, action) {
      state.loader = false
      state.countriesData = action.payload
      state.isGetCountriesError = ''
    },
    getCountriesFailure(state, action) {
      state.loader = false
      if (action.payload.response?.status === 500) {
        state.isGetCountriesError = 'Network Error'
      } else {
        if (action.payload.response?.status === 404) {
          state.isGetCountriesError = ''
        } else {
          state.isGetCountriesError =
            'Some error occured. Unable to fetch countries'
        }
      }
    },
    getNotification(state) {
      state.loader = true
    },
    getNotificationSuccess(state, action) {
      state.loader = false
      state.delay = action.payload.data.delay
    },
    getNotificationFailure(state, action) {
      state.loader = false
    },
    getWalletAddress(state, action) {
      state.loader = true
      state.isGetAddressWalletError = ''
      state.isCreateWalletDisabled = false
    },
    getWalletAddressSuccess(state, action) {
      state.loader = false
      state.userWalletData = action.payload.message
      state.userWalletData.balance = action.payload.message.balance
      state.userWalletData.USDBalance = Number.parseFloat(
        state.userWalletData.USDBalance,
      ).toFixed(2)
      state.isGetAddressWalletError = ''
    },
    getWalletAddressFailure(state, action) {
      state.loader = false
      state.isGetAddressWalletSuccess = ''
      if (action.payload.response?.status === 500) {
        state.isGetAddressWalletError = 'Network Error'
        state.isCreateWalletDisabled = true
      } else {
        if (action.payload.response?.status === 404) {
          state.isGetAddressWalletError = ''
        } else {
          state.isGetAddressWalletError = 'Some error occured'
        }
      }
    },
    resetWallet(state) {
      state.loader = false
      state.userWalletData = ''
      state.isGetAddressWalletError = ''
      state.isCreateWalletDisabled = false
      state.isGetAddressWalletSuccess = ''
    },
    loginWithOtpFailure(state, action) {
      const { payload } = action
      state.loader = false
      state.isAuthenticated = false
      state.userName = ''
      state.otpAttempts = state.otpAttempts - 1
      state.isOtpLoginError = payload.response.data.detail
    },
    signUp(state, action) {
      state.loader = true
      state.isSignupError = ''
    },
    signUpSuccess(state, action) {
      state.loader = false
      state.isSentEmailVerificationMail = true
      state.email = action.payload
      state.isSignupError = ''
    },
    closeEmailVerification(state) {
      state.isSentEmailVerificationMail = false
      state.activeTab = 'login'
    },
    setActiveTab(state, action) {
      state.activeTab = action.payload
    },
    resetSentEmailVerification(state) {
      state.loader = false
      state.isSentEmailVerificationMail = false
      state.isOtpSent = false
      state.defaultTab = 'register'
    },
    signUpFailure(state, action) {
      const { payload } = action
      state.loader = false
      state.isSignupError = payload.response.data.message
    },
    forgotPassword(state, action) {
      state.loader = true
      state.resetPasswordError = ''
    },
    forgotPasswordSuccess(state, action) {
      state.loader = false
      state.resetPasswordError = ''
      state.resetPasswordSuccess = action.payload.message
    },
    forgotPasswordFailure(state, action) {
      state.loader = false
      state.resetPasswordError = action.payload.response.data.message
    },
    resetFormPassword(state) {
      state.resetPasswordError = ''
      state.resetPasswordSuccess = ''
    },
    signout(state) {
      state.loader = false
      state.isLoggedOut = true
      state.stateAccessToken = ''
    },
    logout(state, action) {
      state.loader = true
    },
    logoutSuccess(state, action) {
      state.loader = false
      state.isLoggedOut = true
      state.isAuthenticated = false
      state.userName = null
      state.stateAccessToken = ''
      state.isAccessToken = ''
      state.isRefreshToken = ''
      state.isOtpLoginSuccess = ''
      asyncLocalStorage.removeItem('walletCreated')
      asyncLocalStorage.removeItem('refreshToken')
      asyncLocalStorage.removeItem('accessToken')
      asyncLocalStorage.removeItem('loginId')
    },
    logoutFailure(state, action) {
      //state.isLoggedOut = false
      //state.loader = false
      state.loader = false
      state.isLoggedOut = true
      state.isAuthenticated = false
      state.userName = null
      state.stateAccessToken = ''
      state.isAccessToken = ''
      state.isRefreshToken = ''
      state.isOtpLoginSuccess = ''
      asyncLocalStorage.removeItem('walletCreated')
      asyncLocalStorage.removeItem('refreshToken')
      asyncLocalStorage.removeItem('loginId')
      if (!asyncLocalStorage.getItem('loginInfo')) {
        asyncLocalStorage.removeItem('accessToken')
      }
    },

    resetPassword(state, action) {
      state.loader = true
    },
    resetPasswordSuccess(state, action) {
      state.loader = false
      state.passwordResetError = ''
      state.passwordResetSuccess = action.payload.message
    },
    resetPasswordFailure(state, action) {
      state.loader = false
      state.passwordResetError = action.payload.response.data.message
    },
    setLoading(state, action) {
      state.loader = action.payload
    },
    changePassword(state) {
      state.loader = true
    },
    emailConfirmation(state) {
      state.loader = true
    },
    resendEmail(state, action) {
      state.loader = true
    },
    resendEmailSuccess(state, action) {
      state.loader = false
      if (action.payload.success) {
        state.isEmailResent = action.payload.message
      } else {
        state.isEmailResendError = action.payload.message
      }
    },
    resendEmailFailure(state, action) {
      const { payload } = action
      console.log({ payload })
      state.loader = false
      state.isEmailResendError = payload.response.data.message
    },

    verifyEmail(state, action) {
      state.loader = true
    },
    verifyEmailSuccess(state, action) {
      state.loader = false
      localStorage.setItem('loginId', action.payload.email)
      localStorage.setItem('accessToken', action.payload.data.accessToken)
      localStorage.setItem('refreshToken', action.payload.data.refreshToken)
      state.refreshingToken = false
      state.isVerifyEmailSuccess = true
      state.isVerifyEmailError = ''
      state.isAccessToken = action.payload.data.access
      state.isRefreshToken = action.payload.data.refresh
      state.userName = action.payload.email
    },
    verifyEmailFailure(state, action) {
      const { payload } = action
      state.loader = false
      state.isVerifyEmailError = payload.response.data.message
    },

    resendEmailConfirmation(state) {
      state.loader = true
    },
    refreshToken(state, action) {
      state.loader = true
    },
    refreshTokenSuccess(state, action) {
      const { payload } = action
      state.loader = false
      state.isAccessToken = action.payload.data.access
      state.isRefreshToken = action.payload.data.refresh
      state.userName =
        action.payload.data.user || action.payload.data.email || ''
      state.stateAccessToken = payload.data.access
      localStorage.setItem('accessToken', payload.data.access)
      localStorage.setItem('refreshToken', payload.data.refresh)
    },
    refreshTokenFailure(state, action) {
      state.loader = false
      state.isAccessToken = ''
      state.isRefreshToken = ''
      state.userName = ''
      state.stateAccessToken = ''
    },
    getUserDetails(state) {
      state.refreshingToken = false
    },
    showSignupForm(state) {
      state.isSignupFormVisible = !state.isSignupFormVisible
      state.isOtpSent = false
      state.isSentEmailVerificationMail = false
      state.defaultTab = 'Register'
    },
    showWalletForm(state) {
      state.isWalletFormVisible = !state.isWalletFormVisible
      state.defaultWalletTab = 'Balance'
    },
    showPlayerDashboardForm(state) {
      state.isPlayerDashboardFormVisible = !state.isPlayerDashboardFormVisible
    },
    getUserDetailsSuccess(state, action) {
      const {
        type,
        name,
        email,
        user_id: userId,
        is_email_verified: isEmailVerified,
      } = action.payload

      return {
        ...state,
        name,
        email,
        userId,
        userType: type,
        isEmailVerified,
        refreshingToken: false,
      }
    },
    getUserDetailsFailure(state) {
      state.refreshingToken = false
    },
    createWallet(state, action) {
      state.loader = true
      state.isCreateWalletError = ''
    },
    createWalletSuccess(state, action) {
      state.loader = false
      state.isWalletCreatedSuccess = action.payload.message
    },
    createWalletFailure(state, action) {
      const { payload } = action
      state.loader = false
      localStorage.removeItem('walletCreated')
      state.isWalletCreatedError = 'The creation of wallet failed.'
    },
    //---------------------------------------- BUY_NFT_SLICE_METHODS----------------------------------------//

    fetchPurchaseDetails(state) {
      state.loader = true
    },
    fetchPurchaseDetailsSuccess(state) {
      console.log('FPDSCALLED')
      state.loader = false
    },
    fetchPurchaseDetailsFailure(state) {
      console.log('FPDFCALLED')
      state.loader = false
    },
    changeNftValue(state, action) {
      state.loadingBuy = true
    },
    changeNftValueSuccess(state, action) {
      state.loadingBuy = false
    },
    changeNftValueFailure(state, action) {
      const { payload } = action
      state.loadingBuy = false
    },

    //---------------------------------------- SEND_NFT_SLICE_METHODS----------------------------------------//
    sendMatics(state, action) {
      state.isSendMaticError = ''
      state.passphraseLoader = true
    },
    sendMaticsSuccess(state, action) {
      state.passphraseLoader = false
      state.isSendMaticSuccess = action.payload.message
      state.sendMaticTxnId = action.payload.data.txn_hash
    },
    sendMaticsFailure(state, action) {
      const { payload } = action
      const attempts = state.secretInputAttempts
      state.passphraseLoader = false
      state.isSendMaticSuccess = ''
      state.sendMaticTxnId = ''
      if (action.payload.response?.status === 500) {
        state.secretInputAttempts = attempts - 1
        state.isSendMaticError =
          payload.response.data.message || 'Passphrase Error'
        state.isCreateWalletDisabled = true
      } else {
        if (action.payload.response?.status === 404) {
          state.isSendMaticError = ''
        } else {
          state.isSendMaticError = 'Some error occured'
        }
      }
    },
    resetSendMatics(state) {
      state.passphraseLoader = false
      state.isSendMaticSuccess = ''
      state.sendMaticTxnId = ''
    },
    sendMaticsReset(state) {
      state.passphraseLoader = false
      state.isSendMaticSuccess = ''
      state.isSendMaticError = ''
      state.secretInputAttempts = 5
    },
    sendMaticRestrictSecret(state) {
      state.secretInputAttempts = 0
    },
    sendMaticsMetamask(state) {
      state.passphraseLoader = true
      state.isSendMaticSuccess = ''
      state.isSendMaticError = ''
    },
    exportKey(state, action) {
      state.isExportKeyError = ''
      state.exportKeyLoader = true
    },
    exportKeySuccess(state, action) {
      state.exportKeyLoader = false
      state.isExportKeySuccess = action.payload.data.privateKey
      state.exportSecretAttempts = 5
    },
    exportKeyError(state, action) {
      const { payload } = action
      const attempts = state.exportSecretAttempts
      state.exportKeyLoader = false
      if (action.payload.response?.status === 500) {
        state.isExportKeyError =
          payload.response.data.message || 'Network Error'
        state.isCreateWalletDisabled = true
        state.exportSecretAttempts = attempts - 1
      } else {
        if (action.payload.response?.status === 404) {
          state.isExportKeyError = ''
        } else {
          state.isExportKeyError = 'Some error occured'
        }
      }
    },
    exportKeyReset(state) {
      state.exportKeyLoader = false
      state.isExportKeySuccess = ''
      state.isExportKeyError = ''
      state.exportSecretAttempts = 5
    },
    exportKeyRestrict(state) {
      state.exportSecretAttempts = 0
    },
  },
})

export const {
  setActiveTab,
  login,
  loginSuccess,
  loginFailure,
  loginReset,
  loginWithOtp,
  loginWithOtpSuccess,
  loginWithOtpFailure,
  loginWithWallet,
  loginWithWalletSuccess,
  loginWithWalletFailure,
  loadNft,
  getNft,
  setCurTab,
  getWalletDetails,
  getWalletSuccess,
  getWalletFailure,
  createWallet,
  createWalletSuccess,
  createWalletFailure,
  signUp,
  signUpSuccess,
  signUpFailure,
  resendEmail,
  resendEmailSuccess,
  resendEmailFailure,
  forgotPassword,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  resetPassword,
  resetPasswordSuccess,
  resetPasswordFailure,
  verifyEmail,
  verifyEmailSuccess,
  verifyEmailFailure,
  signout,
  logout,
  logoutFailure,
  logoutSuccess,
  setLoading,
  changePassword,
  emailConfirmation,
  resendEmailConfirmation,
  resetSentEmailVerification,
  emailConfirmReset,
  closeEmailVerification,
  refreshToken,
  refreshTokenSuccess,
  refreshTokenFailure,
  getUserDetails,
  getUserDetailsSuccess,
  getUserDetailsFailure,
  showSignupForm,
  showWalletForm,
  showPlayerDashboardForm,
  resetFormPassword,
  changeNftValue,
  changeNftValueSuccess,
  changeNftValueFailure,
  sendMatics,
  sendMaticsSuccess,
  sendMaticsFailure,
  resetSendMatics,
  sendMaticsReset,
  sendMaticRestrictSecret,
  sendMaticsMetamask,
  exportKey,
  exportKeySuccess,
  exportKeyError,
  exportKeyReset,
  exportKeyRestrict,
  getWalletAddress,
  getWalletAddressSuccess,
  getWalletAddressFailure,
  resetWallet,
  getCountries,
  getCountriesSuccess,
  getCountriesFailure,
  getNotification,
  getNotificationSuccess,
  getNotificationFailure,
  fetchPurchaseDetails,
  fetchPurchaseDetailsSuccess,
  fetchPurchaseDetailsFailure,
} = authenticationSlice.actions
export default authenticationSlice.reducer
