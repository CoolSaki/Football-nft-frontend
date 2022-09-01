// import React, { useState } from 'react'
// import { Formik } from 'formik'
// import * as Yup from 'yup'
// import classNames from 'classnames'
// import { useNavigate } from 'react-router-dom'
// import '@assets/css/VerifyEmail.css'
// import SubmitButton from '@components/SubmitButton'
// import AppLayout from '@components/AppLayout'
// import { postRequest } from '@root/app/axiosClient'
// import FormInput from '../../Onboarding/components/FormInput'
// import { RequestParams as OnboardingProps } from '@root/types'

// const initialValues = {
//   user_secret: '',
//   confirm_secret: '',
// }

// interface Props {
//   onSubmit: any
// }

// const CreateSecret: React.FC<Props> = ({ onSubmit }) => {
//   const [isLoading, setLoading] = useState(false)
//   const [resetSecretError, setResetSecretError] = useState('')
//   const [resetSecretSuccess, setResetSecretSuccess] = useState('')
//   const navigate = useNavigate()

//   async function handleSubmit(values: OnboardingProps) {
//     onSubmit()
//   }

//   return (
//     <section className="onboarding-container reset-password secret-form">
//       <div id="id01" className={classNames('login-form')}>
//         <h2 className="page-heading mt-40">Create User Secret</h2>
//         <p className="wallet-text create-secret-caption">
//           To create a wallet
//           <br />
//           you need to have a user secret.
//         </p>
//         <Formik
//           enableReinitialize={true}
//           initialValues={initialValues}
//           onSubmit={async values => {
//             handleSubmit(values)
//           }}
//           validationSchema={Yup.object().shape({
//             user_secret: Yup.string()
//               .required('Secret Required')
//               .min(8, 'Secret is too short - should be 8 chars minimum.')
//               .matches(
//                 /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
//                 'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
//               ),
//             confirm_secret: Yup.string()
//               .required('Confirm Secret Required')
//               .oneOf([Yup.ref('user_secret'), null], 'Secrets must match'),
//           })}
//         >
//           {props => {
//             const {
//               touched,
//               errors,
//               handleChange,
//               handleBlur,
//               handleSubmit,
//               isValid,
//               dirty,
//             } = props
//             return (
//               <form autoComplete="off" onSubmit={handleSubmit}>
//                 <div className="login-form-container">
//                   <div className="field-wrapper">
//                     <label>
//                       <b>User Secret</b>
//                     </label>
//                     <FormInput
//                       id="user_secret"
//                       type="password"
//                       placeholder="User Secret"
//                       name="user_secret"
//                       handleChange={handleChange}
//                       onBlur={handleBlur}
//                     />
//                   </div>
//                   <div className="field-wrapper">
//                     <label>
//                       <b>Confirm Secret</b>
//                     </label>
//                     <FormInput
//                       id="confirm_secret"
//                       type="password"
//                       placeholder="Confirm Secret"
//                       name="confirm_secret"
//                       handleChange={handleChange}
//                       onBlur={handleBlur}
//                     />
//                     {errors.confirm_secret && touched.confirm_secret && (
//                       <div className="input-feedback">
//                         {errors.confirm_secret}
//                       </div>
//                     )}
//                   </div>
//                   <div className="input-feedback text-center otp-error m-0">
//                     {resetSecretError}
//                   </div>
//                   <div className="input-feedback text-center otp-success mt-20">
//                     {resetSecretSuccess}
//                   </div>
//                   <SubmitButton
//                     isLoading={isLoading}
//                     isDisabled={!isValid || !dirty}
//                     title="Create Secret"
//                     className="signup-btn mt-40 mb-40"
//                     onPress={handleSubmit}
//                   />
//                 </div>
//               </form>
//             )
//           }}
//         </Formik>
//       </div>
//     </section>
//   )
// }

// export default CreateSecret

import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import classNames from 'classnames'
import FormInput from '../../../components/Form/FormInput'
import { RequestParams as OnboardingProps } from '@root/types'
import SubmitButton from '@components/SubmitButton'
import { RootState } from '@root/store/rootReducers'
import { useDispatch, useSelector } from 'react-redux'
import {
  forgotPassword,
  resetFormPassword,
} from '@root/apis/onboarding/authenticationSlice'
import { useNavigate } from 'react-router'
import { createWallet } from '@root/apis/onboarding/authenticationSlice'
import { useTranslation } from 'react-i18next'
import { encrypt } from '@utils/helpers'

const initialValues = {
  user_secret: '',
  confirm_secret: '',
}

