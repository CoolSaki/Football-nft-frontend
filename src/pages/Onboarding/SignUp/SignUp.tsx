import React, { useContext, useEffect, useState } from 'react'
import { Formik } from 'formik'
import ReCAPTCHA from 'react-google-recaptcha'
import { useDispatch, useSelector } from 'react-redux'
import {
  signUp,
  loginWithWallet,
} from '@root/apis/onboarding/authenticationSlice'
import * as Yup from 'yup'
import MetamaskButton from '@components/MetamaskButton'
import CoinbaseButton from '@components/CoinbaseButton'
import TrustButton from '@components/TrustButton'
import FormInput from '../../../components/Form/FormInput'
import SubmitButton from '@components/SubmitButton'
import { RequestParams as OnboardingProps } from '@root/types'
import { RootState } from '@root/store/rootReducers'
import { ConnectContext } from '@root/WalletConnectProvider'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { asyncLocalStorage } from '@utils/helpers'
import { RECAPTCHA_KEY } from '@root/constants'
import WalletConnectButton from '@components/WalletConnectButton'

const initialValues = {
  email: '',
  password: '',
  confirm_password: '',
}

interface Props {
  isOnMenu?: boolean
  onClose: () => void
}

const SignUp: React.FC<Props> = ({ isOnMenu, onClose }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState(false)
  const [signupError, setSignupError] = useState('')
  const [loadCaptcha, setLoadCaptcha] = useState(false)
  const [isCaptcha, setCaptcha] = useState<string | null>('')
  const [isCaptchaError, setCaptchaError] = useState('')

  const { connectStatus, connect, disconnect } = useContext(ConnectContext)

  async function onSubmit(values: OnboardingProps) {
    setSignupError('')
    setLoading(true)
    // if (isCaptcha) {
    setCaptchaError('')
    dispatch(signUp(values))
    // } else {
    //   setCaptchaError(t(`please confirm you're not a robot.`))
    // }
  }
  const authenticationData = useSelector(
    (state: RootState) => state.authentication,
  )

  useEffect(() => {
    setTimeout(() => {
      setLoadCaptcha(true)
    }, 1500)
  }, [])

  const { isSignupError } = authenticationData
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
      onClose()
      navigate('/')
      dispatch(loginWithWallet())
    }
  }, [connectStatus])

  function onChange(value: string | null) {
    setCaptcha(value)
  }

  return (
    <div id="id01" className="login-form">
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
          confirm_password: Yup.string()
            .required(t('confirm Password Required'))
            .oneOf([Yup.ref('password'), null], t('passwords must match')),
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
            setFieldValue,
            isSubmitting,
            isValid,
            dirty,
          } = props
          return (
            <form autoComplete="off">
              <div className="login-form-container">
                <div className="field-wrapper ">
                  <label>
                    <b>{t('email')}</b>
                  </label>
                  <FormInput
                    id="email"
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
                    <b>{t('choose Password')}</b>
                  </label>
                  <FormInput
                    id="password"
                    type="password"
                    placeholder={t('enter Password')}
                    name="password"
                    handleChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password && (
                    <div className="input-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="field-wrapper">
                  <label>
                    <b>{t('confirm Password')}</b>
                  </label>
                  <FormInput
                    id="confirm_password"
                    type="password"
                    placeholder={t('enter Password')}
                    name="confirm_password"
                    handleChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.confirm_password && touched.confirm_password && (
                    <div className="input-feedback">
                      {errors.confirm_password}
                    </div>
                  )}
                </div>
                {loadCaptcha ? (
                  <>
                    <div className="captcha-wrapper">
                      <ReCAPTCHA
                        style={{ display: 'inline-block' }}
                        sitekey={RECAPTCHA_KEY}
                        onChange={onChange}
                        size="invisible"
                      />
                    </div>
                    {isCaptchaError && (
                      <div className="input-feedback text-center">
                        {isCaptchaError}
                      </div>
                    )}
                  </>
                ) : null}
                {isSignupError && (
                  <div className="input-feedback text-center">
                    {isSignupError}
                  </div>
                )}
                <SubmitButton
                  isDisabled={!isValid || !dirty}
                  title={t('sign up')}
                  className="signup-btn"
                  onPress={handleSubmit}
                />
                <div className="note-wrapper">
                  {/* <span className="login-text-content">
                    {t(`don't want an account?`)}{' '}
                  </span> */}
                  <span className="login-text-content">
                    {t('connect your wallet directly')}
                  </span>
                  <WalletConnectButton onPress={handleConnectWalletConnect} />
                  <MetamaskButton onPress={handleConnectMetamask} />
                  <CoinbaseButton onPress={handleConnectCoinbase} />
                  <TrustButton onPress={handleConnectTrust} />
                </div>
              </div>
            </form>
          )
        }}
      </Formik>
    </div>
  )
}

export default SignUp
