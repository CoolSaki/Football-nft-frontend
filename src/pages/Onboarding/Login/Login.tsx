import React, { useContext, useEffect, useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import OtpInput from 'react-otp-input'
import classNames from 'classnames'
import MetamaskButton from '@components/MetamaskButton'
import CoinbaseButton from '@components/CoinbaseButton'
import TrustButton from '@components/TrustButton'
import FormInput from '../../../components/Form/FormInput'
import { RequestParams as OnboardingProps } from '@root/types'
import SubmitButton from '@components/SubmitButton'
import { RootState } from '@root/store/rootReducers'
import { useDispatch, useSelector } from 'react-redux'
import { ConnectContext } from '@root/WalletConnectProvider'
import {
  login,
  loginFailure,
  loginReset,
  loginSuccess,
  loginWithWallet,
  loginWithOtp,
  refreshTokenSuccess,
  resetSentEmailVerification,
} from '@root/apis/onboarding/authenticationSlice'
import { isNumeric } from '@utils/helpers'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import { isMobile } from 'web3modal'
import WalletConnectButton from '@components/WalletConnectButton'

const initialValues = {
  email: '',
  password: '',
}

interface ResponseType {
  email?: string
  access?: string
}

interface Props {
  isOnMenu?: boolean
  getSubmit?: any //(v?: boolean) => void
  handleLinkClick?: any
}

const Login: React.FC<Props> = ({ isOnMenu, getSubmit, handleLinkClick }) => {
  const [isLoading, setLoading] = useState(false)
  const [otpNumber, setOtpNumber] = useState('')
  const [otpError, setOtpError] = useState('')
  const [otpValidationError, setOtpValidationError] = useState('')
  const [signinError, setSigninError] = useState('')
  const [loginSuccessMsg, setLoginSuccessMsg] = useState('')
  const [state, setState] = useState({
    email: '',
    password: '',
  })
  const { connectStatus, connect, disconnect } = useContext(ConnectContext)
  const navigate = useNavigate()
  const updateState = (data: any) => setState(state => ({ ...state, ...data }))
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const authenticationData = useSelector(
    (state: RootState) => state.authentication,
  )

  const {
    isOtpSent,
    isLoginError,
    isOtpLoginError,
    otpAttempts,
    isOtpLoginSuccess,
  } = authenticationData

  useEffect(() => {
    if (isOtpLoginSuccess) {
      dispatch(resetSentEmailVerification())
      setTimeout(() => {
        if (isMobile()) {
          navigate('/')
        } else {
          getSubmit(true)
        }
      }, 1000)
    }
  }, [isOtpLoginSuccess])

  useEffect(() => {
    return clearForm()
  }, [])

  const clearForm = () => {
    setLoading(false)
    setOtpNumber('')
    setOtpError('')
    setSigninError('')
  }

  async function onSubmit(values: OnboardingProps) {
    setOtpValidationError('')
    updateState({
      email: values.email,
      password: values.password,
    })
    dispatch(login(values))
  }

  function handleLoginWithOtp() {
    if (!isOtpLoginSuccess) {
      const reqParams = {
        email: state.email,
        password: state.password,
        otp: otpNumber,
      }
      if (otpNumber.length === 6 && isNumeric(otpNumber)) {
        dispatch(loginWithOtp(reqParams))
      } else {
        setOtpValidationError(t('please enter a valid OTP'))
        setOtpError('')
      }
    } else {
      dispatch(resetSentEmailVerification())
      setTimeout(() => {
        getSubmit(true)
      }, 1000)
    }
  }

  const onChangeOtp = (otp: string) => {
    setOtpNumber(otp)
  }

  const cancelOtpLogin = () => {
    dispatch(loginReset())
    clearForm()
  }
  const handleConnectWalletConnect = async () => {
    await connect('WalletConnect')
  }
  const handleConnectMetamask = async () => {
    await connect('Metamask')
  }
  const handleConnectCoinbase = async () => {
    await connect('Coinbase')
  }
  const handleConnectTrust = async () => {
    await connect('Trust')
  }

  useEffect(() => {
    if (!isOnMenu && connectStatus) {
      getSubmit(true)
      navigate('/')
      dispatch(loginWithWallet())
    }
  }, [connectStatus])

  return (
    <>
      <div
        id="id01"
        className={classNames('login-form', isOtpSent ? 'hide' : '')}
      >
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          onSubmit={async values => {
            onSubmit(values)
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email(t('invalid email'))
              .required(t('email Required')),
            password: Yup.string()
              .required(t('password Required'))
              .min(8, t('password is too short - should be 8 chars minimum'))
              .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                t(
                  'must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
                ),
              ),
          })}
        >
          {props => {
            const {
              values,
              touched,
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
              // setFieldValue,
              isValid,
              // isSubmitting,
              dirty,
            } = props
            return (
              <form autoComplete="off" onSubmit={handleSubmit}>
                <div className="login-form-container">
                  <div className="field-wrapper ">
                    <label>
                      <b>{t('email')}</b>
                    </label>
                    <FormInput
                      id="user_email"
                      type="text"
                      placeholder={t('enter Email')}
                      name="email"
                      value={values.email}
                      handleChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.email && touched.email && (
                      <div className="input-feedback">{errors.email}</div>
                    )}
                  </div>
                  <div className="field-wrapper">
                    <label>
                      <b>{t('password')}</b>
                    </label>
                    <FormInput
                      id="user_password"
                      type="password"
                      placeholder={t('enter Password')}
                      name="password"
                      value={values.password}
                      handleChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.password && touched.password && (
                      <div className="input-feedback">{errors.password}</div>
                    )}
                  </div>
                  {isLoginError && (
                    <div className="input-feedback text-center mt-20">
                      {isLoginError}
                    </div>
                  )}
                  <SubmitButton
                    isLoading={isLoading}
                    isDisabled={!isValid || !dirty}
                    title={t('sign in')}
                    className="signup-btn"
                    onPress={handleSubmit}
                  />
                  <div className="note-wrapper">
                    <span className="login-text-content">
                      {t('want to connect your wallet instead?')}
                    </span>
                    <WalletConnectButton onPress={handleConnectWalletConnect} />
                    <MetamaskButton onPress={handleConnectMetamask} />
                    <CoinbaseButton onPress={handleConnectCoinbase} />
                    <TrustButton onPress={handleConnectTrust} />
                    <p className="page-text font-16">
                      <a
                        href="#"
                        className="resend-link"
                        onClick={handleLinkClick}
                      >
                        {t('forgot Password?')}
                      </a>
                    </p>
                  </div>
                </div>
              </form>
            )
          }}
        </Formik>
      </div>
      <div className={classNames('otp-form', isOtpSent ? 'show' : 'hide')}>
        <h2 className="page-heading">{t('enter OTP')}</h2>
        <p className="page-text mt-40 mb-40">
          {t('please enter the OTP')}
          <br />
          {t('received on your')}
          <br />
          {t('registered E-mail ID.')}
        </p>
        <OtpInput
          value={otpNumber}
          onChange={onChangeOtp}
          numInputs={6}
          separator={<span></span>}
          inputStyle="input-box otp"
          containerStyle="otp-wrapper"
        />
        {isOtpLoginError ? (
          <div className="input-feedback text-center otp-error">
            {isOtpLoginError}
            {otpAttempts > 0
              ? `. ${t('you have')} ${otpAttempts} ${t('attempts left')}.`
              : ''}
          </div>
        ) : (
          <div className="input-feedback text-center">{otpValidationError}</div>
        )}
        {isOtpLoginSuccess && (
          <p className="page-text resend-link fullwidth mt-20">
            {isOtpLoginSuccess}
          </p>
        )}
        <SubmitButton
          isDisabled={otpAttempts < 1}
          title={t('done')}
          className="btn-done verify-btn mt-40"
          onPress={() => handleLoginWithOtp()}
        />
        {otpAttempts < 1 && (
          <p className="page-text mt-40">
            <a href="#" className="resend-link" onClick={cancelOtpLogin}>
              {t('back to Login')}
            </a>
          </p>
        )}
        <p className="page-text mt-40">
          {t('didn’t get the OTP?')}{' '}
          <a href="#" className="resend-link">
            {t('resend')}
          </a>
        </p>
      </div>
    </>
  )
}

export default Login
