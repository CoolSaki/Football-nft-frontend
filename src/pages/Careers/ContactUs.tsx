import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import ReCAPTCHA from 'react-google-recaptcha'
import { useDispatch, useSelector } from 'react-redux'
import { getCountries, signUp } from '@root/apis/onboarding/authenticationSlice'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import * as Yup from 'yup'
import MetamaskButton from '@components/MetamaskButton'
import FormInput from '@components/Form/FormInput'
import SubmitButton from '@components/SubmitButton'
import { RequestParams as OnboardingProps } from '@root/types'
import { RootState } from '@root/store/rootReducers'
import { ConnectContext } from '@root/WalletConnectProvider'
import AppLayout from '@components/AppLayout'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import '@assets/css/pages/Careers.css'
import Select from '@components/Form/Select'
import FormTextArea from '@components/Form/FormTextArea'
import { isMobile } from '@utils/helpers'
import { contactUs, contactUsReset } from '@root/apis/careers/careersSlice'
import classNames from 'classnames'
import { RECAPTCHA_KEY } from '@root/constants'

const ContactUs: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const initialValues = {
    fullname: '',
    email: '',
    message: '',
    location: '',
  }
  const authenticationData = useSelector(
    (state: RootState) => state.authentication,
  )
  const { countriesData } = authenticationData

  useEffect(() => {
    dispatch(getCountries())
    dispatch(contactUsReset())
  }, [])

  const careerData = useSelector((state: RootState) => state.careers)
  const { isLoading, isContactUsError, isContactUsSuccess } = careerData
  const [isCaptcha, setCaptcha] = useState<string | null>('')
  const [loadCaptcha, setLoadCaptcha] = useState(false)
  const [isCaptchaError, setCaptchaError] = useState('')

  const getNationIndex = (iso: string) => {
    return countriesData.findIndex((item: any) => item.iso2 === iso) + 1
  }

  useEffect(() => {
    setTimeout(() => {
      setLoadCaptcha(true)
    }, 1500)
    window.scrollTo(0, 0)
  }, [])

  async function onSubmit(values: any) {
    const reqParams = {
      ...values,
      location: getNationIndex(values.location),
      form_type: 'contact_us',
    }
    // if (isCaptcha) {
    setCaptchaError('')
    dispatch(contactUs(reqParams))
    // } else {
    //   setCaptchaError(t(`please confirm you're not a robot.`))
    // }
  }

  function onChange(value: string | null) {
    setCaptcha(value)
  }

  //   useEffect(() => {
  //     if (isContactUsSuccess) {
  //       setTimeout(() => {
  //         navigate(-1)
  //       }, 1500)
  //     }
  //   }, [isContactUsSuccess])

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <AppLayout headerClass="home" className="careers-layout">
      <div className="terms-container career-container">
        <div
          className={classNames(
            'mt-40 mb-40 careers-container career-success',
            isContactUsSuccess ? '' : 'hidden',
          )}
        >
          <div className="check-container">
            <CheckCircleOutlinedIcon className="response-icon success-icon" />
          </div>
          <a href="#" className="resend-link no-click text-center">
            {t('request sent successfully')}
          </a>
          <SubmitButton
            isDisabled={false}
            title={t('okay')}
            className="btn-disabled career-success-btn"
            onPress={handleGoBack}
          />
        </div>
        <div
          className={classNames(
            'mt-40 mb-40 careers-container',
            isContactUsSuccess ? 'hidden' : '',
          )}
        >
          <div className="careers-main-title ct-h1">{t('contact us')}</div>
          <div id="id01" className="login-form careers-form">
            <Formik
              enableReinitialize={true}
              initialValues={initialValues}
              onSubmit={async values => {
                onSubmit(values)
              }}
              validationSchema={Yup.object().shape({
                fullname: Yup.string()
                  .required(t('required'))
                  .min(3, t('name should be 3 characters at least')),
                email: Yup.string()
                  .email(t('invalid email'))
                  .required(t('email Required')),
                message: Yup.string().required(t('required')),
                location: Yup.string().required(t('location is required')),
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
                    <div className="careers-form-container">
                      <div className="field-wrapper ">
                        <label className="h-5">
                          <b>{t('full name')}</b>
                        </label>
                        <FormInput
                          id="fullname"
                          type="text"
                          placeholder={t('enter full name')}
                          name="fullname"
                          value={values.fullname}
                          handleChange={handleChange}
                          onBlur={handleBlur}
                          className="careers-field"
                        />
                        {errors.fullname && touched.fullname && (
                          <div className="input-feedback">
                            {errors.fullname}
                          </div>
                        )}
                      </div>
                      <div className="field-wrapper ">
                        <label className="h-5">
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
                      <div className="field-wrapper career-description">
                        <label className="h-5">
                          <b>{t('your message')}</b>
                        </label>
                        <FormTextArea
                          id="message"
                          type="text"
                          placeholder={t('enter description')}
                          name="message"
                          value={values.message}
                          handleChange={handleChange}
                          onBlur={handleBlur}
                          containerClass={classNames(
                            'description-box',
                            // isMobile() ? 'mt-40' : 'mt-40',
                          )}
                        />
                        {errors.message && touched.message && (
                          <div className="input-feedback">{errors.message}</div>
                        )}
                      </div>
                      <br />
                      <div className="field-wrapper location-select">
                        <label className="h-5">
                          <b>{t('location')}</b>
                        </label>
                        <div className="player-dashboard-select careers-select">
                          <Select
                            title={t('select location')}
                            fieldName="location"
                            placeholder={t('select location')}
                            data={countriesData}
                            disabled={false}
                            onChange={handleChange}
                            handleBlur={handleBlur}
                          />
                        </div>
                        {errors.location && touched.location && (
                          <div className="input-feedback">
                            {errors.location}
                          </div>
                        )}
                      </div>
                      {loadCaptcha ? (
                        <>
                          <div className="field-wrapper">
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
                      {/* <div className="field-wrapper">
                        <ReCAPTCHA
                          sitekey={RECAPTCHA_KEY}
                          onChange={onChange}
                          size="invisible"
                        />
                      </div>
                      {isCaptchaError && (
                        <div className="input-feedback text-center">
                          {isCaptchaError}
                        </div>
                      )} */}
                      <p
                        className={classNames(
                          'page-text semibold fullwidth mt-40 text-center',
                          isContactUsSuccess ? '' : 'hidden',
                        )}
                      >
                        <a href="#" className="resend-link no-click">
                          {isContactUsSuccess}
                        </a>
                      </p>
                      <SubmitButton
                        isLoading={isLoading}
                        isDisabled={!isValid || !dirty}
                        title={t('send')}
                        className="careers-submit-btn mt-40 mb-40"
                        onPress={handleSubmit}
                      />
                    </div>
                  </form>
                )
              }}
            </Formik>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default ContactUs
