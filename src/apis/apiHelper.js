// import toast from 'react-hot-toast'
import { serverErrorCodes, unAuthorizedErrorCode } from '@root/constants'
import history from '@root/utils/history'
// import { translate } from 'common/Translate'
import { useTranslation } from 'react-i18next'
import store from '@root/store/store'
import {
  logoutSuccess,
  refreshToken,
} from '@root/apis/onboarding/authenticationSlice'
import { asyncLocalStorage } from '@utils/helpers'

export function handleException(error) {
  const { response } = error
  // const { t } = useTranslation()

  // if (response) {
  //   if (response.status === unAuthorizedErrorCode) {
  //     if (response.data.error[0].code === 'JWT-TOKEN-EXPIRED') {
  //       store.dispatch(refreshToken())
  //     } else {
  //       store.dispatch(logoutSuccess())
  //       history.push('/login')
  //       if (response.config.url.split('/').includes('login')) {
  //         // toast.error(t(response.data?.error[0]?.code))
  //         console.error('EXCEPTION_ERROR', response.data?.error[0]?.code)
  //       }
  //     }
  //   } else if (serverErrorCodes.includes(response.status)) {
  //     // toast.error(error.response.errors)
  //     console.error('EXCEPTION_ERROR', error.response.errors)
  //     window.BugsnagClient.notify(error)
  //     // toast.error(t(response.data?.error[0]?.code))
  //   } else if (response.status === 404) {
  //     history.push('/404')
  //     console.error('EXCEPTION_ERROR', response.data?.error[0]?.code)
  //     // toast.error(t(response.data?.error[0]?.code))
  //   } else {
  //     // need to get error message from helper with error code
  //     // toast.error(t(response.data?.error[0]?.code))
  //   }
  // } else {
  //   // eslint-disable-next-line no-console
  //   console.error('fineError---', error)
  // }
  if ([401, 403].includes(error.response.status)) {
    asyncLocalStorage.getItem('refreshToken').then(token => {
      const reqParams = {
        refresh: token,
      }
      store.dispatch(refreshToken(reqParams))
    })
  }
}
