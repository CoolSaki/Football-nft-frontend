import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import { useTranslation } from 'react-i18next'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import SearchIcon from '@mui/icons-material/Search'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { PlayerCardData } from '@root/constants'
import { Input } from '@components/Form'
import SearchInput from '@components/Form/SearchInput'
import { sleep, truncateDecimals } from '@utils/helpers'
import Spinner from '@components/Spinner'
import ResponseAlert from '@components/ResponseAlert'
import NftSummary from '../components/NftSummary'
import PurchaseButton from '../components/PurchaseButton'
import { useDispatch, useSelector } from 'react-redux'
import {
  changeNftValue,
  fetchPurchaseDetails,
  getWalletDetails,
} from '@root/apis/onboarding/authenticationSlice'
import { RootState } from '@root/store/rootReducers'
import '@assets/css/pages/PurchaseNft.css'
import classNames from 'classnames'
import {
  fetchPlayersStats,
  fetchSinglePlayerStats,
} from '@root/apis/playerStats/playerStatsSlice'
import { isMobile } from 'web3modal'
import CreditCardButton from '../components/CreditCardButton'
import WertWidget from '@wert-io/widget-initializer'
import TooltipLabel from '@components/TooltipLabel'
import maticIcon from '@assets/images/matic-token-icon.png'
import visaIcon from '@assets/images/visa.png'
import masterCardIcon from '@assets/images/mc_symbol.png'
import BottomPopup from '@components/BottomPopup'
import PaymentMethodCard from '../components/PaymentMethodCard'
import toast from 'react-hot-toast'

interface Props {
  playerData?: any
  onClosePopup: any
}

interface WertOptions {
  partner_id: string
  container_id: string
  sc_id: string
  sc_address: string
  sc_input_data: string
  pk_id: string
  signature: string
}

const options: WertOptions = {
  partner_id: '',
  container_id: 'purchase-box',
  sc_id: '',
  sc_address: '',
  sc_input_data: '',
  pk_id: '',
  signature: '',
}

