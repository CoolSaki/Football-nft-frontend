import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import SearchIcon from '@mui/icons-material/Search'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { PlayerCardData } from '@root/constants'
import SearchInput from '@components/Form/SearchInput'
import { sleep, truncateDecimals } from '@utils/helpers'
import { Input } from '@components/Form'
import Spinner from '@components/Spinner'
import ResponseAlert from '@components/ResponseAlert'
import NftSummary from '../components/NftSummary'
import PurchaseButton from '../components/PurchaseButton'
import '@assets/css/pages/PurchaseNft.css'
import { useDispatch, useSelector } from 'react-redux'
import {
  changeNftValue,
  verifyEmail,
} from '@root/apis/onboarding/authenticationSlice'
import { RootState } from '@root/store/rootReducers'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router'
import classNames from 'classnames'
import { fetchSinglePlayerStats } from '@root/apis/playerStats/playerStatsSlice'
import { isMobile } from 'web3modal'

interface Props {
  playerData?: any
  onClosePopup: any
}
let sellNftInterval: any = null
const SellNftForm: React.FC<Props> = ({ playerData = null, onClosePopup }) => {
  const maxPurchaseAmt = '15.24'
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location: any = useLocation()
  const { t } = useTranslation()
  // const dispatch = useDispatch()
  const [isSearchEnabled, setSearchEnabled] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [response, setResponse] = useState('')
  const [fixedPrice, setFixedPrice] = useState('0.5')
  const [totalSum, setTotalSum] = useState('0')
  const [stopCalculation, setStopCalculation] = useState(false)
  const [buttonTitle, setButtonTitle] = useState('sell')
  const [playerInfo, setPlayerInfo] = useState<any>({})
  const [inProgress, setInProgress] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)
  const [inputAmount, setInputAmount] = useState('0')
  const [amountLoading, setAmountLoading] = useState(false)
  const authenticationData = useSelector(
    (state: RootState) => state.authentication,
  )
  const purchaseData = useSelector((state: RootState) => state.purchases)
  const playerStatsData = useSelector((state: RootState) => state.playerstats)
  const { fetchSinglePlayerStatsData, fetchSinglePlayerStatsRateData } =
    playerStatsData
  const {
    loader,
    userWalletData: { USDBalance, address, balance, exchangeRateData },
  } = authenticationData

  const handleSearch = () => {
    setSearchEnabled(true)
  }
  const handleClose = () => {
    setSearchEnabled(false)
  }

  useEffect(() => {
    if (location) {
      setPlayerInfo(location?.state?.profileData)
    }
  }, [location])

  useEffect(() => {
    calculateTotal()
  }, [fetchSinglePlayerStatsData[0]])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      calculateTotal()
      // Send Axios request here
    }, 2000)
    return () => clearTimeout(delayDebounceFn)
  }, [inputAmount])

  useEffect(() => {
    getBuyDetails()
    return () => {
      clearInterval(sellNftInterval)
    }
  }, [])

  const handleGetPriceStats = (playersData: any) => {
    dispatch(fetchSinglePlayerStats(playersData))
  }

  useEffect(() => {
    if (playerData.id) {
      handleGetPriceStats([playerData.id])
      clearInterval(sellNftInterval)
      sellNftInterval = setInterval(() => {
        handleGetPriceStats([playerData.id])
      }, 10000)
      // createTestPlayers()
    }
  }, [playerData])

  const handleSell = async () => {
    setResponse('')
    setStopCalculation(true)
    setIsCalculating(true)
    setLoading(true)
    for (let i = 0; i < 3; i++) {
      await sleep(i * 1000)
    }
    setLoading(false)
    const resp = true
    setResponse(resp ? t('success') : t('error'))
    setButtonTitle(t('close'))
    // setButtonTitle(resp ? 'Done' : 'Stake')
  }

  const handleClosePopup = () => {
    onClosePopup()
  }

  // const calculateTotal = async () => {
  //   const total =
  //     parseFloat(fetchSinglePlayerStatsData[0]?.matic) * parseFloat(inputAmount)
  //   const absTotal = truncateDecimals(total, 4)
  //   setIsCalculating(true)
  //   for (let i = 0; i < 2; i++) {
  //     await sleep(i * 1000)
  //   }
  //   setIsCalculating(false)
  //   setTotalSum(absTotal.toString())
  // }
  const calculateTotal = async () => {
    let total: any = null
    if (inputAmount !== '0' && inputAmount !== '') {
      total =
        parseFloat(fetchSinglePlayerStatsData[0]?.matic) *
        parseFloat(inputAmount)
    } else {
      total = parseFloat(fetchSinglePlayerStatsData[0]?.matic) * 0
    }

    const absTotal = truncateDecimals(total, 4)
    setIsCalculating(true)
    for (let i = 0; i < 2; i++) {
      await sleep(i * 1000)
    }
    // setInputAmount(event.target.value)
    setIsCalculating(false)
    setTotalSum(absTotal.toString())
  }

  // useEffect(() => {
  //   getBuyDetails()
  // }, [])

  const getBuyDetails = async () => {
    setInProgress(true)
    for (let i = 0; i < 2; i++) {
      await sleep(i * 1000)
    }
    setInProgress(false)
  }

  const handleAsync = async (event: any) => {
    setAmountLoading(true)
    for (let i = 0; i < 2; i++) {
      await sleep(i * 1000)
    }
    setInputAmount(event.target.value)
    setAmountLoading(false)
  }

  const getCallback = (value: string) => {
    handleGetPriceStats([playerData.id])
  }

  const fetchLiveTotalUsd = (value: string) => {
    console.log('FLTU---', value)
  }

  return (
    <div className="purchase-container">
      <div
        className={classnames(
          'balance-progress',
          loader || inProgress ? '' : 'hidden',
        )}
      >
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
      </div>
      <div
        className={classnames(
          'purchase-wrappper',
          loader || inProgress ? 'hidden' : '',
        )}
      >
        <div className="player-title-bar">
          {isSearchEnabled ? (
            <SearchInput
              type="text"
              placeholder={`${t('please enter the search words')}.`}
              className="in-menu-search purchase-search"
              onChange={() => {
                return
              }}
              onClose={handleClose}
            />
          ) : (
            <>
              <div className="player-title-wrapper">
                <ChevronRightIcon className="icon-color" />
                <div>
                  <img
                    src={
                      playerData?.playerpicture ||
                      playerInfo?.playerpicture ||
                      PlayerCardData[purchaseData?.purchasePlayerId].img
                    }
                  />
                </div>
                <div className="player-text-container">
                  <h6>
                    {playerData?.name ||
                      playerInfo?.name ||
                      PlayerCardData[purchaseData?.purchasePlayerId].name}
                  </h6>
                  <h6>MC00001</h6>
                </div>
              </div>
              <SearchIcon className="icon-color" onClick={handleSearch} />
            </>
          )}
        </div>
        <Formik
          enableReinitialize={true}
          initialValues={{ price: '' }}
          onSubmit={async values => {
            if (response === 'Success' || response === 'Error') {
              handleClosePopup()
            } else {
              handleSell()
            }
          }}
          validationSchema={Yup.object().shape({
            price: Yup.string().required(t('required')),
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
              <form onSubmit={handleSubmit} autoComplete={'off'}>
                <div className="purchase-form">
                  <div className="form-label-wrapper">
                    <label htmlFor="playerPrice" className="capitalize">
                      {t('sell')}
                    </label>
                    {errors.price && touched.price && (
                      <div className="input-feedback purchase-error">
                        {errors.price}
                      </div>
                    )}
                  </div>
                  <Input
                    id="sell_price"
                    name="price"
                    // type="text"
                    type={isMobile() ? 'number' : 'text'}
                    placeholder={t('amount')}
                    // className="input-box"
                    value={values.price}
                    onBlur={handleBlur}
                    maxLength={10}
                    onChange={(event: any) => {
                      handleChange(event)
                      // handleAsync(event)
                      setInputAmount(event.target.value)
                      // calculateTotal(event)
                    }}
                    disabled={amountLoading}
                    // placeholder={t('amount')}
                    className={classnames(
                      'input-box',
                      isCalculating ? 'input-disabled' : '',
                    )}
                  />
                  {values.price === balance ? (
                    <div className="form-label-wrapper align-end">
                      <label
                        className="reset-txt"
                        onClick={() => setFieldValue('price', '')}
                      >
                        {t('clear')}
                      </label>
                    </div>
                  ) : (
                    <div className="form-label-wrapper align-end">
                      <label>{t('maximum coins to sell')}:</label>
                      <label
                        className="form-label-active"
                        onClick={() => setFieldValue('price', balance)}
                      >
                        {balance
                          ? balance.length > 1
                            ? balance
                            : parseFloat(balance).toFixed(2)
                          : '00.00'}
                      </label>
                    </div>
                  )}
                </div>
                <NftSummary
                  // containerClass="extend-height"
                  estimatedValue={fetchSinglePlayerStatsData[0]?.matic}
                  totalValue={totalSum}
                  inProgress={isCalculating}
                  usdRate={fetchSinglePlayerStatsRateData.rate || 0}
                  initCallback={getCallback}
                  stopCalculating={stopCalculation}
                  usdTotalCallback={fetchLiveTotalUsd}
                />
                {/* <div className="spinner-wrapper purchase-spinner">
                  <Spinner
                    spinnerStatus={isLoading}
                    title={t('awaiting Confirmation')}
                  />
                </div> */}
                {isLoading ? (
                  <div className="spinner-wrapper purchase-loader">
                    <Spinner
                      className="purchase-spinner"
                      spinnerStatus={isLoading}
                      title={t('awaiting Confirmation')}
                    />
                  </div>
                ) : null}
                <div
                  className={classNames(
                    'purchase-submit-wrapper',
                    'btn-purchase',
                    isLoading ? 'hidden' : '',
                  )}
                >
                  <ResponseAlert status={response} />
                  <PurchaseButton
                    disabled={isLoading}
                    title={buttonTitle}
                    onPress={handleSubmit}
                    className={classnames(
                      isCalculating && !stopCalculation
                        ? 'purchase-btn-inactive'
                        : '',
                    )}
                  />
                </div>
              </form>
            )
          }}
        </Formik>
      </div>
    </div>
  )
}

export default SellNftForm