interface Props {
  handleReturn?: any //(v?: boolean) => void
  onSubmit: any
}

const CreateSecret: React.FC<Props> = ({ handleReturn, onSubmit }) => {
  const [isLoading, setLoading] = useState(false)
  const { t } = useTranslation()
  const userEmail = localStorage.getItem('loginId')
  const [state, setState] = useState({
    email: '',
    password: '',
  })
  const [resetSecretError, setResetSecretError] = useState('')
  const [resetSecretSuccess, setResetSecretSuccess] = useState('')

  const updateState = (data: any) => setState(state => ({ ...state, ...data }))

  const dispatch = useDispatch()
  const authenticationData = useSelector(
    (state: RootState) => state.authentication,
  )
  const { loader, isWalletCreatedSuccess, isWalletCreatedError } =
    authenticationData

  useEffect(() => {
    return clearForm()
  }, [])

  useEffect(() => {
    if (isWalletCreatedSuccess) {
      setTimeout(() => {
        onSubmit()
      }, 1000)
    }
  }, [isWalletCreatedSuccess])

  const clearForm = () => {
    setLoading(false)
  }

  // async function onSubmit(values: OnboardingProps) {
  //   const reqParams = {
  //     email: values.email,
  //   }
  //   if (resetPasswordSuccess) {
  //     handleReturn()
  //     dispatch(resetFormPassword())
  //   } else {
  //     setLoading(true)
  //     dispatch(forgotPassword(values))
  //   }
  // }

  const onBackPress = () => {
    dispatch(resetFormPassword())
    handleReturn()
  }
  async function handleSubmit(values: OnboardingProps) {
    const reqParams = {
      email: userEmail,
      user_secret: encrypt(values.user_secret),
    }
    dispatch(createWallet(reqParams))
    //onSubmit()
  }
  return (
    <>
      <div
        id="id01"
        className={classNames(
          'login-form',
          'secret-form',
          authenticationData.isOtpSent ? 'hide' : '',
        )}
      >
        <h2 className="page-heading mt-40">{t('create User Secret')}</h2>
        <p className="wallet-text create-secret-caption">
          {t('to create a wallet')}
          <br />
          {t('you need to have a user secret') + '.'}
        </p>
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          onSubmit={async values => {
            handleSubmit(values)
          }}
          validationSchema={Yup.object().shape({
            user_secret: Yup.string()
              .required(t('secret Required'))
              .min(8, t('secret is too short - should be 8 chars minimum.'))
              .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                t(
                  'must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
                ),
              ),
            confirm_secret: Yup.string()
              .required(t('confirm secret required'))
              .oneOf([Yup.ref('user_secret'), null], t('secrets must match')),
          })}
        >
          {props => {
            const {
              touched,
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
              isValid,
              dirty,
            } = props
            return (
              <form autoComplete="off" onSubmit={handleSubmit}>
                <div className="login-form-container">
                  <div className="field-wrapper secret-field-wrapper">
                    <label>
                      <b>{t('user Secret')}</b>
                    </label>
                    <FormInput
                      id="user_secret"
                      type="password"
                      placeholder={t('user Secret')}
                      name="user_secret"
                      handleChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.user_secret && touched.user_secret && (
                      <div className="input-feedback">{errors.user_secret}</div>
                    )}
                  </div>
                  <div className="field-wrapper secret-field-wrapper">
                    <label>
                      <b>{t('confirm Secret')}</b>
                    </label>
                    <FormInput
                      id="confirm_secret"
                      type="password"
                      placeholder={t('confirm Secret')}
                      name="confirm_secret"
                      handleChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.confirm_secret && touched.confirm_secret && (
                      <div className="input-feedback">
                        {errors.confirm_secret}
                      </div>
                    )}
                  </div>
                  <div className="input-feedback text-center otp-error m-0">
                    {isWalletCreatedError}
                  </div>
                  <div className="input-feedback text-center otp-success mt-20">
                    {isWalletCreatedSuccess}
                  </div>
                  <p className="wallet-text form-note">
                    {t('note: Please remember your secret key.')}
                    <br />
                    {t('if it gets lost, We cannot help you recover it')}
                  </p>
                  <SubmitButton
                    isLoading={loader}
                    isDisabled={!isValid || !dirty}
                    title={t('create secret')}
                    className="signup-btn secret-submit"
                    onPress={handleSubmit}
                  />
                </div>
              </form>
            )
          }}
        </Formik>
      </div>
    </>
  )
}

export default CreateSecret
