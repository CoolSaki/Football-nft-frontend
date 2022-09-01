import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import SubmitButton from '@components/SubmitButton'
import { verifyEmail } from '@root/apis/onboarding/authenticationSlice'
import AppLayout from '@components/AppLayout'
import { RootState } from '@root/store/rootReducers'
import Spinner from '@components/Spinner'
import { useTranslation } from 'react-i18next'

const EmailVerification: React.FC = props => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const pathSet = pathname.split('/')

  useEffect(() => {
    window.history.replaceState(null, 'Buy', '/')
    getEmailVerified()
  }, [])

  const authenticationData = useSelector(
    (state: RootState) => state.authentication,
  )
  const { isVerifyEmailError, loader, isVerifyEmailSuccess } =
    authenticationData

  const getEmailVerified = async () => {
    const reqParams = {
      id: pathSet[pathSet.length - 2],
      token: pathSet[pathSet.length - 1],
    }
    dispatch(verifyEmail(reqParams))
  }

  const handleNavigate = () => {
    navigate('/')
  }
  return (
    <AppLayout className="home" footerStatus="hidden">
      <section className="verification-container fullwidth">
        <div className="email-verification-container">
          {isVerifyEmailError ? (
            <h2 className="page-heading text-error">{isVerifyEmailError}</h2>
          ) : isVerifyEmailSuccess ? (
            <h2 className="page-heading">
              {t('congratulations! Your account has been verified') + '.'}
            </h2>
          ) : (
            <h2 className="page-heading">
              {t('please wait while your account is getting verified') + '...'}
            </h2>
          )}
          {loader ? (
            <div className="spinner-wrapper">
              <Spinner
                spinnerStatus={true}
                title={t('awaiting Confirmation')}
              />
            </div>
          ) : isVerifyEmailSuccess ? (
            <SubmitButton
              title={t('continue')}
              className="btn-done verify-btn mt-40"
              onPress={handleNavigate}
            />
          ) : null}
        </div>
      </section>
    </AppLayout>
  )
}

export default EmailVerification
