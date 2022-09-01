import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Input } from '@components/Form'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import { isMobile } from 'web3modal'
import {
  contactUs,
  contactUsReset,
  contactUsSuccess,
} from '@root/apis/careers/careersSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@root/store/rootReducers'
import classNames from 'classnames'

interface Props {
  isNotification?: boolean
  onClose?: (v?: any) => void
}
const NewsLetter: React.FC<Props> = ({ isNotification, onClose }) => {
  const { t } = useTranslation()
  const careerData = useSelector((state: RootState) => state.careers)
  const { isLoading, isContactUsError, isContactUsSuccess } = careerData
  const dispatch = useDispatch()

  const getTranslation = (text: string) => {
    const translation = t(text)
    if (translation === text) {
      // return '!__no_translation__!'
      return text
    } else {
      return translation
    }
  }

  useEffect(() => {
    console.log({ isContactUsSuccess, isContactUsError })
  }, [isContactUsSuccess, isContactUsError])

  const handleSubscribe = (values: any) => {
    const request = {
      ...values,
      fullname: 'email',
      message: 'newsletter',
      location: 98,
      form_type: isNotification ? 'get-notified' : 'newsletter',
    }
    dispatch(contactUs(request))
  }

  return (
    <div className="newsletter-wrapper">
      {isNotification ? (
        <>
          <span className="blog-title bottom-title ct-h1">
            {t('don’t miss out')}
          </span>
          <div className="bottom-caption-wrapper">
            <span className="blog-content bottom-content pg-lg">
              {getTranslation(
                'get notified amongst the first and get early access to the first player launches.',
              )}
            </span>
          </div>
        </>
      ) : (
        <>
          <span className="blog-title bottom-title h-2">
            {t('stay in the loop')}
          </span>
          <div className="bottom-caption-wrapper">
            {!isMobile() ? <div className="caption-divider"></div> : null}
            <span className="blog-content bottom-content newsletter-caption pg-lg">
              {getTranslation('get notified and be amongst the first')}
            </span>
            {!isMobile() ? <div className="caption-divider"></div> : null}
          </div>
        </>
      )}
      <Formik
        enableReinitialize={true}
        initialValues={{ email: '' }}
        onSubmit={async values => {
          handleSubscribe(values)
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email(t('invalid email'))
            .required(t('email Required')),
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
          } = props
          return (
            <form
              onSubmit={handleSubmit}
              autoComplete={'off'}
              className="loop-stay-form"
            >
              {!isContactUsSuccess && (
                <div>
                  <Input
                    allowAlphaNumeric
                    id="email_address"
                    name="email"
                    type="text"
                    value={values.email}
                    placeholder={t('your email address')}
                    className="input-box"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div className="field-wrapper m-0">
                    {errors.email && touched.email && (
                      <div className="input-feedback">{errors.email}</div>
                    )}
                  </div>
                </div>
              )}
              {isContactUsSuccess && (
                <span className="button-box-loading newsletter-success">
                  {isNotification ? (
                    <>
                      {getTranslation(
                        'you have been added to our early joiner list',
                      )}
                    </>
                  ) : (
                    <>
                      <div style={{ height: '27px' }}>
                        <CheckCircleOutlinedIcon className="response-icon success-icon" />
                      </div>
                      {getTranslation('added to early joiners list')}
                    </>
                  )}
                </span>
              )}
              {isContactUsError && (
                <div className="input-feedback text-center">
                  {getTranslation('something went wrong')}
                </div>
              )}

              {isLoading ? (
                <span className="button-box-loading">
                  <div className="loading-spinner">
                    <div className="spinner__circle">
                      <div className="spinner__circle-gradient"></div>
                      <div className="spinner__circle-inner"></div>
                    </div>
                  </div>
                </span>
              ) : (
                <>
                  {isNotification && isContactUsSuccess ? (
                    <span
                      className="button-line newsletter-submit"
                      onClick={onClose}
                    >
                      <div className="button-box submit-btn-box">
                        {t('close')}
                      </div>
                    </span>
                  ) : (
                    <span
                      className={classNames(
                        'button-line newsletter-submit',
                        isContactUsSuccess ? 'disabled' : '',
                      )}
                      onClick={() => handleSubmit()}
                    >
                      <div className="button-box submit-btn-box">
                        {t('submit')}
                      </div>
                    </span>
                  )}
                </>
              )}
            </form>
          )
        }}
      </Formik>
    </div>
  )
}

export default NewsLetter
