import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import classnames from 'classnames'
import SubmitButton from '@components/SubmitButton'
import FormInput from '@components/Form/FormInput'
import { Input } from '@components/Form'
import { useDispatch, useSelector } from 'react-redux'
import {
  getWalletDetails,
  sendMatics,
} from '@root/apis/onboarding/authenticationSlice'
import { RootState } from '@root/store/rootReducers'
import { useTranslation } from 'react-i18next'
interface Props {
  onSubmit: (v?: any) => void
  onClose: () => void
}

const initialValues = {
  matic: '',
  address: '',
}

const Send: React.FC<Props> = ({ onSubmit, onClose }) => {
  const loginInfo = localStorage.getItem('loginInfo')
  const authenticationData = useSelector(
    (state: RootState) => state.authentication,
  )
  const [availableBalance, setAvailableBalance] = useState('')
  const [inputAmount, setInputAmount] = useState('')
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const {
    loader,
    passphraseLoader,
    userWalletData: { USDBalance, address, balance, exchangeRateData },
  } = authenticationData
  console.log(authenticationData)
  useEffect(() => {
    // setAvailableBalance(parseFloat(balance).toFixed(2))
    setAvailableBalance(balance)
  }, [balance])

  useEffect(() => {
    dispatch(getWalletDetails())
  }, [])

  const submitForm = (values: any) => {
    const reqParams = {
      to_address: values.address,
      amount: parseFloat(values.matic),
    }
    onSubmit(reqParams)
    // dispatch(sendMatics(reqParams))
  }

  const isFundsInsufficient =
    parseFloat(availableBalance) < parseFloat(inputAmount) ||
    parseFloat(availableBalance) === 0
  return (
    <section className="wallet-container">
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={submitForm}
        validationSchema={Yup.object().shape({
          matic: Yup.string().required('matic amount required'),
          address: Yup.string().required('receiver address required'),
        })}
      >
        {props => {
          const {
            values,
            touched,
            errors,
            isValid,
            dirty,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          } = props
          return (
            <form autoComplete="off" onSubmit={handleSubmit}>
              <div className="field-wrapper m-0">
                <label>
                  <b>{'MATIC ' + t('sending') + ':'}</b>
                </label>
                {/* <FormInput
                  id="matic"
                  type="text"
                  placeholder="Amount"
                  name="matic"
                  handleChange={handleChange}
                  onBlur={handleBlur}
                /> */}
                {/* <FormInput
                  id="matic"
                  name="matic"
                  type="text"
                  placeholder={t('amount')}
                  value={values.matic}
                  maxLength={10}
                  handleChange={(event: any) => {
                    handleChange(event)
                    setInputAmount(event.target.value)
                  }}
                  onBlur={handleBlur}
                /> */}
                <Input
                  id="matic"
                  name="matic"
                  type="text"
                  placeholder={t('amount')}
                  className="input-box matic-input"
                  value={values.matic}
                  maxLength={12}
                  onChange={(event: any) => {
                    handleChange(event)
                    setInputAmount(event.target.value)
                  }}
                  onBlur={handleBlur}
                />
                {errors.matic && touched.matic && (
                  <div className="input-feedback">{errors.matic}</div>
                )}
              </div>
              <div className="text-wrapper send-max-coins">
                <div>{t('maximum coins to send')}:</div>
                <div
                  className="coins-available"
                  onClick={() => setFieldValue('matic', availableBalance)}
                >
                  {availableBalance.length > 1
                    ? availableBalance
                    : parseFloat(availableBalance).toFixed(2)}
                </div>
              </div>
              <div className="field-wrapper">
                <label>
                  <b>{t('enter Receiver Address')}:</b>
                </label>
                <FormInput
                  id="address"
                  type="text"
                  placeholder={t('receiver Address')}
                  name="address"
                  handleChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.address && touched.address && (
                  <div className="input-feedback">{errors.address}</div>
                )}
              </div>
              <div className="space-block">
                {isFundsInsufficient && (
                  <div className="input-feedback text-center fullwidth mt-40">
                    {t('insufficient Balance to make transaction')}
                  </div>
                )}
              </div>
              <div className="bottom-button-box">
                {!loginInfo ? (
                  <div className="send-divider mb-40">
                    <SubmitButton
                      isDisabled={isFundsInsufficient}
                      title={t('confirm')}
                      className="m-0auto"
                      onPress={handleSubmit}
                    />
                    <div
                      className="form-submit-btn btn-disabled mt-20 m-0auto"
                      onClick={onClose}
                    >
                      {t('cancel')}
                    </div>
                  </div>
                ) : (
                  <>
                    <div
                      className={classnames(
                        'send-divider mb-40',
                        passphraseLoader ? 'hidden' : '',
                      )}
                    >
                      <SubmitButton
                        isDisabled={false}
                        title={t('confirm')}
                        className="m-0auto"
                        onPress={handleSubmit}
                      />
                      <div
                        className="form-submit-btn btn-disabled mt-20 m-0auto"
                        onClick={onClose}
                      >
                        {t('cancel')}
                      </div>
                    </div>
                    <div
                      className={classnames(
                        'passphrase-progress-wrapper mt-40',
                        passphraseLoader ? 'show' : 'hidden',
                      )}
                    >
                      <div className="spinner__circle">
                        <div className="spinner__circle-gradient"></div>
                        <div className="spinner__circle-inner"></div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </form>
          )
        }}
      </Formik>
    </section>
  )
}

export default Send
