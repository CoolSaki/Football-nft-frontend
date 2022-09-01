import React, { useEffect, useState, useRef } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import classnames from 'classnames'
import FormInput from '@components/Form/FormInput'
import Select from '@components/Form/Select'
import SubmitButton from '@components/SubmitButton'
import { useTranslation } from 'react-i18next'
import FormCheckbox from '@components/Form/FormCheckbox'
import { useDispatch, useSelector } from 'react-redux'
import { getCountries } from '@root/apis/onboarding/authenticationSlice'
import { RootState } from '@root/store/rootReducers'
import { monthSet } from '@root/constants'
import {
  createPlayer,
  getPlayerData,
  resetPlayerData,
} from '@root/apis/playerCoins/playerCoinsSlice'
import { useLocation } from 'react-router'
import Spinner from '@components/Spinner'

const initialValues = {
  email: '',
  firstName: '',
  surName: '',
  artistName: '',
  daySelected: '',
  monthSelected: '',
  yearSelected: '',
  nationality: '',
}
const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const today = new Date()
const targetDate = new Date(
  today.getFullYear() - 42,
  today.getMonth(),
  today.getDate(),
)
interface Props {
  onSubmit: () => any
}
interface Years {
  id: number
  value: number
  title: number
}

let repeat: any = null
const PlayerCoinRequest: React.FC<Props> = ({ onSubmit }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const location = useLocation()
  const [daySelected, setDaySelected] = useState(targetDate.getDate())
  const [monthSelected, setMonthSelected] = useState(targetDate.getMonth())
  const [yearSelected, setYearSelected] = useState(targetDate.getFullYear())
  const [yearSet, setYearSet] = useState<Years[]>([])
  const [daysSet, setDaysSet] = useState<Years[]>([])
  const [pending, setPending] = useState(false)
  const [preData, setPreData] = useState<any>(null)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [inProgress, setInProgress] = useState(true)

  const authenticationData = useSelector(
    (state: RootState) => state.authentication,
  )
  const playerCoinData = useSelector((state: RootState) => state.playercoins)
  const { loader, isGetCountriesError, countriesData } = authenticationData
  const {
    isLoading,
    isCreatePlayerError,
    isCreatePlayerSuccess,
    allPlayersData,
  } = playerCoinData

  // useEffect(() => {
  //   if (allPlayersData.length > 0) {
  //     const initialData = {
  //       email: allPlayersData[0]?.email,
  //       firstName: allPlayersData[0]?.givenname,
  //       surName: allPlayersData[0]?.surname,
  //       artistName: allPlayersData[0]?.artistname,
  //       daySelected: allPlayersData[0]?.dateofbirth?.split('-')[2],
  //       monthSelected:
  //         allPlayersData[0]?.dateofbirth?.split('-')[1] >= 10
  //           ? allPlayersData[0]?.dateofbirth?.split('-')[1]
  //           : allPlayersData[0]?.dateofbirth?.split('-')[1].replace(0, '') - 1,
  //       yearSelected: allPlayersData[0]?.dateofbirth?.split('-')[0],
  //       nationality: allPlayersData[0]?.nationality?.countryname,
  //     }
  //     console.log({ allPlayersData })
  //     setPreData(initialData)
  //   }
  // }, [allPlayersData])

  // useEffect(() => {
  //   window.scrollTo(0, 0)
  //   dispatch(resetPlayerData())
  //   dispatch(getCountries())
  //   setDate(targetDate)
  //   setYears(20)
  //   if (allPlayersData[0]?.email) {
  //     // dispatch(getPlayerData())
  //     // setTimeout(() => {
  //     //   if (allPlayersData && allPlayersData.length > 0) {
  //     //     if (allPlayersData[0]?.playerstatusid?.id === 1) {
  //     //       checkPlayerDetail()
  //     //     }
  //     //   }
  //     // }, 4000)
  //   }
  //   console.log('myen---', allPlayersData)
  //   return () => {
  //     console.log('playercoinrequest_removed')
  //     clearInterval(repeat)
  //   }
  // }, [])

  useEffect(() => {
    dispatch(getCountries())
    setDate(targetDate)
    setYears(20)
    if (allPlayersData.length > 0) {
      const initialData = {
        email: allPlayersData[0]?.email,
        firstName: allPlayersData[0]?.givenname,
        surName: allPlayersData[0]?.surname,
        artistName: allPlayersData[0]?.artistname,
        daySelected:
          allPlayersData[0]?.dateofbirth?.split('-')[2] >= 10
            ? allPlayersData[0]?.dateofbirth?.split('-')[2]
            : allPlayersData[0]?.dateofbirth?.split('-')[2].replace(0, ''),
        monthSelected:
          allPlayersData[0]?.dateofbirth?.split('-')[1] >= 10
            ? allPlayersData[0]?.dateofbirth?.split('-')[1] - 1
            : allPlayersData[0]?.dateofbirth?.split('-')[1].replace(0, '') - 1,
        yearSelected: parseFloat(allPlayersData[0]?.dateofbirth?.split('-')[0]),
        nationality: allPlayersData[0]?.nationality?.countryname,
      }
      setPreData(initialData)
    }
    setTimeout(() => {
      setInProgress(false)
    }, 3000)
    // if (allPlayersData && allPlayersData.length > 0) {
    //   if (allPlayersData[0]?.playerstatusid?.id === 1) {
    //     console.log('yesskk--', allPlayersData)
    //     checkPlayerDetail()
    //   }
    // }
    return () => {
      console.log('playercoinrequest_removed')
      clearInterval(repeat)
    }
  }, [])

  useEffect(() => {
    console.log('barr--', allPlayersData)
    if (isCreatePlayerSuccess || allPlayersData.length > 0) {
      checkPlayerDetail()
      if (allPlayersData.length > 0) {
        const initialData = {
          email: allPlayersData[0]?.email,
          firstName: allPlayersData[0]?.givenname,
          surName: allPlayersData[0]?.surname,
          artistName: allPlayersData[0]?.artistname,
          daySelected:
            allPlayersData[0]?.dateofbirth?.split('-')[2] >= 10
              ? allPlayersData[0]?.dateofbirth?.split('-')[2]
              : allPlayersData[0]?.dateofbirth?.split('-')[2].replace(0, ''),
          monthSelected:
            allPlayersData[0]?.dateofbirth?.split('-')[1] >= 10
              ? allPlayersData[0]?.dateofbirth?.split('-')[1] - 1
              : allPlayersData[0]?.dateofbirth?.split('-')[1].replace(0, '') -
                1,
          yearSelected: parseFloat(
            allPlayersData[0]?.dateofbirth?.split('-')[0],
          ),
          nationality: allPlayersData[0]?.nationality?.countryname,
        }
        setPreData(initialData)
      }
    }
  }, [isCreatePlayerSuccess, allPlayersData])

  const checkPlayerDetail = () => {
    clearInterval(repeat)
    repeat = setInterval(() => {
      console.log('PCR_TIMER')
      dispatch(getPlayerData())
    }, 10000)
  }

  // useEffect(() => {
  //   window.scrollTo(0, 0)
  //   dispatch(getPlayerData())
  //   setTimeout(() => {
  //     if (playerCoinData && playerCoinData.allPlayersData.length > 0) {
  //       if (
  //         playerCoinData.allPlayersData[0]?.playerpicture ||
  //         isPlayerPicture(playerInfo?.playerpicture)
  //       ) {
  //         checkPlayerDetail()
  //       }
  //     } else if (playerInfo && playerInfo.playerpicture) {
  //       checkPlayerDetail()
  //     }
  //   }, 4000)
  //   return () => {
  //     clearInterval(repeat)
  //   }
  // }, [])

  const getNationIndex = (iso: string) => {
    return countriesData.findIndex((item: any) => item.iso2 === iso) + 1
  }

  async function onSubmitForm(values: any) {
    // setPending(true)
    const reqParams = {
      artistname: values.artistName,
      givenname: values.firstName,
      surname: values.surName,
      nationality: getNationIndex(values.nationality),
      email: values.email,
      dateofbirth:
        values.yearSelected +
        '-' +
        (parseFloat(values.monthSelected) + 1) +
        '-' +
        values.daySelected, //'1980-01-25',
      // publickey: 'x4bcvbcvbvcbvcbvc',
    }
    dispatch(createPlayer(reqParams))
  }

  function setDate(date: any) {
    setDays(date.getMonth())
    setDaySelected(date.getDate())
    setMonthSelected(date.getMonth())
    setYearSelected(date.getFullYear())
  }

  function setDays(monthIndex: number) {
    const optionCount = 0 //daySelected //2 //$('#select-day option').length,
    const daysCount = daysInMonth[monthIndex]
    const daysArr = []
    if (optionCount < daysCount) {
      for (let i = optionCount; i < daysCount; i++) {
        daysArr.push({
          id: i + 1,
          value: i + 1,
          title: i + 1,
        })
      }
      setDaysSet(daysArr)
    } else {
      for (let i = daysCount; i < optionCount; i++) {
        const optionItem = '#select-day option[value=' + (i + 1) + ']'
      }
    }
  }

  function setYears(val: number) {
    const year = targetDate.getFullYear()
    const yearArr = []
    for (let i = 0; i < val; i++) {
      yearArr.push({
        id: i + 1,
        value: year + i,
        title: year + i,
      })
    }
    setYearSet(yearArr)
  }

  const handleDayChange = (evt: any) => {
    setDaySelected(evt.target.value)
  }

  const handleMonthChange = (evt: any) => {
    setMonthSelected(evt.target.value)
    const monthIndex = monthSelected
    setDays(evt.target.value)
  }

  const handleYearChange = (evt: any) => {
    setYearSelected(evt.target.value)
  }

  const handleAcceptTerms = (isChecked: boolean) => {
    setTermsAccepted(isChecked)
  }

  const checkVerificationStatus = () => {
    dispatch(getPlayerData())
  }

  const getDefaultNation = () => {
    if (allPlayersData.length > 0 && allPlayersData[0]?.nationality) {
      const selectedNation: any = countriesData.filter(
        (item: any) =>
          item.countryname === allPlayersData[0]?.nationality?.countryname,
      )
      console.log({ selectedNation })
      return selectedNation[0]?.iso2
    }
    return ''
  }

  return (
    <div
      className={classnames(
        'fullwidth dlg-content player-coin-request',
        loader || inProgress ? 'in-progress' : '',
      )}
    >
      {loader || inProgress ? (
        <div
          className={classnames(
            'loading-spinner-container mb-40 mt-40',
            'show',
          )}
        >
          <div className="loading-spinner">
            <div className="spinner__circle">
              <div className="spinner__circle-gradient"></div>
              <div className="spinner__circle-inner"></div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="player-dashboard-title">
            {t('launch your own player coin')}
          </div>
          <div className="player-dashboard-desc">
            {t(
              'you are a football player and want to launch your own player coin?',
            )}
            {t('we must first verify that it is you!')}
          </div>
          <Formik
            enableReinitialize={true}
            initialValues={preData || initialValues}
            onSubmit={async values => {
              onSubmitForm(values)
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email(t('invalid email'))
                .required(t('email required')),
              firstName: Yup.string()
                .required(t('required'))
                .min(3, t('name should be 3 characters at least')),
              surName: Yup.string()
                .required(t('required'))
                .min(3, t('surname should be 3 characters at least')),
              daySelected: Yup.string().required(t('date is required')),
              monthSelected: Yup.string().required(t('month is required')),
              yearSelected: Yup.string().required(t('year is required')),
              nationality: Yup.string().required(t('nationality is required')),
            })}
          >
            {props => {
              console.log('meinProps--', props)
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
                <form
                  className="player-coin-form"
                  autoComplete="off"
                  onSubmit={handleSubmit}
                >
                  <div className="input-label">{t('email address')}</div>

                  <FormInput
                    id="email"
                    type="email"
                    disabled={allPlayersData[0]?.email}
                    placeholder={t('enter email address')}
                    name="email"
                    value={values.email}
                    handleChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email && (
                    <div className="input-feedback">{errors.email}</div>
                  )}
                  <div className="input-label">
                    {t('given name & middle name (as in passport)')}
                  </div>
                  <FormInput
                    id="name"
                    type="text"
                    placeholder={t('enter given name')}
                    name="firstName"
                    value={values.firstName}
                    handleChange={handleChange}
                    onBlur={handleBlur}
                    disabled={allPlayersData[0]?.email}
                  />
                  {errors.firstName && touched.firstName && (
                    <div className="input-feedback">{errors.firstName}</div>
                  )}
                  <div className="input-label">
                    {t('surname (as in passport)')}
                  </div>
                  <FormInput
                    id="surname"
                    type="text"
                    placeholder={t('enter surname')}
                    name="surName"
                    value={values.surName}
                    handleChange={handleChange}
                    onBlur={handleBlur}
                    disabled={allPlayersData[0]?.email}
                  />
                  {errors.surName && touched.surName && (
                    <div className="input-feedback">{errors.surName}</div>
                  )}
                  <div className="input-label">
                    {t('artist name (leave empty if none)')}
                  </div>
                  <FormInput
                    id="artistName"
                    type="text"
                    placeholder={t('enter artist name')}
                    name="artistName"
                    value={values.artistName}
                    handleChange={handleChange}
                    onBlur={handleBlur}
                    disabled={allPlayersData[0]?.email}
                  />
                  {errors.artistName && touched.artistName && (
                    <div className="input-feedback">{errors.artistName}</div>
                  )}
                  <div className="input-label">{t('date of Birth')}</div>
                  {/* <div className="birthday">
                    <FormInput
                      id="day"
                      type="number"
                      placeholder="DD"
                      name="day"
                      maxLength={2}
                      value={values.day}
                      handleChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormInput
                      id="month"
                      type="number"
                      placeholder="MM"
                      name="month"
                      maxLength={2}
                      value={values.month}
                      handleChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormInput
                      id="year"
                      type="number"
                      placeholder="YYYY"
                      name="year"
                      maxLength={4}
                      value={values.year}
                      handleChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div> */}
                  <div className="birthday">
                    <select
                      id="select-day"
                      className="dob-select"
                      value={values.daySelected}
                      name="daySelected"
                      // onChange={handleChange}
                      onChange={(event: any) => {
                        handleChange(event)
                        // calculateTotal(event)
                        handleDayChange(event)
                      }}
                      onBlur={handleBlur}
                      disabled={allPlayersData[0]?.email}
                    >
                      <option>DD</option>
                      {daysSet.map(({ value, title }, index) => (
                        <option key={index} value={value}>
                          {title}
                        </option>
                      ))}
                    </select>
                    <select
                      id="select-month"
                      className="dob-select"
                      value={values.monthSelected}
                      name="monthSelected"
                      // onChange={handleChange}
                      onChange={(event: any) => {
                        handleChange(event)
                        // calculateTotal(event)
                        handleMonthChange(event)
                      }}
                      onBlur={handleBlur}
                      disabled={allPlayersData[0]?.email}
                    >
                      <option>MM</option>
                      {monthSet.map(({ value, title }, index) => (
                        <option key={index} value={value}>
                          {title}
                        </option>
                      ))}
                    </select>
                    <select
                      id="select-year"
                      className="dob-select"
                      value={values.yearSelected}
                      name="yearSelected"
                      // onChange={handleChange}
                      onChange={(event: any) => {
                        handleChange(event)
                        // calculateTotal(event)
                        handleYearChange(event)
                      }}
                      onBlur={handleBlur}
                      disabled={allPlayersData[0]?.email}
                    >
                      <option>YYYY</option>
                      {yearSet.map(({ value, title }, index) => (
                        <option key={index} value={value}>
                          {title}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.daySelected && touched.daySelected && (
                    <div className="input-feedback">{errors.daySelected}</div>
                  )}
                  {errors.yearSelected && touched.yearSelected && (
                    <div className="input-feedback">{errors.monthSelected}</div>
                  )}
                  {errors.yearSelected && touched.yearSelected && (
                    <div className="input-feedback">{errors.yearSelected}</div>
                  )}
                  <div className="input-label">{t('nationality')}</div>
                  <div
                    className={classnames(
                      'player-dashboard-select',
                      allPlayersData[0]?.nationality
                        ? 'player-select-disabled'
                        : '',
                    )}
                  >
                    <Select
                      title={t('select')}
                      defaultValue={getDefaultNation()}
                      fieldName="nationality"
                      placeholder={t('select nationality')}
                      data={countriesData}
                      disabled={isGetCountriesError ? true : false}
                      onChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  </div>
                  {errors.nationality && touched.nationality && (
                    <div className="input-feedback">{errors.nationality}</div>
                  )}
                  {isGetCountriesError && (
                    <div className="input-feedback text-center">
                      {isGetCountriesError}
                    </div>
                  )}
                  <div className="player-dashboard-notification">
                    {t(
                      'important! We have to verify your identity. Before you will be approved for a player coin, you will have to confirm your identity and for that you will require your ID or Passport alongside a camera. Please follow the instructions precicely as you will not be able to do the verification multiple times',
                    )}
                  </div>
                  {isLoading &&
                    !(
                      <div className="pending-verification">
                        {t('pending verification')}
                      </div>
                    )}
                  {!isLoading &&
                    !isCreatePlayerError &&
                    !isCreatePlayerSuccess &&
                    allPlayersData.length === 0 && (
                      <div className="terms-conditions-check">
                        <FormCheckbox
                          onChange={handleAcceptTerms}
                          defaultChecked={
                            allPlayersData[0]?.email ? true : false
                          }
                        />
                        <div>{t('terms & conditions')}</div>
                      </div>
                    )}
                  {/* <SubmitButton
                    isDisabled={false}
                    isLoading={isLoading}
                    title={t('request player coin')}
                    className="m-0auto"
                    onPress={handleSubmit}
                    // onPress={() => setPending(true)}
                  /> */}
                  {isCreatePlayerError && (
                    <div className="input-feedback text-center create-player-error">
                      {isCreatePlayerError}
                    </div>
                  )}
                  {isCreatePlayerSuccess ? (
                    <p className="page-text semibold fullwidth mt-40 text-center">
                      <a href="#" className="resend-link no-click">
                        {/* {isCreatePlayerSuccess} */}
                      </a>
                    </p>
                  ) : (
                    <SubmitButton
                      isDisabled={!termsAccepted}
                      // isDisabled={true}
                      // isLoading={isLoading}
                      // className={allPlayersData[0]?.email && !['Verified', 'Cancelled'].includes(allPlayersData[0]?.playerstatusid?.playerstatusname) ? '' : 'hidden'}
                      title={t('request player coin')}
                      className={classnames(
                        'm-0auto',
                        allPlayersData[0]?.email ? 'hidden' : '',
                      )}
                      onPress={handleSubmit}
                      // onPress={() => setPending(true)}
                    />
                  )}

                  {/* {isLoading && (
                    <SubmitButton
                      isDisabled={false}
                      title={t('check status')}
                      className="m-0auto btn-disabled"
                      onPress={onSubmit}
                    />
                  )} */}
                  {allPlayersData[0]?.playerstatusid?.id === 1 ||
                  isCreatePlayerSuccess ? (
                    <Spinner
                      spinnerStatus={true}
                      title={t('pending verification')}
                    />
                  ) : null}
                </form>
              )
            }}
          </Formik>
          <SubmitButton
            isDisabled={false}
            title={t('check status')}
            className={classnames(
              'form-submit-btn btn-disabled mt-20 m-0auto status-check-btn',
              (allPlayersData[0]?.email &&
                !['Verified', 'Cancelled'].includes(
                  allPlayersData[0]?.playerstatusid?.playerstatusname,
                )) ||
                isCreatePlayerSuccess
                ? ''
                : 'hidden',
            )}
            onPress={() => checkVerificationStatus()}
          />
        </>
      )}
    </div>
  )
}

export default PlayerCoinRequest