const buyNftInterval: any = null
const BuyNftForm: React.FC<Props> = ({ playerData = null, onClosePopup }) => {
  // const BuyNftForm: React.FC = () => {
  const maxPurchaseAmt = '15.24'
  const loginInfo = localStorage.getItem('loginInfo')
  const loginId = localStorage.getItem('loginId')
  const dispatch = useDispatch()
  const wertWidget = new WertWidget(options)
  const { t } = useTranslation()
  const [isSearchEnabled, setSearchEnabled] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [buttonTitle, setButtonTitle] = useState('buy')
  const [response, setResponse] = useState('')
  const [stopCalculation, setStopCalculation] = useState(false)
  const [fixedPrice, setFixedPrice] = useState('0.5')
  const [totalSum, setTotalSum] = useState('0')
  const [inProgress, setInProgress] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)
  const [inputAmount, setInputAmount] = useState('0')
  const [amountLoading, setAmountLoading] = useState(false)
  const [toBuy, setToBuy] = useState(false)
  const [usdTotal, setUsdTotal] = useState('')
  const authenticationData = useSelector(
    (state: RootState) => state.authentication,
  )
  const playerStatsData = useSelector((state: RootState) => state.playerstats)
  const { fetchSinglePlayerStatsData, fetchSinglePlayerStatsRateData } =
    playerStatsData
  const purchaseData = useSelector((state: RootState) => state.purchases)

  // const { loader, loadingBuy } = authenticationData
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
    return () => {
      clearInterval(buyNftInterval)
    }
  }, [])

  const handleBuy = async () => {
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
    // if (loginId || loginInfo) {
    //   clearInterval(buyNftInterval)
    //   setToBuy(true)
    // } else {
    //   toast.error(t('please login to continue'))
    // }
    // setButtonTitle(resp ? 'Done' : 'Stake')
  }

  const handleClosePopup = () => {
    onClosePopup()
  }

  const handleGetPriceStats = (playersData: any) => {
    dispatch(fetchSinglePlayerStats(playersData))
  }

  useEffect(() => {
    if (playerData.id) {
      handleGetPriceStats([playerData.id])
      clearInterval(buyNftInterval)
      // playerStatsInterval = setInterval(() => {
      //   handleGetPriceStats([playerData.id])
      // }, 11000)
      // createTestPlayers()
    }
  }, [playerData])

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

  useEffect(() => {
    getBuyDetails()
    dispatch(getWalletDetails())
  }, [])

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

  const handleWertInput = () => {
    console.log('')
    wertWidget.mount()
  }

  const fetchLiveTotalUsd = (value: string) => {
    console.log('FLTU---', value)
    // setUsdTotal(value)
  }

  const handleCloseToast = () => {
    setToBuy(false)
    // setLoading(false)
    // const resp = true
    // setResponse(resp ? t('success') : t('error'))
    // setButtonTitle(t('close'))
  }

  const isFundsInsufficient =
    parseFloat(balance || '0') < parseFloat(inputAmount)

  return (
    <div className="purchase-container" id="purchase-box">
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
      {/* <BottomPopup mode="wallet" isOpen={toBuy}>
        <div className="available-methods-container">
          <div className="terms-subtitle ct-h4 select-pay-title">
            {t('select payment method')}
          </div>
          <div className="methods-box">
            <PaymentMethodCard
              title="Credit Card"
              logoSet={[
                { id: 1, img: visaIcon },
                { id: 2, img: masterCardIcon },
              ]}
              labelBottom="Total estimated in USD"
              valueBottom={usdTotal}
              unit="dollar"
            />
            <PaymentMethodCard
              title="Cryptocurrency (Matic)"
              logoSet={[{ id: 3, img: maticIcon }]}
              labelBottom="Total estimated"
              valueBottom={totalSum}
              unit="matic"
              isInsufficientMatics={balance < 12}
            />
          </div>
          <div className="deposit-cancel" onClick={handleCloseToast}>
            {t('close')}
          </div>
        </div>
      </BottomPopup> */}
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
                      PlayerCardData[purchaseData?.purchasePlayerId]?.img
                    }
                  />
                </div>
                <div className="player-text-container">
                  <h6>
                    {playerData?.name ||
                      PlayerCardData[purchaseData?.purchasePlayerId]?.name}
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
              handleBuy()
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
                      {t('buy')}
                    </label>
                    {errors.price && touched.price && (
                      <div className="input-feedback purchase-error">
                        {errors.price}
                      </div>
                    )}
                  </div>
                  <Input
                    id="buy_price"
                    name="price"
                    type={isMobile() ? 'number' : 'text'}
                    disabled={isCalculating}
                    placeholder={t('amount')}
                    className={classnames(
                      'input-box',
                      isCalculating ? 'input-disabled' : '',
                    )}
                    value={values.price}
                    maxLength={10}
                    onChange={(event: any) => {
                      handleChange(event)
                      // handleAsync(event)
                      setInputAmount(event.target.value)
                      // setInputAmount(event.target.value)
                      // calculateTotal(event)
                    }}
                    onBlur={handleBlur}
                  />
                  {values.price === balance ? (
                    <div className="form-label-wrapper align-end">
                      <label
                        className="reset-txt"
                        onClick={() => {
                          setFieldValue('price', ''), setInputAmount('0')
                        }}
                      >
                        {t('clear')}
                      </label>
                    </div>
                  ) : (
                    <div className="form-label-wrapper align-end">
                      <label>{t('estimated max purchase')}:</label>
                      <label
                        className="form-label-active"
                        onClick={() => {
                          setFieldValue('price', balance),
                            setInputAmount(balance)
                        }}
                      >
                        {/* 15.24 */}
                        {balance
                          ? balance.length > 1
                            ? balance
                            : truncateDecimals(parseFloat(balance), 4)
                          : '00.00'}
                      </label>
                    </div>
                  )}
                </div>
                <NftSummary
                  estimatedValue={fetchSinglePlayerStatsData[0]?.matic}
                  totalValue={totalSum}
                  inProgress={isCalculating}
                  usdRate={fetchSinglePlayerStatsRateData.rate || 0}
                  initCallback={getCallback}
                  stopCalculating={stopCalculation}
                  usdTotalCallback={fetchLiveTotalUsd}
                />
                {/* {isFundsInsufficient && (
                  <div className="space-block purchase-alert">
                    <div className="input-feedback text-center fullwidth">
                      {t('insufficient Balance to make transaction')}
                    </div>
                  </div>
                )} */}
                <div className="spinner-wrapper purchase-loader">
                  <Spinner
                    className="purchase-spinner"
                    spinnerStatus={isLoading}
                    title={t('awaiting Confirmation')}
                  />
                </div>
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
                    isInactive={isFundsInsufficient}
                    title={buttonTitle}
                    onPress={handleSubmit}
                    // className={classnames(
                    //   isCalculating && !stopCalculation
                    //     ? 'purchase-btn-inactive'
                    //     : '',
                    // )}
                    className={classnames(
                      isCalculating && !stopCalculation
                        ? 'purchase-btn-inactive'
                        : '',
                    )}
                  />
                  {/* <div className="supported-methods-wrapper">
                    <div className="ms-2 me-auto text-gray">
                      {t('accepted payment methods')}
                    </div>
                    <div className="methods-wrapper">
                      <TooltipLabel title="MATIC">
                        <img src={maticIcon} alt="" />
                      </TooltipLabel>
                      <TooltipLabel title="Visa">
                        <img src={visaIcon} alt="" />
                      </TooltipLabel>
                      <TooltipLabel title="Master Card">
                        <img src={masterCardIcon} alt="" />
                      </TooltipLabel>
                    </div>
                  </div> */}
                </div>
              </form>
            )
          }}
        </Formik>
      </div>
    </div>
  )
}

export default BuyNftForm
