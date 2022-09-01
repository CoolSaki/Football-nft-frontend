import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import classnames from 'classnames'
import SubmitButton from '@components/SubmitButton'
import FormInput from '@components/Form/FormInput'
import Error from './Error'
import { RootState } from '@root/store/rootReducers'
import { useTranslation } from 'react-i18next'

interface Props {
  onSubmit: (v?: any) => void
  onClose: () => void
}

const initialValues = {
  address: '',
}

const Send: React.FC<Props> = ({ onSubmit, onClose }) => {
  const loginInfo = localStorage.getItem('loginInfo')
  const { t } = useTranslation()

  const submitForm = (values: any) => {
    const reqParams = {
      to_address: values.address,
    }
    onSubmit(reqParams)
  }

  return (
    <section className="wallet-container stake-bid-container">
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={submitForm}
        validationSchema={Yup.object().shape({
          address: Yup.string().required(t('receiver address required')),
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
              <div className="field-wrapper">
                {/* <div className="nft-send-heading">Send NFT</div> */}
                <div className="bid-header-container">
                  <div className="stake-bid-header">{t('place bid')}</div>
                </div>
                <div className="bid-desc mt-40 mb-40">
                  {t('you must place a bid')}
                </div>
                <label>
                  <b>{t('enter bid')}:</b>
                </label>
                <FormInput
                  id="address"
                  type="text"
                  placeholder={t('amount')}
                  name="address"
                  handleChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.address && touched.address && (
                  <div className="input-feedback">{errors.address}</div>
                )}
                <div className="nft-send-desc">
                  {t('this must be valid polygon address')}
                </div>
              </div>
              {!loginInfo ? (
                <div className="send-divider mb-40">
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
              ) : (
                <>
                  <div className={classnames('send-divider mt-20')}>
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
                </>
              )}
            </form>
          )
        }}
      </Formik>
    </section>
  )
}

export default Send
