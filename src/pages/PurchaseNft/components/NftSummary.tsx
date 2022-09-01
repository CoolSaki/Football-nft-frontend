import React, { useState, useEffect } from 'react'
import { SummaryItem, ItemProps } from '@root/types'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import { RootState } from '@root/store/rootReducers'
import { useTranslation } from 'react-i18next'
import { truncateDecimals } from '@utils/helpers'
import approxIcon from '@assets/images/approximation.png'
import dollarIcon from '@assets/images/dollar_mecarreira.png'
import maticIcon from '@assets/images/matic-token-icon.png'
import TooltipLabel from '@components/TooltipLabel'

interface Props {
  estimatedValue: string
  totalValue: string
  inProgress?: boolean
  usdRate: any
  containerClass?: string
  valueLeftIcon?: any
  initCallback?: any
  stopCalculating: boolean
  usdTotalCallback: any
}

const PriceItem: React.FC<ItemProps> = props => {
  const {
    label,
    value,
    isLoading,
    isApprox = false,
    valueLeftIcon = null,
    valueRightIcon = null,
  } = props
  return (
    <li className="pricing-list-item">
      <div className="ms-2 me-auto">{label}</div>
      <div
        className={classNames(
          'spinner__circle size-small',
          isLoading ? '' : 'hidden',
        )}
      >
        <div className="spinner__circle-gradient"></div>
        <div className="spinner__circle-inner"></div>
      </div>
      <div className={classNames('value-container', isLoading ? 'hidden' : '')}>
        {valueLeftIcon ? <img src={valueLeftIcon} alt="" /> : null}
        <span
          className={classNames(
            'pricing-value-text',
            isLoading ? 'hidden' : '',
          )}
        >
          {parseFloat(value) || '0.00'}
          {/* ~{value} MATIC */}
        </span>
        {valueRightIcon ? (
          <TooltipLabel title={valueRightIcon === maticIcon ? 'MATIC' : 'USD'}>
            <img src={valueRightIcon} className="currency-icon" alt="" />
          </TooltipLabel>
        ) : null}
      </div>
    </li>
  )
}

let intervalId: any = null
const NftSummary: React.FC<Props> = props => {
  const { t } = useTranslation()
  const {
    estimatedValue,
    totalValue,
    inProgress,
    usdRate,
    containerClass = '',
    initCallback = null,
    stopCalculating,
    usdTotalCallback,
  } = props
  const [timeLeft, setTimeLeft] = useState<number>(10)
  const authenticationData = useSelector(
    (state: RootState) => state.authentication,
  )
  const { loadingBuy } = authenticationData

  const getUsdPrice = () => {
    console.log({ totalValue, usdRate })
    const usdTotal: any = parseFloat(totalValue) * usdRate
    const absTotal: any = truncateDecimals(usdTotal, 4)
    return `$${absTotal}`
  }

  const getUsdPriceBase = () => {
    // console.log({ totalValue, usdRate })
    // const usdTotal: any = parseFloat(totalValue) * usdRate
    // const absTotal: any = truncateDecimals(usdTotal, 4)
    // return `$${absTotal}`
    const baseTotal: any = parseFloat(estimatedValue) * usdRate
    const absTotal: any = truncateDecimals(baseTotal, 4)
    return absTotal
  }

  // useEffect(() => {
  //   startCountDown()
  //   console.log('nbvsww--')
  //   return () => {
  //     clearInterval(timeout)
  //   }
  // }, [])

  useEffect(() => {
    console.log('incomingTOtal--', totalValue)
  }, [totalValue])

  useEffect(() => {
    setTimeLeft(10)
  }, [estimatedValue])

  useEffect(() => {
    if (timeLeft === 0) {
      setTimeLeft(0)
      if (initCallback) {
        initCallback('timeup')
        setTimeLeft(10)
      }
      // setTimeLeft(10)
    }

    // exit early when we reach 0
    if (!timeLeft) return

    // save intervalId to clear the interval when the
    // component re-renders
    intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId)
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft])

  useEffect(() => {
    if (stopCalculating) {
      clearInterval(intervalId)
    }
  }, [stopCalculating])

  const getUsdTotal = () => {
    console.log({ totalValue })
    const usdTotal: any = parseFloat(totalValue) * usdRate
    const absTotal: any = truncateDecimals(usdTotal, 4)
    usdTotalCallback(absTotal)
    return absTotal
  }

  return (
    <div className={classNames('pricing-summary-wrapper', containerClass)}>
      <ol className="pricing-list-group">
        <React.Fragment>
          <PriceItem
            valueLeftIcon={approxIcon}
            valueRightIcon={maticIcon}
            label={t('estimated price per coin')}
            // value={estimatedValue}
            value={estimatedValue}
            isLoading={(loadingBuy || inProgress) && !stopCalculating}
          />
          <div className="divide pricing-list-divider"></div>
        </React.Fragment>
        <React.Fragment>
          <PriceItem
            label={t('estimated price per coin in usd')}
            value={getUsdPriceBase()}
            valueLeftIcon={approxIcon}
            valueRightIcon={dollarIcon}
            isLoading={(loadingBuy || inProgress) && !stopCalculating}
          />
          <div className="divide pricing-list-divider"></div>
        </React.Fragment>
        <React.Fragment>
          <PriceItem
            label={t('total estimated')}
            // value={totalValue}
            valueLeftIcon={approxIcon}
            valueRightIcon={maticIcon}
            value={totalValue}
            isLoading={(loadingBuy || inProgress) && !stopCalculating}
          />
          <div className="divide pricing-list-divider"></div>
        </React.Fragment>
        <React.Fragment>
          <PriceItem
            label={t('total estimated in USD')}
            // value={totalValue}
            valueLeftIcon={approxIcon}
            valueRightIcon={dollarIcon}
            value={getUsdTotal()}
            isLoading={(loadingBuy || inProgress) && !stopCalculating}
          />
          <div className="divide pricing-list-divider"></div>
        </React.Fragment>
        {!stopCalculating ? (
          <React.Fragment>
            <div className="purchase-counter-container">
              <span>{t('next price evaluation')}</span>
              <div className="timer-sec">{timeLeft}s</div>
            </div>
          </React.Fragment>
        ) : null}
      </ol>
    </div>
  )
}

export default NftSummary
