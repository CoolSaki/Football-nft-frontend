import React, { useState, useEffect } from 'react'
import { Formik } from 'formik'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import classnames from 'classnames'
import * as Yup from 'yup'
import SubmitButton from '@components/SubmitButton'
import FormInput from '@components/Form/FormInput'
import {
  exportKey,
  exportKeyReset,
  exportKeyRestrict,
  sendMatics,
} from '@root/apis/onboarding/authenticationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@root/store/rootReducers'
import Deposit from './Deposit'
import { useTranslation } from 'react-i18next'
import { decrypt, encrypt } from '@utils/helpers'
interface Props {
  onClose: () => void
}

const initialValues = {
  passphrase: '',
}

const ExportPrivateKey: React.FC<Props> = ({ onClose }) => {
  const dispatch = useDispatch()
  const isRestrictedSecret = localStorage.getItem('secret_restricted')
  let countDown: any = null
  const { t } = useTranslation()
  const [isAddressCopied, setAddressCopied] = useState(false)
  const [state, setState] = useState({
    hours: '00',
    minutes: '00',
    seconds: '00',
  })
  const updateState = (data: any) => {
    setState(state => ({ ...state, ...data }))
  }
  const authenticationData = useSelector(
    (state: RootState) => state.authentication,
  )

  const {
    userWalletData: { USDBalance, address, balance, exchangeRateData },
  } = authenticationData

  const {
    exportKeyLoader,
    isExportKeySuccess,
    isExportKeyError,
    exportSecretAttempts,
  } = authenticationData
  const submitTransaction = (values: any) => {
    const reqParams = {
      user_secret: encrypt(values.passphrase),
    }
    dispatch(exportKey(reqParams))
  }

  const handleCopy = () => {
    setAddressCopied(!isAddressCopied)
    navigator.clipboard.writeText(decrypt(isExportKeySuccess))
  }

  useEffect(() => {
    if (isRestrictedSecret === 'true') {
      // initCountDown()
      dispatch(exportKeyRestrict())
    }
    return () => {
      dispatch(exportKeyReset())
      clearInterval(countDown)
    }
  }, [])

  useEffect(() => {
    if (exportSecretAttempts < 1) {
      initCountDown()
      localStorage.setItem('secret_restricted', 'true')
      // return () => {
      //   clearInterval(countDown)
      // }
    }
  }, [exportSecretAttempts])

  const initCountDown = () => {
    const countDownDate = new Date().getTime() + 15 * 60 * 1000

    // Update the count down every 1 second
    countDown = setInterval(function () {
      // Get today's date and time
      const now = new Date().getTime()

      // Find the distance between now and the count down date
      const distance = countDownDate - now

      // Time calculations for hours, minutes and seconds
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      )
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      updateState({
        hours,
        minutes,
        seconds,
      })
      if (distance < 0) {
        dispatch(exportKeyReset())
        clearInterval(countDown)
        localStorage.removeItem('secret_restricted')
      }
    }, 1000)
  }

  return (
    <div className="export-private-key-container">
      {!isExportKeySuccess ? (
        <section className="wallet-container">
          <div className={classnames(exportSecretAttempts > 0 ? '' : 'hidden')}>
            <Formik
              enableReinitialize={true}
              initialValues={initialValues}
              onSubmit={submitTransaction}
              validationSchema={Yup.object().shape({
                passphrase: Yup.string()
                  .required(t('secret passphrase Required'))
                  .min(3, t('invalid passphrase')),
              })}
            >
              {props => {
                const {
                  dirty,
                  touched,
                  errors,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                } = props
                return (
                  <>
                    <form autoComplete="off" onSubmit={handleSubmit}>
                      <div
                        className={classnames(
                          'passphrase-container',
                          isExportKeySuccess ? 'hidden' : '',
                        )}
                      >
                        <div className="export-form-box">
                          <h2 className="wallet-heading mt-40 passphrase-heading">
                            {t(
                              'enter your secret passphrase to export your private key',
                            )}
                          </h2>
                          <div className="field-wrapper">
                            <FormInput
                              id="passphrase"
                              type="text"
                              placeholder={t('secret passphrase')}
                              name="passphrase"
                              handleChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </div>
                        {errors.passphrase && touched.passphrase && (
                          <div className="input-feedback p-0">
                            {errors.passphrase}
                          </div>
                        )}
                        <div className="passphrase-divider mb-20">
                          <div
                            className={classnames(
                              'space-block',
                              isExportKeySuccess ? 'hidden' : '',
                            )}
                          >
                            <div
                              className={classnames(
                                'input-feedback text-center otp-error m-0',
                                isExportKeyError ? '' : 'hidden',
                              )}
                            >
                              {isExportKeyError}
                              {isExportKeyError
                                .toLowerCase()
                                .includes('incorrect secret key') ? (
                                <>
                                  <br />
                                  {t('you have')} {exportSecretAttempts}{' '}
                                  {t('attempts left')}
                                </>
                              ) : null}
                              {/* <br />
                              You have {exportSecretAttempts} attempts left */}
                            </div>
                          </div>
                          <div
                            className={classnames(
                              'submit-wrapper',
                              exportKeyLoader ? 'hidden' : '',
                            )}
                          >
                            <SubmitButton
                              title={t('confirm')}
                              className="mt-40 m-0auto"
                              onPress={handleSubmit}
                            />
                          </div>
                          <div
                            className={classnames(
                              'passphrase-progress-wrapper mt-40',
                              exportKeyLoader ? 'show' : '',
                            )}
                          >
                            <div className="spinner__circle">
                              <div className="spinner__circle-gradient"></div>
                              <div className="spinner__circle-inner"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </>
                )
              }}
            </Formik>
            <SubmitButton
              isDisabled={false}
              title={isExportKeySuccess ? t('done') : t('cancel')}
              className={classnames(
                'btn-disabled m-0auto passphrase-cancel',
                exportKeyLoader ? 'hidden' : '',
              )}
              onPress={onClose}
            />
          </div>
          <div
            className={classnames(
              'passphrase-container',
              exportSecretAttempts < 1 ? '' : 'hidden',
            )}
          >
            <h2 className="wallet-heading passphrase-heading m-0">
              {t('your attempts were exhausted')}
            </h2>
            <h2 className="wallet-heading passphrase-heading m-0">
              {t('please wait before you try again')}
            </h2>
            <div className="secret-countdown">
              {state.hours}h : {state.minutes}m : {state.seconds}s
            </div>
            <div className="green-line-btn deposit-cancel" onClick={onClose}>
              {t('close')}
            </div>
          </div>
        </section>
      ) : (
        <Deposit
          title={t('here is your private key')}
          address={decrypt(isExportKeySuccess)}
          onClose={() => onClose()}
          containerClassName={classnames(
            'export-key-container',
            !isExportKeySuccess ? 'hidden' : '',
          )}
        />
      )}
    </div>
  )
}

export default ExportPrivateKey
